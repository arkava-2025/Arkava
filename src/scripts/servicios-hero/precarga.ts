// Al apuntar a un servicio del home se adelanta lo que la cámara necesita en
// /servicios/: el edificio y la primera imagen de esa escena. Se leen de la
// misma página para pedir exactamente los archivos que usará el hero.
let pagina: Promise<Document> | null = null;
let edificioPedido = false;
const pedidas = new Set<string>();
// Las imágenes sueltas solo se descargan mientras exista la referencia
const retenidas: Node[] = [];

function pedir(picture: Element | null | undefined) {
  if (picture) retenidas.push(document.importNode(picture, true));
}

async function precargar(id: string) {
  if (pedidas.has(id)) return;
  pedidas.add(id);
  pagina ??= fetch('/servicios/')
    .then((r) => r.text())
    .then((html) => new DOMParser().parseFromString(html, 'text/html'));
  const doc = await pagina;
  if (!edificioPedido) {
    edificioPedido = true;
    pedir(doc.querySelector('[data-svh-canvas] picture'));
  }
  const tpl = doc.querySelector<HTMLTemplateElement>(`template[data-svh-tpl="${id}"]`);
  pedir(tpl?.content.querySelector('[data-svh-step="0"]'));
}

export function initPrecargaServicios() {
  const conexion = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
  if (conexion?.saveData) return;
  document.querySelectorAll<HTMLAnchorElement>('a[href^="/servicios/#"]').forEach((a) => {
    const id = a.hash.slice(1);
    const intento = () => void precargar(id).catch(() => pedidas.delete(id));
    a.addEventListener('pointerenter', intento);
    a.addEventListener('focus', intento);
    a.addEventListener('touchstart', intento, { passive: true });
  });
}
