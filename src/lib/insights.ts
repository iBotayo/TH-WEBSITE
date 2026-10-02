import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export interface InsightPost {
  title: string;
  slug: string;
  date: string;
  author: 'Ben Shekari' | 'Ayodeji Olaniyan';
  role: string;
  category: 'Research' | 'Frameworks' | 'Perspectives';
  readingTime: string;
  excerpt: string;
  published: boolean;
  content: string;
}

const INSIGHTS_DIRECTORY = path.join(process.cwd(), 'src/content/insights');

/**
 * Retrieves all published insights sorted by date descending.
 * Gracefully returns an empty array if no approved markdown articles exist.
 */
export async function getAllInsights(): Promise<InsightPost[]> {
  if (!fs.existsSync(INSIGHTS_DIRECTORY)) {
    return [];
  }

  const fileNames = fs.readdirSync(INSIGHTS_DIRECTORY);
  const markdownFiles = fileNames.filter((file) => file.endsWith('.md') || file.endsWith('.mdx'));

  if (markdownFiles.length === 0) {
    return [];
  }

  const posts: InsightPost[] = [];

  for (const fileName of markdownFiles) {
    const fullPath = path.join(INSIGHTS_DIRECTORY, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    // Only include posts explicitly marked published
    if (data.published === true) {
      posts.push({
        title: data.title || '',
        slug: data.slug || fileName.replace(/\.mdx?$/, ''),
        date: data.date || '',
        author: data.author || 'Ben Shekari',
        role: data.role || 'ThinkingHead',
        category: data.category || 'Perspectives',
        readingTime: data.readingTime || '5 min read',
        excerpt: data.excerpt || '',
        published: Boolean(data.published),
        content,
      });
    }
  }

  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

/**
 * Retrieves a single published insight by slug.
 */
export async function getInsightBySlug(slug: string): Promise<InsightPost | null> {
  const posts = await getAllInsights();
  const post = posts.find((p) => p.slug === slug);
  return post || null;
}

/**
 * Retrieves the N most recent published insights.
 * Used for the conditional homepage section.
 */
export async function getRecentInsights(count: number = 2): Promise<InsightPost[]> {
  const posts = await getAllInsights();
  return posts.slice(0, count);
}
