import { GLSL_LAB, VS_FULL, compile, hexToLab, loadImage, rgbToLab, texture, whenNear, type Lab } from './color';

// Conserva la luz de la foto: cambia el color en CIELAB y mantiene la diferencia
// de luminosidad de cada píxel frente a la mediana del muro, más una parte de su
// tinte (por eso el reflejo cálido de la cinta LED sigue ahí con cualquier color).
const FS = /* glsl */ `#version 300 es
precision highp float;
in vec2 v; out vec4 o;
uniform sampler2D uFoto, uMascara;
uniform vec3 uDe[2], uA[2], uMed[2];
uniform vec2 uOn[2], uSpan[2];
uniform float uProg[2];
${GLSL_LAB}
vec3 pintar(vec3 lab, vec3 color, vec3 med){
  float L=clamp(color.x+(lab.x-med.x)*0.94, 2., 99.);
  vec2 ab=color.yz+(lab.yz-med.yz)*0.4;
  return lab2rgb(vec3(L,ab));
}
void main(){
  vec3 c=texture(uFoto,v).rgb, m=texture(uMascara,v).rgb, salida=c;
  vec3 lab=rgb2lab(c);
  for(int i=0;i<2;i++){
    float w=i==0?m.r:m.g;
    if(w<0.004) continue;
    float x=(v.x-uSpan[i].x)/(uSpan[i].y-uSpan[i].x);
    float borde=sin(v.y*42.)*.012+sin(v.y*117.+1.7)*.006;
    float t=smoothstep(-.05,.05,uProg[i]*1.1-.05-x+borde);
    vec3 de=mix(c,pintar(lab,uDe[i],uMed[i]),uOn[i].x);
    vec3 a=mix(c,pintar(lab,uA[i],uMed[i]),uOn[i].y);
    salida=mix(salida,mix(de,a,t),w);
  }
  o=vec4(salida,1.);
}`;

type Zona = { de: Lab; a: Lab; on: [number, number]; prog: number; indice: number };

export function initPintura(root: HTMLElement) {
  const canvas = root.querySelector<HTMLCanvasElement>('[data-pint-canvas]');
  const controls = root.querySelector<HTMLElement>('[data-pint-controls]');
  if (!canvas || !controls) return;

  const colores = [...root.querySelectorAll<HTMLInputElement>('input[name="pint-color"]')];
  const zonasInput = [...root.querySelectorAll<HTMLInputElement>('input[name="pint-zona"]')];
  const nombre = root.querySelector<HTMLElement>('[data-pint-nombre]')!;
  const origen = root.querySelector<HTMLElement>('[data-pint-origen]')!;
  const uso = root.querySelector<HTMLElement>('[data-pint-uso]')!;
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  whenNear(root, async () => {
    const gl = canvas.getContext('webgl2', { antialias: false, premultipliedAlpha: false });
    if (!gl) {
      controls.hidden = true;
      return;
    }
    const [foto, mascara] = await Promise.all([loadImage(root.dataset.foto!), loadImage(root.dataset.mascara!)]);
    canvas.width = foto.naturalWidth;
    canvas.height = foto.naturalHeight;

    const prog = compile(gl, VS_FULL, FS);
    if (!prog) return;
    gl.useProgram(prog);
    gl.bindVertexArray(gl.createVertexArray());
    gl.viewport(0, 0, canvas.width, canvas.height);
    texture(gl, 0, foto);
    texture(gl, 1, mascara);
    const U = (n: string) => gl.getUniformLocation(prog, n);
    gl.uniform1i(U('uFoto'), 0);
    gl.uniform1i(U('uMascara'), 1);

    const med = medianas(foto, mascara);
    const span: [number, number][] = [
      [0.19, 0.6],
      [0.56, 0.83],
    ];
    const zonas: Zona[] = [0, 1].map(() => ({ de: [80, 0, 0], a: [80, 0, 0], on: [0, 0], prog: 1, indice: -1 }));
    zonas.forEach((_, i) => {
      gl.uniform3fv(U(`uMed[${i}]`), med[i]);
      gl.uniform2fv(U(`uSpan[${i}]`), span[i]);
    });

    const draw = () => {
      zonas.forEach((z, i) => {
        gl.uniform3fv(U(`uDe[${i}]`), z.de);
        gl.uniform3fv(U(`uA[${i}]`), z.a);
        gl.uniform2fv(U(`uOn[${i}]`), z.on);
        gl.uniform1f(U(`uProg[${i}]`), z.prog);
      });
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };
    draw();
    canvas.style.opacity = '1';

    let raf = 0;
    const animate = () => {
      cancelAnimationFrame(raf);
      const t0 = performance.now();
      const desde = zonas.map((z) => z.prog);
      const step = (t: number) => {
        const p = reduce ? 1 : Math.min(1, (t - t0) / 900);
        const e = p * p * (3 - 2 * p);
        zonas.forEach((z, i) => {
          z.prog = desde[i] + (1 - desde[i]) * e;
        });
        draw();
        if (p < 1) raf = requestAnimationFrame(step);
      };
      raf = requestAnimationFrame(step);
    };

    const actual = () => Number(zonasInput.find((z) => z.checked)?.value ?? 0);

    const mostrar = (input: HTMLInputElement | undefined) => {
      const d = input?.dataset;
      nombre.textContent = d?.nombre ?? 'Color original';
      origen.textContent = d?.origen ?? 'Foto original';
      uso.textContent = d?.uso ?? 'Así quedó este muro en la obra.';
    };

    colores.forEach((input) =>
      input.addEventListener('change', () => {
        const z = zonas[actual()];
        const i = Number(input.value);
        z.de = z.a;
        z.on = [z.on[1], i >= 0 ? 1 : 0];
        z.indice = i;
        if (i >= 0) z.a = hexToLab(input.dataset.hex!);
        z.prog = 0;
        mostrar(input);
        animate();
      }),
    );

    zonasInput.forEach((input) =>
      input.addEventListener('change', () => {
        const z = zonas[actual()];
        const activo = colores.find((c) => Number(c.value) === z.indice);
        if (activo) activo.checked = true;
        mostrar(z.indice >= 0 ? activo : undefined);
      }),
    );
  });
}

// Mediana de color de cada muro, con la foto reducida para que sea instantáneo
function medianas(foto: HTMLImageElement, mascara: HTMLImageElement): [Lab, Lab] {
  const W = 200;
  const H = 150;
  const leer = (img: HTMLImageElement) => {
    const c = document.createElement('canvas');
    c.width = W;
    c.height = H;
    const ctx = c.getContext('2d', { willReadFrequently: true })!;
    ctx.drawImage(img, 0, 0, W, H);
    return ctx.getImageData(0, 0, W, H).data;
  };
  const f = leer(foto);
  const m = leer(mascara);
  const med = (canal: number): Lab => {
    const labs: Lab[] = [];
    for (let i = 0; i < f.length; i += 4) {
      if (m[i + canal] > 240) labs.push(rgbToLab(f[i] / 255, f[i + 1] / 255, f[i + 2] / 255));
    }
    const mid = (k: 0 | 1 | 2) => labs.map((l) => l[k]).sort((a, b) => a - b)[labs.length >> 1] ?? 0;
    return [mid(0), mid(1), mid(2)];
  };
  return [med(0), med(1)];
}
