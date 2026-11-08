import { MetadataRoute } from 'next';

export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/checkout'],
    },
    sitemap: 'https://novawear.com/sitemap.xml',
  };
}
