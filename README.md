# Pet Shop El Gaucho — Proyecto Web

Experiencia web inmersiva para Pet Shop El Gaucho (Sarandí, Buenos Aires).
Ver `PARTE-1-Concepto-Creativo.md` para la dirección creativa completa.

## Rebrand v2 (post-entrega)

Después de la entrega original (paleta negro/naranja, Parte 1), el cliente pidió un cambio de identidad visual completo:

- **Paleta**: `#D99058` (terracota) como color principal, `#F4EDE3` (crema) como fondo. Aplicado en todo el sitio cambiando los valores hex detrás de los mismos tokens de Tailwind (`base.black` ahora ES crema, `neutral.white` ahora ES tinta oscura, ver comentario en `tailwind.config.ts`) — evita tener que tocar cada componente uno por uno.
- **Menú mobile**: reescrito con scroll-lock a prueba de iOS Safari (fija el body en vez de solo `overflow:hidden`), cierre al tocar el fondo (backdrop) además de los links, y botón de cierre explícito.
- **Mobile-first**: tipografía fluida con `clamp()` en vez de tamaños fijos por breakpoint, `overflow-x: hidden` global, botones táctiles de 44px mínimo.
- **Perro 3D**: geometría más orgánica (cápsulas/esferas en vez de cajas), ojos y nariz para expresión amigable, sombras suaves reales (`PCFSoftShadowMap` + `shadow-radius`), luz de relleno adicional. Sigue siendo procedural — no se pudo conseguir un modelo `.glb` real sin acceso a internet.

## Stack

- **Next.js 14** (App Router) — framework base, SSR/SEO.
- **React 18**
- **TypeScript**
- **Tailwind CSS** — sistema de diseño (ver `tailwind.config.ts`, tokens definidos en la Parte 1).
- **GSAP** (+ ScrollTrigger) — animaciones de scroll complejas, pinned sections.
- **Framer Motion** — microinteracciones, transiciones de componentes React.
- **Three.js + React Three Fiber + Drei** — escena 3D del Hero (perro corriendo, cámara, partículas, luces).
- **Lenis** — smooth scroll global, sincronizado con GSAP ScrollTrigger.
- **Zustand** — estado global liviano (ej: estado del panel admin, filtros de catálogo).

## Estructura de carpetas

```
pet-shop-el-gaucho/
├── public/
│   ├── fonts/              Neue Montreal, Satoshi (se agregan en Parte 3)
│   ├── models/              Modelos 3D (.glb) del perro/gato
│   └── images/
│       ├── products/
│       ├── categories/
│       └── gallery/
│
├── src/
│   ├── app/                 Rutas (App Router)
│   │   ├── layout.tsx       Layout raíz + metadata SEO global
│   │   ├── page.tsx         Home (orquesta todas las secciones)
│   │   ├── admin/           Panel administrador (Parte 10, noindex)
│   │   ├── sitemap.ts
│   │   ├── robots.ts
│   │   └── manifest.ts
│   │
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar/      Parte 4
│   │   │   └── Footer/      Parte 9
│   │   ├── sections/        Una carpeta por sección de la Home (Partes 3, 5-9)
│   │   │   ├── Hero/
│   │   │   ├── AboutUs/
│   │   │   ├── Categories/
│   │   │   ├── Products/
│   │   │   ├── Gallery/
│   │   │   ├── Benefits/
│   │   │   ├── Testimonials/
│   │   │   └── Contact/
│   │   ├── three/           Componentes de la escena 3D (Parte 3)
│   │   │   ├── Scene/
│   │   │   ├── Dog/
│   │   │   ├── Particles/
│   │   │   └── Lighting/
│   │   ├── ui/               Componentes reutilizables (botones, cards, etc.)
│   │   └── providers/
│   │       └── SmoothScrollProvider.tsx   Lenis global, ya funcional
│   │
│   ├── hooks/                useMediaQuery, y los que se sumen por sección
│   ├── lib/
│   │   └── constants.ts     Fuente única de verdad: datos del negocio, WhatsApp link, colores
│   ├── data/                 Contenido estático tipado (categorías, productos, testimonios)
│   ├── types/                 Tipos de dominio (Product, Category, Testimonial, etc.)
│   └── styles/                Estilos adicionales si algún componente 3D lo requiere
│
├── tailwind.config.ts        Design tokens (colores, tipografía, spacing) — Parte 1 → código
├── next.config.js            Imágenes, headers, soporte para .glb
└── .env.example
```

