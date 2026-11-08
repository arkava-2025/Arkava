import type { FormatoEnchape, MaterialEnchape } from '@/lib/servicios/enchape-opciones';
import { GLSL_LAB, VS_FULL, compile, loadImage, texture, whenNear } from './color';

// Contorno del piso en la foto (coordenadas 0 a 1).
const PISO = [[0, 0.242], [0.59, 0.179], [1, 0.318], [1, 0.69], [0.9, 0.87], [0.88, 1], [0.11, 1], [0.095, 0.71], [0.05, 0.52], [0.01, 0.31]];
// Plano del piso: esquina del fondo, muro izquierdo, punto lejano y muro derecho.
const PLANO = [[0.59, 0.185], [-0.04, 0.25], [-0.1, 1.5], [1.18, 0.4]];
// Medidas estimadas de la habitación de la foto, en metros: dan la escala de las piezas.
const ANCHO_M = 3.4;
const FONDO_M = 3.8;

const FS = /* glsl */ `#version 300 es
precision highp float;
in vec2 v; out vec4 o;
uniform sampler2D uFoto, uPiso;
uniform mat3 uInv;
uniform vec2 uReal, uPieza;
uniform float uModo, uDesfase, uTipo, uJunta, uBrillo, uMedia;
uniform vec3 uBase, uVeta, uColorJunta;
${GLSL_LAB}
float h21(vec2 p){ p=fract(p*vec2(123.34,456.21)); p+=dot(p,p+45.32); return fract(p.x*p.y); }
float ruido(vec2 p){ vec2 i=floor(p), f=fract(p); f=f*f*(3.-2.*f);
  return mix(mix(h21(i),h21(i+vec2(1,0)),f.x),mix(h21(i+vec2(0,1)),h21(i+vec2(1,1)),f.x),f.y); }
float fbm(vec2 p){ float s=0.,a=.5; for(int i=0;i<5;i++){ s+=a*ruido(p); p=p*2.03+vec2(17.1,9.2); a*=.5; } return s; }

bool espiga(vec2 p, float L, float W, out vec2 id, out vec2 loc, out float borde, out vec2 tam){
  float i0=floor((p.x+p.y)/(2.*W)), k0=floor((p.x-p.y)/(2.*L));
  for(int di=-8;di<=8;di++) for(int dk=-1;dk<=2;dk++){
    float i=i0+float(di), k=k0+float(dk);
    vec2 a=vec2(i*W+k*L, i*W-k*L), d=p-a;
    if(d.x>=0.&&d.x<L&&d.y>=0.&&d.y<W){ id=vec2(i,k*2.); loc=d; tam=vec2(L,W); borde=min(min(d.x,L-d.x),min(d.y,W-d.y)); return true; }
    d=p-(a+vec2(0.,W));
    if(d.x>=0.&&d.x<W&&d.y>=0.&&d.y<L){ id=vec2(i,k*2.+1.); loc=d.yx; tam=vec2(L,W); borde=min(min(d.x,W-d.x),min(d.y,L-d.y)); return true; }
  }
  return false;
}

vec3 superficie(vec2 q, vec2 id, vec2 tam){
  float s=h21(id);
  vec2 p=q+vec2(s*37.,fract(s*91.)*53.);
  if(uTipo<.5){ // mármol: pocas vetas, finas en el centro y difusas alrededor
    vec2 q=p*.85;
    float nube=fbm(q*1.5);
    float w=fbm(q*1.1+7.3);
    float n=fbm(q+vec2(w*1.5,-w*1.1));
    float d=abs(n-.5);
    float zona=smoothstep(.34,.62,fbm(q*.55+21.));
    float vena=(exp(-d*d/.00022)*.75+exp(-d*d/.0042)*.3)*zona;
    float n2=fbm(q*2.3+vec2(-w*2.,w)+40.);
    float d2=abs(n2-.5);
    vena+=exp(-d2*d2/.00009)*.28*zona;
    vec3 c=uBase*(.975+.05*nube);
    return mix(c,uVeta,clamp(vena,0.,.82));
  }
  if(uTipo<1.5){ // cemento: nubes amplias y grano fino
    float n=fbm(p*1.4), g=ruido(p*260.);
    return mix(uVeta,uBase,smoothstep(.3,.7,n))*(.985+.03*g);
  }
  if(uTipo<2.5){ // madera: arcos amplios, fibra fina y tono distinto en cada tablón
    float tono=(s-.5)*.17;
    float y=p.y+fbm(vec2(p.x*.55,p.y*2.5))*.11;
    float arco=fbm(vec2(p.x*.32,y*13.));
    float fibra=fbm(vec2(p.x*1.1,y*62.));
    float fino=ruido(vec2(p.x*7.,y*430.));
    float poro=smoothstep(.72,.9,ruido(vec2(p.x*26.,y*610.)));
    float mezcla=smoothstep(.3,.75,arco)*.5+smoothstep(.35,.7,fibra)*.28;
    vec3 c=mix(uBase,uVeta,mezcla*.62)*(.97+.06*fino);
    return c*(1.+tono)*(1.-poro*.1);
  }
  float n=fbm(p*2.6), g=ruido(p*190.);
  return mix(uVeta,uBase,smoothstep(.28,.72,n))*(.96+.08*g);
}

float paredY(float x){ return x<.59 ? mix(.246,.185,x/.59) : mix(.185,.318,(x-.59)/.41); }

void main(){
  vec3 foto=texture(uFoto,v).rgb;
  vec4 p2=texture(uPiso,v);
  float mask=p2.r;
  if(mask<.004){ o=vec4(foto,1.); return; }
  vec3 h=uInv*vec3(v,1.);
  vec2 m=(h.xy/h.z)*uReal;
  vec2 id, loc, tam=uPieza; float borde; bool ok=true;
  if(uModo>1.5){
    ok=espiga(m+vec2(9.),uPieza.x,uPieza.y,id,loc,borde,tam);
  } else {
    float fila=floor(m.y/uPieza.y);
    float x=m.x+uDesfase*uPieza.x*mod(fila,uModo>.5?(uDesfase<.2?2.:(uDesfase<.4?3.:2.)):1.);
    float col=floor(x/uPieza.x);
    id=vec2(col,fila);
    loc=vec2(x-col*uPieza.x,m.y-fila*uPieza.y);
    borde=min(min(loc.x,uPieza.x-loc.x),min(loc.y,uPieza.y-loc.y));
  }
  if(!ok){ o=vec4(foto,1.); return; }

  vec3 c=superficie(loc,id,tam);
  float paso=fwidth(m.x)+fwidth(m.y);
  float j=uJunta*.5;
  float tj=1.-smoothstep(j-paso*.5,j+paso*.5,borde);
  c=mix(c,uColorJunta,tj*.92);
  // Canto levemente sombreado junto a la junta
  c*=1.-.1*(1.-smoothstep(j,j+max(paso*1.5,.004),borde));

  vec3 lin=toLin(c);
  float luz=clamp(p2.g/uMedia,.55,1.75);
  float y0=paredY(v.x);
  float dist=clamp(v.y-y0,0.,1.);
  float oclusion=mix(.68,1.,smoothstep(0.,.05,dist));
  lin*=luz*oclusion;

  // Reflejo del muro y la ventana sobre la pieza pulida, más fuerte a ras de pared
  vec2 uvR=vec2(v.x,max(y0-dist*.72,.002));
  float lod=2.5+dist*6.;
  vec3 refl=toLin(textureLod(uFoto,uvR,lod).rgb);
  float fres=mix(.34,.05,smoothstep(0.,.62,dist));
  lin=mix(lin,refl,fres*uBrillo);

  vec3 salida=toSrgb(lin);
  o=vec4(mix(foto,salida,mask),1.);
}`;

