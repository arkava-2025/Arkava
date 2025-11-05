# Sistema Dinámico de Servicios

## 📋 Descripción
Este sistema permite renderizar automáticamente los componentes de servicios basándose en el campo `ids` que viene del CMS Hygraph, manteniendo el orden definido en el CMS.

## 🏗️ Arquitectura

### 1. **Mapeo de Componentes** (`mapping.ts`)
- Conecta cada `ids` con su componente correspondiente
- Valida que los IDs sean correctos
- Proporciona funciones helper para obtener componentes

### 2. **Renderer Dinámico** (`ServiciosRenderer.astro`)
- Filtra servicios válidos basándose en el `ids`
- Mantiene el orden original del CMS
- Renderiza cada componente con sus datos correspondientes

### 3. **Página Principal** (`index.astro`)
- Código súper limpio y legible
- Solo obtiene datos y pasa al renderer
- Fácil de mantener y extender

## 🚀 Cómo Agregar un Nuevo Servicio

### Paso 1: Crear el Componente
```astro
// src/pages/servicios/nuevo-servicio.astro
---
interface Props {
  title: string;
  ids: string;
  resume?: string;
  description?: any;
  iconService?: string;
}

const { title, resume, description, iconService } = Astro.props;
---

<Section style="py-16 bg-white">
  <!-- Tu diseño aquí -->
</Section>
```

### Paso 2: Registrar en el Mapeo
```typescript
// src/lib/utils/servicios/mapping.ts
import NuevoServicio from '@/pages/servicios/nuevo-servicio.astro';

export const serviciosComponents = {
  // ... otros servicios
  'nuevo-servicio': NuevoServicio, // ← Agregar aquí
} as const;
```

### Paso 3: Configurar en el CMS
- Crear el servicio en Hygraph
- Asignar el `ids` como `'nuevo-servicio'`
- ¡Listo! Se renderizará automáticamente

## 📊 Flujo de Datos

```
CMS Hygraph → GraphQL Query → index.astro → ServiciosRenderer → Componente Individual
```

1. **CMS**: Define servicios con `ids`, `title`, `resume`, etc.
2. **GraphQL**: Obtiene datos ordenados
3. **Index**: Filtra solo servicios válidos
4. **Renderer**: Mapea `ids` a componentes
5. **Componente**: Recibe datos como props

## 🎯 Ventajas

- ✅ **Código limpio**: Index muy legible
- ✅ **Reutilizable**: Fácil agregar nuevos servicios
- ✅ **Orden dinámico**: Respeta orden del CMS
- ✅ **Type-safe**: Validación de IDs
- ✅ **Escalable**: Fácil mantenimiento

## 🔧 Debugging

En modo desarrollo, el renderer muestra información útil:
- Número de servicios renderizados
- Lista de IDs procesados
- Warnings para IDs no encontrados
