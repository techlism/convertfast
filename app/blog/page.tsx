import BlogHomePageArticles from '@/components/BlogHomePageHero';
import { getAllPosts } from '../actions';
import NotFound from '@/components/NotFound';
import { Separator } from '@/components/ui/separator';

export default async function Page() {
  const posts = await getAllPosts();

  if (posts instanceof Error || posts.length === 0) {
    return <NotFound message="No articles found" />;
  }

  return (
    <div>
      <div className="container mx-auto p-4">
        <h1 className="text-5xl font-bold mb-4">Welcome to Convertfast&apos;s Blog</h1>
        <p className="text-xl mb-8">Discover insights, tips, and stories on various topics.</p>
      </div>
      <Separator />
      <BlogHomePageArticles posts={posts} />
    </div>
  );
}