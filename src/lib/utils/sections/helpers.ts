// Minimal helpers to keep pages clean and focused on rendering

/**
 * Builds an ordered list of sections using a provided sectionOrder.
 * - Filters out sections where isVisible === false
 * - Groups incoming sections by __typename
 * - For each name in sectionOrder: uses the first incoming section of that type,
 *   or injects a placeholder { content: { __typename: name } } if missing
 * - Appends any extra sections not present in sectionOrder at the end, preserving their order
 */
export function buildOrderedSections(sections: any[] = [], sectionOrder: string[] = []) {
  const visible = (Array.isArray(sections) ? sections : []).filter(
    (s) => s?.isVisible !== false,
  );

  const getTypename = (section: any): string | undefined => {
    const c = section?.content;
    if (Array.isArray(c)) return c[0]?.__typename;
    return c?.__typename;
  };

  const byType = new Map<string, any[]>();
  for (const s of visible as any[]) {
    const t = getTypename(s);
    if (!t) continue;
    if (!byType.has(t)) byType.set(t, []);
    byType.get(t)!.push(s);
  }

  const orderedPrimary = sectionOrder.map((name) => {
    const items = byType.get(name);
    if (items && items.length > 0) return items[0];
    return { content: { __typename: name } };
  });

  const covered = new Set(sectionOrder);
  const extras = (visible as any[]).filter(
    (s) => !covered.has(getTypename(s) ?? ''),
  );

  return [...orderedPrimary, ...extras];
}
