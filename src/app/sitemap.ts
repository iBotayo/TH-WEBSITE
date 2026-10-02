import { MetadataRoute } from 'next';
import { getAllInsights } from '@/lib/insights';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://thinkinghead.ng';
  const lastModified = new Date();

  // Core public routes
  const routes = [
    '',
    '/about',
    '/services',
    '/method',
    '/work',
    '/leadership',
    '/insights',
    '/contact',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified,
    changeFrequency: 'monthly' as const,
    priority: route === '' ? 1.0 : 0.8,
  }));

  // Dynamic published insight articles (if any exist)
  const publishedInsights = await getAllInsights();
  const insightRoutes = publishedInsights.map((post) => ({
    url: `${baseUrl}/insights/${post.slug}`,
    lastModified: new Date(post.date || lastModified),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  return [...routes, ...insightRoutes];
}
