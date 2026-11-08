// Conversión sRGB ↔ CIELAB (iluminante D65), en JavaScript y en GLSL.

export type Lab = [number, number, number];

const toLinear = (c: number) => (c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
const f = (t: number) => (t > 0.008856 ? Math.cbrt(t) : 7.787 * t + 16 / 116);

export function rgbToLab(r: number, g: number, b: number): Lab {
  const [R, G, B] = [r, g, b].map(toLinear);
  const x = f((0.4124 * R + 0.3576 * G + 0.1805 * B) / 0.95047);
  const y = f(0.2126 * R + 0.7152 * G + 0.0722 * B);
  const z = f((0.0193 * R + 0.1192 * G + 0.9505 * B) / 1.08883);
  return [116 * y - 16, 500 * (x - y), 200 * (y - z)];
}

export function hexToLab(hex: string): Lab {
  const n = parseInt(hex.slice(1), 16);
  return rgbToLab(((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255);
}

export const GLSL_LAB = /* glsl */ `
vec3 toLin(vec3 c){ return mix(c/12.92, pow((c+0.055)/1.055, vec3(2.4)), step(0.04045, c)); }
vec3 toSrgb(vec3 c){ c=clamp(c,0.,1.); return mix(c*12.92, 1.055*pow(c,vec3(1./2.4))-0.055, step(0.0031308, c)); }
float fl(float t){ return t>0.008856 ? pow(t,1./3.) : 7.787*t+16./116.; }
float fi(float t){ return t>0.206893 ? t*t*t : (t-16./116.)/7.787; }
vec3 rgb2lab(vec3 c){
  vec3 l=toLin(c);
  float x=fl((0.4124*l.r+0.3576*l.g+0.1805*l.b)/0.95047);
  float y=fl(0.2126*l.r+0.7152*l.g+0.0722*l.b);
  float z=fl((0.0193*l.r+0.1192*l.g+0.9505*l.b)/1.08883);
  return vec3(116.*y-16., 500.*(x-y), 200.*(y-z));
}
vec3 lab2rgb(vec3 lab){
  float y=(lab.x+16.)/116.;
  float x=fi(lab.y/500.+y)*0.95047;
  float z=fi(y-lab.z/200.)*1.08883;
  y=fi(y);
  vec3 l=vec3(3.2406*x-1.5372*y-0.4986*z, -0.9689*x+1.8758*y+0.0415*z, 0.0557*x-0.2040*y+1.0570*z);
  return toSrgb(l);
}
`;

export function compile(gl: WebGL2RenderingContext, vs: string, fs: string): WebGLProgram | null {
  const make = (type: number, src: string) => {
    const s = gl.createShader(type)!;
    gl.shaderSource(s, src);
    gl.compileShader(s);
    if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) console.error(gl.getShaderInfoLog(s));
    return s;
  };
  const p = gl.createProgram()!;
  gl.attachShader(p, make(gl.VERTEX_SHADER, vs));
  gl.attachShader(p, make(gl.FRAGMENT_SHADER, fs));
  gl.linkProgram(p);
  if (!gl.getProgramParameter(p, gl.LINK_STATUS)) {
    console.error(gl.getProgramInfoLog(p));
    return null;
  }
  return p;
}

// Triángulo que cubre la pantalla. La coordenada v va de arriba hacia abajo.
export const VS_FULL = /* glsl */ `#version 300 es
out vec2 v;
void main(){
  vec2 p=vec2(float((gl_VertexID<<1)&2), float(gl_VertexID&2));
  v=p;
  gl_Position=vec4(p*2.-1., 0., 1.);
  gl_Position.y=-gl_Position.y;
}`;

export function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((ok, no) => {
    const i = new Image();
    i.decoding = 'async';
    i.onload = () => ok(i);
    i.onerror = no;
    i.src = src;
  });
}

export function texture(gl: WebGL2RenderingContext, unit: number, source: TexImageSource, mips = false) {
  const t = gl.createTexture();
  gl.activeTexture(gl.TEXTURE0 + unit);
  gl.bindTexture(gl.TEXTURE_2D, t);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, source);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, mips ? gl.LINEAR_MIPMAP_LINEAR : gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  if (mips) gl.generateMipmap(gl.TEXTURE_2D);
  return t;
}

// Corre fn cuando el elemento se acerca a la pantalla y el navegador está libre
export function whenNear(el: HTMLElement, fn: () => void) {
  const start = () => ('requestIdleCallback' in window ? requestIdleCallback(fn, { timeout: 1500 }) : setTimeout(fn, 200));
  if (!('IntersectionObserver' in window)) return void start();
  const io = new IntersectionObserver(
    (e) => {
      if (e.some((x) => x.isIntersecting)) {
        io.disconnect();
        start();
      }
    },
    { rootMargin: '300px' },
  );
  io.observe(el);
}
