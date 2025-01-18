import type { MetadataRoute } from 'next';

// Import your conversions array
import { conversions } from '@/lib/conversion-formats'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://convertfast.media'
  
  // Static routes
  const staticRoutes = [
    {
      url: baseUrl,
      lastModified: new Date(),
      priority: 1,
    },
    {
      url: `${baseUrl}/blog/about`,
      lastModified: new Date(),
      priority: 0.8,
    },
    {
      url: `${baseUrl}/report`,
      lastModified: new Date(),
      priority: 0.8,
    },
  ]

  // Generate routes for app/[format]
  const legacyFormatRoutes = conversions.map((conversion) => ({
    url: `${baseUrl}/${conversion.from.toLowerCase()}-to-${conversion.to.toLowerCase()}`,
    lastModified: new Date(),
    priority: 0.9,
  }))

  // Generate routes for app/convert/[format]
  const newFormatRoutes = conversions.map((conversion) => ({
    url: `${baseUrl}/convert/${conversion.from.toLowerCase()}-to-${conversion.to.toLowerCase()}`,
    lastModified: new Date(),
    priority: 0.9,
  }))

  return [...staticRoutes, ...legacyFormatRoutes, ...newFormatRoutes]
}