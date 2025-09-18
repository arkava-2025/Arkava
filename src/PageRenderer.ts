import Hero from '@/components/organisms/Hero.astro';
import Servicios from '@/components/organisms/Servicios.astro';
import Experiencia from '@/components/organisms/Experiencia.astro';
import NoComponentFile from '@/components/NoComponentFile.astro';
import SectionWrapper from '@/components/templates/SectionWrapper.astro';

type Mapping = {
    [name: string]: any;
};

export const mapping: Mapping = {
    Hero: Hero,
    Experiencia: Experiencia,
    Servicios: Servicios,
    Faq: SectionWrapper,
    Test: SectionWrapper,
};


// Order de componentes en el Home
export const sectionOrder: string[] = [
    'Hero',
    'Servicios',
    'Experiencia',
    'Test',
    'Faq',
];

function getTypeNameFromSection(item: any): string {
    // Prefer the GraphQL union typename from the content since it maps to our component names
    const byContent = item?.content?.__typename;
    if (typeof byContent === 'string' && byContent) return byContent;

    // Then try the enum from Hygraph when available
    const byEnum = item?.sectionType;
    if (typeof byEnum === 'string' && byEnum) return byEnum;

    // Fallback to wrapper typename
    const byWrapper = item?.__typename;
    return typeof byWrapper === 'string' ? byWrapper : '';
}

export function getOrderRankForType(name: string): number {
    const idx = sectionOrder.findIndex((n) => n === name || n.toLowerCase() === name.toLowerCase());
    return idx === -1 ? Number.MAX_SAFE_INTEGER : idx;
}

// Create a minimal synthetic section object for a given type name
export function synthesizeSectionForType(name: string, data: any = {}): any {
    return {
        id: `synthetic-${name}`,
        internalName: `${name} (synthetic)`,
        sectionType: name,
        isVisible: true,
        content: {
            __typename: name,
            ...data,
        },
    };
}

// Ensure that every name listed in sectionOrder appears at least once.
// This lets you display components (e.g., React ones) on Home without touching queries.
export function ensureComponentsFromOrderPresent(sections: any[]): any[] {
    const list = Array.isArray(sections) ? [...sections] : [];
    // Build a case-insensitive set of present typenames
    const presentLower = new Set(
        list
            .map((s) => (s?.content?.__typename ?? s?.sectionType ?? s?.__typename))
            .filter(Boolean)
            .map((n: string) => n.toLowerCase())
    );
    for (const name of sectionOrder) {
        if (!presentLower.has(name.toLowerCase())) {
            list.push(synthesizeSectionForType(name));
        }
    }
    return list;
}

// Remove duplicate sections by typename (case-insensitive), keeping the first occurrence
export function dedupeSectionsByType(sections: any[]): any[] {
    const seen = new Set<string>();
    const result: any[] = [];
    for (const s of Array.isArray(sections) ? sections : []) {
        const name = (s?.content?.__typename ?? s?.sectionType ?? s?.__typename ?? '').toString().toLowerCase();
        if (!name) {
            result.push(s);
            continue;
        }
        if (!seen.has(name)) {
            seen.add(name);
            result.push(s);
        }
    }
    return result;
}

// Utility to sort a list of sections (objects coming from Hygraph) by local order
export function sortSectionsByLocalOrder(sections: any[]): any[] {
    const copy = Array.isArray(sections) ? [...sections] : [];

    const result = copy.sort((a, b) => {
        const aName = getTypeNameFromSection(a);
        const bName = getTypeNameFromSection(b);
        return getOrderRankForType(aName) - getOrderRankForType(bName);
    });

    return result;
}

export function getComponentForName(name: string) {
    return mapping[name] ?? NoComponentFile;
}

export function isPreview() {
    return import.meta.env.HYGRAPH_IS_PREVIEW === 'yes';
}

