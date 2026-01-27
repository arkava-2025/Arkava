import Hero from '@/components/organisms/Hero.astro';
import Servicios from '@/components/organisms/Servicios.astro';
import Experiencia from '@/components/organisms/Experiencia.astro';
import HowWeWorks from '@/components/organisms/HowWeWorks.astro';
import ProyectosHome from '@/components/organisms/ProyectosHome.astro';
import NoComponentFile from '@/components/NoComponentFile.astro';
import FaqHome from '@/components/organisms/FaqHome.astro';
import TestimonialsHome from '@/components/organisms/TestimonialsHome.astro';
import SectionWrapper from '@/components/templates/SectionWrapper.astro';

export const sectionOrder = [
  'Hero',
  'Experiencia',
  'Servicios',
  'HowWeWorks',
  'ProyectosHome',
  'FaqHome',
  'TestimonialsHome',
  'Alianzas',
];

type Mapping = { [name: string]: any };

export const sectionMapping: Mapping = {
  Hero,
  Experiencia,
  Servicios,
  HowWeWorks,
  ProyectosHome,
  FaqHome,
  TestimonialsHome,
  Alianzas: SectionWrapper,
};

export function getComponentForName(name: string) {
  return sectionMapping[name] ?? NoComponentFile;
}
