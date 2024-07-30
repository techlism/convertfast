import BlogHomePageArticles from '@/components/BlogHomePageHero';

import { getAllPosts } from '../actions';

export default async function Page() {
  const posts = await getAllPosts();
  if(posts instanceof Error) {
    return <div>Error: {posts.message}</div>;
  }
  return (
    <div>
      <h1 className="text-4xl font-bold text-center my-10">My Blog</h1>
      <BlogHomePageArticles posts={posts} />
    </div>
  );
}

