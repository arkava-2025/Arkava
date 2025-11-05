// Mapeo dinámico de servicios por ID
import Carpinteria from '@/pages/servicios/carpinteria.astro';
import CieloRaso from '@/pages/servicios/cielo-raso.astro';
import Enchape from '@/pages/servicios/enchape.astro';
import MurosDecorativos from '@/pages/servicios/muros-decorativos.astro';
import MurosDrywall from '@/pages/servicios/muros-drywall.astro';
import Pintura from '@/pages/servicios/pintura.astro';
import Estuco from '@/pages/servicios/estuco.astro';
import Argamasa from '@/pages/servicios/argamasa.astro';

// Mapeo de IDs a componentes
export const serviciosComponents = {
    'argamasa': Argamasa,
  'carpinteria': Carpinteria,
  'cielo-raso': CieloRaso,
  'enchape': Enchape,
  'muros-decorativos': MurosDecorativos,
  'muros-drywall': MurosDrywall,
  'pintura': Pintura,
  'estuco': Estuco,
} as const;

// Tipo para los IDs válidos
export type ServicioId = keyof typeof serviciosComponents;

// Función helper para obtener el componente por ID
export function getServicioComponent(id: string) {
  return serviciosComponents[id as ServicioId];
}

// Función para validar si un ID es válido
export function isValidServicioId(id: string): id is ServicioId {
  return id in serviciosComponents;
}
