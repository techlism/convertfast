import type { MetadataRoute } from 'next';

// Import your conversions array
import { conversions } from '@/lib/conversion-formats'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://convertfast.media'
  
  // Static routes
  const staticRoutes : MetadataRoute.Sitemap = [
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
    {
        url : `${baseUrl}/compress-images`,
        lastModified : new Date(),
        priority : 0.8
    },
    {
        url : `${baseUrl}/remove-bg`,
        lastModified : new Date(),
        priority : 0.8
    },
    {
      url : `${baseUrl}/convert/document`,
      lastModified : new Date(),
      priority : 0.8
    }
  ]

  // Generate routes for app/[format]
  // const legacyFormatRoutes = conversions.map((conversion) => ({
  //   url: `${baseUrl}/${conversion.from.toLowerCase()}-to-${conversion.to.toLowerCase()}`,
  //   lastModified: new Date(),
  //   priority: 0.7,
  // }))
  // Commenting out the legacyFormats because let's see does it fix the issues

  // Generate routes for app/convert/[format]
  const newFormatRoutes = conversions.map((conversion) => ({
    url: `${baseUrl}/convert/${conversion.from.toLowerCase()}-to-${conversion.to.toLowerCase()}`,
    lastModified: new Date(),
    priority: 0.9,
  }))

  return Array.from(new Set([...staticRoutes, ...newFormatRoutes]));
}