## Principios de arquitectura

1. **Ningún dato de negocio hardcodeado en componentes.** Todo pasa por `src/lib/constants.ts` o `src/data/*`.
2. **Una carpeta por sección/componente grande**, no archivos sueltos gigantes — facilita que cada Parte del proyecto se desarrolle de forma aislada.
3. **El scroll suave (Lenis) ya está conectado a nivel global** en `layout.tsx` vía `SmoothScrollProvider`. Todas las animaciones de scroll que se agreguen en las próximas partes (GSAP ScrollTrigger, parallax, pinned sections) se sincronizan contra esta misma instancia.
4. **SEO resuelto a nivel de infraestructura desde ahora**: metadata dinámica, sitemap, robots.txt y manifest ya están armados — no se dejan para el final.
5. **`/admin` está excluido de indexación** desde ya (robots + metadata), aunque su desarrollo funcional es la Parte 10.

## Estado actual

✅ **Home completa** — Navbar, Hero 3D, Sobre Nosotros, Categorías, Productos, Galería, Beneficios, Testimonios, Contacto y Footer, en el orden narrativo definido en la Parte 1.
✅ **Panel administrador** (Parte 10) — CRUD de productos, categorías y textos, en `/admin`.
✅ **Optimización** (Parte 11) — ver detalle abajo.

## Optimización (Parte 11)

**Una aclaración honesta primero:** no tengo forma de correr Lighthouse real acá (no hay browser ni build en este entorno). Lo que sigue son las optimizaciones concretas que sí quedaron implementadas en el código — verificar el puntaje real conviene hacerlo una vez deployado (Vercel te lo muestra automáticamente, o `npx lighthouse` local).

- **Fuentes**: migradas a `next/font/google` (Bricolage Grotesque + Inter), auto-hosteadas en el build — cero requests externos en runtime, sin layout shift por fuente. Neue Montreal/Satoshi son de pago y no se pudieron descargar sin internet; quedó documentado en `layout.tsx` cómo reemplazarlas por las reales vía `next/font/local` apenas se consigan los `.woff2`.
- **Code splitting del Hero 3D**: `Scene.tsx` (Three.js + R3F + Drei, la parte más pesada del bundle) se carga con `next/dynamic({ ssr: false })` — queda en su propio chunk y no bloquea el resto del sitio ni intenta renderizar WebGL en el servidor.
- **Mobile-aware**: en pantallas chicas, la escena 3D baja `dpr` a 1, desactiva sombras/antialiasing y reduce partículas de 300 a 120 — el efecto se mantiene, el costo de GPU baja bastante.
- **`prefers-reduced-motion`**: cubierto en dos capas — CSS puro (`globals.css`, para transiciones nativas) y un hook (`useReducedMotion`, para GSAP/Framer/R3F). Con el flag activado, el Hero ni siquiera activa el pin de scroll — el usuario ve la escena estática, sin forzar movimiento que pidió explícitamente evitar.
- **Imágenes**: `next/image` en todos lados (lazy por defecto, formatos AVIF/WebP), `minimumCacheTTL` de 30 días para el catálogo.
- **SEO**: metadata completa (Parte 2) + **datos estructurados JSON-LD** (`LocalBusinessJsonLd.tsx`, schema `PetStore` con dirección, teléfono y horario) para que Google pueda mostrar rich snippets.
- **Accesibilidad**: skip-link al contenido principal, foco visible (`focus-visible`) en todos los elementos interactivos, `aria-expanded`/`aria-controls`/`role="dialog"` en el menú mobile, `alt` en todas las imágenes.
- **Dark mode**: es el único modo del sitio, por decisión de diseño (Parte 1) — la identidad "instinto/contraste absoluto" depende del negro dominante; un modo claro real le rompería la personalidad a la marca. Si en algún momento se necesita por un motivo puntual (ej. impresión), se puede agregar un toggle que solo afecte utilidades puntuales, pero no se implementó un tema claro completo porque contradice el concepto creativo acordado.
- **Limpieza de código**: aproveché esta parte para sacar algunos archivos duplicados/sin uso que habían quedado de iteraciones anteriores (`ui/Counter.tsx`, `ui/FloatingCard.tsx`, hooks duplicados) — el proyecto queda con una sola fuente de verdad por componente.

