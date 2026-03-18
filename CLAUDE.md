# Arkava — Claude Code Context

## Project Overview
Astro website for **Arkava**, empresa colombiana de acabados arquitectónicos de alto nivel y remodelación integral con sede en **Medellín**. Atiende proyectos residenciales, comerciales y de hospitalidad (hoteles).

## Business Context

### Propuesta de valor
Aliado integral "llave en mano": desde evaluación técnica inicial hasta entrega final. Diferenciadores clave:
- Presupuestos transparentes (sin costos ocultos), contratos legales, pagos por etapas, pólizas de cumplimiento
- Asesoría de diseño de interiores previa a la ejecución
- Portafolio en hospitalidad: Hoteles Hunters, Heiss, Nakua, Calle Flora

### Servicios principales
- Remodelación integral (casas, apartamentos, locales)
- Acabados de lujo: enchapes, pintura profesional, estuco, argamasa
- Construcción liviana: cielo rasos, muros drywall
- Carpintería arquitectónica a medida
- Muros decorativos artesanales
- Mantenimiento de planta física: obras civiles, plomería, electricidad

### Metodología de 5 etapas
1. Evaluación técnica
2. Planeación y presupuesto
3. Ejecución
4. Supervisión y control
5. Entrega final

### Contexto de copy y tono
- Público: clientes premium residenciales y sector hospitality en Medellín
- Tono: profesional, elegante, confiable — nunca genérico ni informal
- Todo el contenido del sitio está en **español**

## Tech Stack
- **Framework**: Astro 5 with React integration (`@astrojs/react`)
- **Styling**: Tailwind CSS v4 (`@tailwindcss/vite`)
- **CMS**: Hygraph (GraphQL) via `graphql-request`
- **Animation**: Framer Motion, GSAP
- **UI Components**: Radix UI, shadcn-style components in `src/components/ui/`
- **Contact**: EmailJS (`@emailjs/browser`)
- **Analytics**: Vercel Analytics + Speed Insights
- **Package manager**: pnpm

## Commands
```bash
pnpm dev       # Dev server at http://localhost:4321
pnpm build     # Production build to ./dist/
pnpm preview   # Preview production build
pnpm codegen   # Regenerate GraphQL types from Hygraph schema
pnpm lint      # ESLint
```

## Environment Variables
- `HYGRAPH_ENDPOINT` — Hygraph GraphQL API URL (required)
- EmailJS keys (used in `src/lib/utils/form-emailjs.ts`)

## Project Structure
```
src/
  components/
    atoms/       — Basic reusable Astro components (Button, Title, etc.)
    molecules/   — Composed components (Menu, FormContact, ImageModal, etc.)
    organisms/   — Page sections (Hero, Header, Footer, Servicios, etc.)
    templates/   — Layout wrappers
    ui/          — shadcn-style React components (button, carousel)
  icons/         — SVG icon Astro components
  layouts/       — BaseLayout.astro
  lib/
    hygraph/     — GraphQL client + queries
    utils/       — Helpers (sections, services mapping, markdown, form)
  pages/
    index.astro
    sobre-nosotros.astro
    contacto.astro
    proyectos/   — [slug].astro + index.astro
    servicios/   — individual service pages
  gql/           — Auto-generated GraphQL types (do not edit manually)
  content/       — Astro content config
```

## Data Fetching Pattern
Pages fetch data from Hygraph at build time:
```astro
const { page } = await getHomePage('home', isPreview() ? 'DRAFT' : 'PUBLISHED');
```
Sections are ordered via `buildOrderedSections()` and rendered dynamically with `ComponentRenderer.astro`.

## Pipelines & Agents

> Cuando recibas una tarea relacionada con los dominios abajo, delega al agente correspondiente leyendo su `AGENT.md` y siguiendo sus instrucciones.

### 🔍 SEO Agent → `.claude/pipelines/seo/AGENT.md`
**Delegar todo lo relacionado a:**
- Auditorías SEO (técnico, contenido, on-page, schema, performance)
- Creación y optimización de contenido con keywords
- robots.txt, sitemap, canonical URLs
- Schema / structured data (LocalBusiness, Service, FAQ, Breadcrumb)
- SEO local Medellín, hreflang, Google Search Console
- Análisis de competidores
- Plan y estrategia SEO

**Skills disponibles para este agente:**
`seo` · `seo-audit` · `seo-technical` · `seo-content` · `seo-writer` · `seo-page` · `seo-plan` · `seo-schema` · `seo-sitemap` · `seo-geo` · `seo-hreflang` · `seo-gsc` · `seo-competitor-pages` · `humanizer`

**Regla:** Todo contenido de texto producido para el sitio pasa por `humanizer` antes de entregarse.

---

## Key Conventions
- Astro components for static/server-rendered parts; React (`client:load` or `client:visible`) only for interactive components
- GraphQL types are auto-generated — run `pnpm codegen` after schema changes, never edit `src/gql/` manually
- Tailwind CSS v4 (no `tailwind.config.js` — config is in CSS or `astro.config`)
- Spanish language throughout (page routes, content, variable names in business logic)
