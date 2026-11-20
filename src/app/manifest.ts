import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'SUGGI CLUB — Specialty Coffee Pass',
    short_name: 'SUGGI CLUB',
    description: 'Discover Cafes. Subscribe to Coffee. Enjoy Every Day in Bengaluru.',
    start_url: '/app',
    display: 'standalone',
    background_color: '#FFFEFA',
    theme_color: '#244832',
    orientation: 'portrait',
    icons: [
      {
        src: '/icons/icon-192.svg',
        sizes: '192x192',
        type: 'image/svg+xml',
        purpose: 'maskable',
      },
      {
        src: '/icons/icon-512.svg',
        sizes: '512x512',
        type: 'image/svg+xml',
        purpose: 'any',
      },
    ],
  };
}
