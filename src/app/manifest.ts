import type { MetadataRoute } from 'next'

/**
 * Provides the metadata for PWA
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Book Library',
    short_name: 'BookLibrary',
    description: 'An app to help you find your favorite books',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#000000',
    icons: [
      {
        src: '/icons/icon-128x128.png',
        sizes: '128x128',
        type: 'image/png',
      },
      {
        src: '/icons/icon-256x256.png',
        sizes: '256x256',
        type: 'image/png',
      },
    ],
  }
}
