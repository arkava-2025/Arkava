// utils/sections/helpers.ts
import { sectionOrder } from './mapping';

/**
 * Conjunto de utilidades para trabajar con "secciones" de página.
 *
 * Estas funciones ayudan a:
 * - Obtener el nombre/tipo de una sección de manera consistente.
 * - Calcular el orden de una sección según una lista local (`sectionOrder`).
 * - Generar secciones sintéticas cuando falten.
 * - Asegurar la presencia de todas las secciones definidas y eliminar duplicados.
 * - Ordenar una lista de secciones según el orden local configurado.
 */


/**
 * Obtiene el nombre de tipo de una sección en orden de prioridad.
 *
 * Orden de extracción:
 * 1) `section.content.__typename`
 * 2) `section.sectionType`
 * 3) `section.__typename`
 * 4) En caso de no existir, devuelve cadena vacía `''`.
 *
 * @param section Objeto de sección (estructura flexible).
 * @returns Nombre de tipo como `string` (puede ser cadena vacía).
 */
export function getTypeNameFromSection(section: any): string {
  return (
    section?.content?.__typename ||
    section?.sectionType ||
    section?.__typename ||
    ''
  ).toString();
}

/**
 * Devuelve el índice de orden para un nombre de sección según `sectionOrder`.
 * Si el nombre no existe en la lista, retorna `Number.MAX_SAFE_INTEGER` para
 * enviarlo al final en una ordenación ascendente.
 *
 * Comparación sin sensibilidad a mayúsculas/minúsculas.
 *
 * @param name Nombre de la sección.
 * @returns Índice de orden (o un valor muy grande si no existe).
 */
export function getOrderRankForType(name: string): number {
  const idx = sectionOrder.findIndex(n => n.toLowerCase() === name.toLowerCase());
  return idx === -1 ? Number.MAX_SAFE_INTEGER : idx;
}

/**
 * Crea una sección "sintética" (de relleno) para un nombre dado.
 * Útil cuando se desea asegurar que cierto tipo de sección exista aunque no
 * venga en los datos originales.
 *
 * @param name Nombre/tipo de la sección.
 * @param data Datos adicionales a incluir en `content`.
 * @returns Objeto de sección con un `id` sintético y `content.__typename` = `name`.
 */
export function synthesizeSectionForType(name: string, data: any = {}) {
  return {
    id: `synthetic-${name}`,
    internalName: `${name} (synthetic)`,
    sectionType: name,
    isVisible: true,
    content: { __typename: name, ...data },
  };
}

/**
 * Asegura que todas las secciones definidas en `sectionOrder` estén presentes
 * en la lista dada. Si falta alguna, se agrega una versión sintética.
 *
 * Mantiene las secciones existentes y añade las faltantes al final.
 *
 * @param sections Lista de secciones de entrada.
 * @returns Nueva lista con todas las secciones requeridas.
 */
export function ensureComponentsFromOrderPresent(sections: any[] = []) {
  const present = new Set(sections.map(s => getTypeNameFromSection(s).toLowerCase()));
  return [
    ...sections,
    ...sectionOrder
      .filter(name => !present.has(name.toLowerCase()))
      .map(name => synthesizeSectionForType(name)),
  ];
}

/**
 * Elimina secciones duplicadas por nombre de tipo, manteniendo la primera
 * ocurrencia encontrada.
 *
 * @param sections Lista de secciones de entrada.
 * @returns Lista filtrada sin duplicados por tipo.
 */
export function dedupeSectionsByType(sections: any[] = []) {
  const seen = new Set<string>();
  return sections.filter(s => {
    const name = getTypeNameFromSection(s).toLowerCase();
    if (!name || seen.has(name)) return false;
    seen.add(name);
    return true;
  });
}

/**
 * Ordena las secciones de forma ascendente conforme al índice definido por
 * `getOrderRankForType` y la lista `sectionOrder`.
 *
 * @param sections Lista de secciones a ordenar.
 * @returns Nueva lista de secciones ordenadas.
 */
export function sortSectionsByLocalOrder(sections: any[] = []) {
  return [...sections].sort(
    (a, b) =>
      getOrderRankForType(getTypeNameFromSection(a)) -
      getOrderRankForType(getTypeNameFromSection(b))
  );
}