export function initEnchape(root: HTMLElement) {
  const canvas = root.querySelector<HTMLCanvasElement>('[data-ench-canvas]');
  const snap = root.querySelector<HTMLCanvasElement>('[data-ench-snap]');
  if (!canvas || !snap) return;
  const formatos: FormatoEnchape[] = JSON.parse(root.dataset.formatos!);
  const materiales: MaterialEnchape[] = JSON.parse(root.dataset.materiales!);
  const inF = [...root.querySelectorAll<HTMLInputElement>('input[name="ench-formato"]')];
  const inM = [...root.querySelectorAll<HTMLInputElement>('input[name="ench-material"]')];
  const largo = root.querySelector<HTMLInputElement>('[data-ench-largo]')!;
  const ancho = root.querySelector<HTMLInputElement>('[data-ench-ancho]')!;
  const q = (s: string) => root.querySelector<HTMLElement>(`[data-ench-${s}]`)!;
  const num = (n: number, d = 1) => n.toLocaleString('es-CO', { maximumFractionDigits: d });
  const formato = () => formatos[Number(inF.find((i) => i.checked)?.value ?? 0)];
  const material = () => materiales[Number(inM.find((i) => i.checked)?.value ?? 0)];

  const calcular = () => {
    const f = formato();
    const area = Math.max(0, Number(largo.value) || 0) * Math.max(0, Number(ancho.value) || 0);
    const total = area * (1 + f.desperdicio / 100);
    const piezaM2 = (f.largo * f.ancho) / 10000;
    const cajas = Math.ceil(total / f.m2Caja);
    q('total').textContent = `${num(total)} m²`;
    q('area').textContent = `${num(area)} m²`;
    q('piezas').textContent = num(Math.ceil(total / piezaM2), 0);
    q('cajas').textContent = `${cajas} de ${num(f.m2Caja, 2)} m²`;
    q('nota').textContent = `Incluye ${f.desperdicio} % de cortes. ${f.nota}`;
  };
  calcular();
  [largo, ancho, ...inF].forEach((el) => el.addEventListener('input', calcular));

  whenNear(root, async () => {
    const gl = canvas.getContext('webgl2', { antialias: false, preserveDrawingBuffer: true });
    if (!gl) return;
    const foto = await loadImage(root.dataset.foto!);
    const W = (canvas.width = snap.width = foto.naturalWidth);
    const H = (canvas.height = snap.height = foto.naturalHeight);
    const prog = compile(gl, VS_FULL, FS);
    if (!prog) return;
    gl.useProgram(prog);
    gl.bindVertexArray(gl.createVertexArray());
    gl.viewport(0, 0, W, H);

    // R: máscara del piso. G: luz suave de la foto, sin el dibujo del piso original.
    const luces = document.createElement('canvas');
    luces.width = W;
    luces.height = H;
    const c = luces.getContext('2d', { willReadFrequently: true })!;
    c.fillStyle = '#000';
    c.fillRect(0, 0, W, H);
    c.filter = 'blur(34px) grayscale(1)';
    c.drawImage(foto, 0, 0, W, H);
    c.filter = 'none';
    const luzData = c.getImageData(0, 0, W, H);
    const m = document.createElement('canvas');
    m.width = W;
    m.height = H;
    const mc = m.getContext('2d', { willReadFrequently: true })!;
    mc.filter = 'blur(1.1px)';
    mc.fillStyle = '#fff';
    mc.beginPath();
    PISO.forEach(([x, y], i) => mc[i ? 'lineTo' : 'moveTo'](x * W, y * H));
    mc.closePath();
    mc.fill();
    const maskData = mc.getImageData(0, 0, W, H).data;
    let suma = 0;
    let n = 0;
    const d = luzData.data;
    for (let i = 0; i < d.length; i += 4) {
      if (maskData[i + 3] > 200) {
        suma += d[i];
        n++;
      }
      d[i + 1] = d[i];
      d[i] = maskData[i + 3];
      d[i + 3] = 255;
    }
    c.putImageData(luzData, 0, 0);

    gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, false);
    texture(gl, 0, foto, true);
    texture(gl, 1, luces);
    const U = (name: string) => gl.getUniformLocation(prog, name);
    gl.uniform1i(U('uFoto'), 0);
    gl.uniform1i(U('uPiso'), 1);
    gl.uniform1f(U('uMedia'), suma / n / 255);
    gl.uniform2f(U('uReal'), ANCHO_M, FONDO_M);
    gl.uniformMatrix3fv(U('uInv'), false, inverse(homografia(PLANO)));

    const rgb = (hex: string): [number, number, number] => {
      const v = parseInt(hex.slice(1), 16);
      return [((v >> 16) & 255) / 255, ((v >> 8) & 255) / 255, (v & 255) / 255];
    };
    const TIPOS = { marmol: 0, cemento: 1, madera: 2, piedra: 3 };
    const MODOS = { recto: 0, trabado: 1, espiga: 2 };
    const sc = snap.getContext('2d')!;
    let primero = true;

    const render = () => {
      const f = formato();
      const mat = material();
      if (!primero) {
        sc.clearRect(0, 0, W, H);
        sc.drawImage(canvas, 0, 0);
        snap.style.transition = 'none';
        snap.style.opacity = '1';
      }
      gl.uniform2f(U('uPieza'), f.largo / 100, f.ancho / 100);
      gl.uniform1f(U('uModo'), MODOS[f.modo]);
      gl.uniform1f(U('uDesfase'), f.desfase);
      gl.uniform1f(U('uTipo'), TIPOS[mat.tipo]);
      gl.uniform1f(U('uJunta'), Math.max(mat.juntaMm, 2) / 1000);
      gl.uniform1f(U('uBrillo'), mat.brillo);
      gl.uniform3fv(U('uBase'), rgb(mat.base));
      gl.uniform3fv(U('uVeta'), rgb(mat.veta));
      gl.uniform3fv(U('uColorJunta'), rgb(mat.junta));
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      canvas.style.opacity = '1';
      if (!primero) {
        requestAnimationFrame(() => {
          snap.style.transition = 'opacity 0.45s ease';
          snap.style.opacity = '0';
        });
      }
      primero = false;
    };
    render();
    [...inF, ...inM].forEach((el) => el.addEventListener('change', render));
  });
}

