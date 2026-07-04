/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  images: {
    // Formatos modernos para máxima calidad con menor peso
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 días — las imágenes de producto/categoría no cambian seguido
    remotePatterns: [
      // Placeholders de estilo de vida (Sobre Nosotros, Categorías,
      // Productos, Galería) — reemplazar por fotografía propia del local
      // cuando esté disponible.
      //
      // IMPORTANTE: se usaba antes source.unsplash.com, pero ese servicio
      // fue discontinuado por Unsplash — devolvía 502 en cada imagen, lo
      // que generaba errores en cadena por todo el sitio (incluyendo el
      // crash del menú mobile reportado). Se migró a loremflickr.com,
      // que sigue funcionando y también sirve imágenes reales por keyword.
      {
        protocol: 'https',
        hostname: 'loremflickr.com',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },

  // Compresión activa por defecto
  compress: true,

  // Headers de seguridad y performance base
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        ],
      },
    ];
  },

  // Permite importar modelos 3D (.glb/.gltf) como assets estáticos
  webpack(config) {
    config.module.rules.push({
      test: /\.(glb|gltf)$/,
      type: 'asset/resource',
    });
    return config;
  },
};

module.exports = nextConfig;
