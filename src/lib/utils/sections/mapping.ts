import Hero from '@/components/organisms/Hero.astro';
import Servicios from '@/components/organisms/Servicios.astro';
import Experiencia from '@/components/organisms/Experiencia.astro';
import NoComponentFile from '@/components/NoComponentFile.astro';
import SectionWrapper from '@/components/templates/SectionWrapper.astro';

export const sectionOrder = [
  'Hero',
  'Test',
  'Servicios',
  'Experiencia',
  'Faq',
];

type Mapping = { [name: string]: any };

export const sectionMapping: Mapping = {
  Hero,
  Experiencia,
  Servicios,
  Faq: SectionWrapper,
  Test: SectionWrapper,
};

export function getComponentForName(name: string) {
  return sectionMapping[name] ?? NoComponentFile;
}