## Panel administrador (Parte 10)

Ruta: **`/admin`** — protegida por contraseña (`NEXT_PUBLIC_ADMIN_PASSWORD` en `.env`, default `elgaucho2026` si no se define).

**Importante sobre cómo funciona:** los datos se guardan en `localStorage` del navegador vía un store de Zustand (`src/lib/store/useAdminStore.ts`), no en una base de datos real. Es la solución correcta para este entorno de desarrollo (sin acceso a internet para levantar una DB), y anda perfecto para uso interno desde una sola computadora. Si más adelante el negocio quiere que los cambios se vean para *todos* los visitantes del sitio (no solo en el navegador donde se editó), hay que migrar ese store a una API real con base de datos — la forma de los datos y las acciones (`addProduct`, `updateProduct`, etc.) quedan iguales, así que no implica rehacer el panel.

Qué se puede editar sin tocar código:
- **Productos**: crear, editar, eliminar — nombre, precio, descripción, imagen (URL), categoría, destacado.
- **Categorías**: crear, editar, eliminar — nombre, descripción, imagen.
- **Textos y banners**: título y subtítulo del Hero, textos de Sobre Nosotros (eyebrow, título en 2 líneas, 2 párrafos), y las 3 cifras de los contadores.

Todo lo editado en `/admin` se refleja al instante en la Home (`Products.tsx`, `Categories.tsx`, `Hero.tsx`, `AboutUs.tsx` leen del mismo store).

Hay un botón "Restaurar valores originales" en el panel para volver todo al seed inicial.

## Hero 3D — cómo funciona (Parte 3)

```
src/
├── hooks/useHeroScroll.ts              Conecta Lenis + GSAP ScrollTrigger, expone progress 0→1
├── components/sections/Hero/Hero.tsx    Contenedor pinneado (300vh) + texto de marca + reveal inicial
└── components/three/
    ├── Scene/Scene.tsx                  Canvas de R3F, arma la escena completa
    ├── Scene/CameraRig.tsx              Orbita la cámara ~200° según el progreso de scroll
    ├── Characters/Dog.tsx               Perro low-poly procedural con animación de correr por código
    ├── Characters/Cat.tsx               Aparece cuando progress > 0.55
    ├── Particles/Particles.tsx          Partículas que entran progresivamente (polvo/hojas)
    └── Lighting/Lighting.tsx            Transición de luz fría → cálida (naranja de marca)
```

**Sobre el perro:** es 100% procedural (geometrías + animación por código), no un modelo `.glb` hiperrealista — no hay forma de descargar un asset real sin acceso a internet en este entorno. `Dog.tsx` incluye, comentado, el snippet exacto (`useGLTF` + `useAnimations` de Drei) para reemplazarlo por un modelo rigged real apenas consigas uno; el resto del sistema (cámara, luces, scroll) no cambia.

**Ventanas narrativas del scroll** (dentro de `Scene.tsx`), tal como se definieron en la Parte 1:
- `0.00–0.30` — apertura + giro de cámara
- `0.15–0.65` — partículas entran progresivamente
- `0.30–1.00` — luz pasa de fría a cálida
- `0.55–1.00` — entra el gato

Para probarlo: `npm install && npm run dev`, entrar a `/` y scrollear — los primeros 300vh están pinneados y disparan toda la secuencia.

## Plan de partes (referencia)

3. ✅ Hero 3D · 4. ✅ Navbar · 5. ✅ Sobre Nosotros · 6. ✅ Categorías · 7. ✅ Productos · 8. ✅ Galería · 9. ✅ Beneficios/Testimonios/Contacto/Footer · 10. ✅ Panel Admin · 11. ✅ Optimización y SEO final.

**Proyecto completo.** Próximos pasos reales para producción: fotografía propia del local (reemplazar placeholders de Unsplash), fuentes de marca licenciadas, migrar el panel admin a una base de datos real, y autenticación real en `/admin`.