// Homografía del cuadrado unitario a los cuatro puntos dados
function homografia(q: number[][]) {
  const [[x0, y0], [x1, y1], [x2, y2], [x3, y3]] = q;
  const dx1 = x1 - x2;
  const dx2 = x3 - x2;
  const sx = x0 - x1 + x2 - x3;
  const dy1 = y1 - y2;
  const dy2 = y3 - y2;
  const sy = y0 - y1 + y2 - y3;
  const det = dx1 * dy2 - dx2 * dy1;
  const g = (sx * dy2 - dx2 * sy) / det;
  const h = (dx1 * sy - sx * dy1) / det;
  return [x1 - x0 + g * x1, x3 - x0 + h * x3, x0, y1 - y0 + g * y1, y3 - y0 + h * y3, y0, g, h, 1];
}

// Inversa de una matriz 3×3, devuelta por columnas como la pide WebGL
function inverse(m: number[]): Float32Array {
  const [a, b, c, d, e, f, g, h, i] = m;
  const A = e * i - f * h;
  const B = f * g - d * i;
  const C = d * h - e * g;
  const det = a * A + b * B + c * C;
  return new Float32Array([
    A / det, B / det, C / det,
    (c * h - b * i) / det, (a * i - c * g) / det, (b * g - a * h) / det,
    (b * f - c * e) / det, (c * d - a * f) / det, (a * e - b * d) / det,
  ]);
}
