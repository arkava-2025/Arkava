import Hero from '@/components/organisms/Hero.astro';
import NoComponentFile from '@/components/NoComponentFile.astro';

type Mapping = {
    [name: string]: any;
};

export const mapping: Mapping = {
    Hero: Hero
};

export function getComponentForName(name: string) {
    return mapping[name] ?? NoComponentFile;
}

export function isPreview() {
    return import.meta.env.HYGRAPH_IS_PREVIEW === 'yes';
}

