// types/post.ts
export interface PostMetadata {
    title: string;
    date: string;
    excerpt: string;
    author: {
      name: string;
      avatar: string;
    };
    coverImage: string;
    [key: string]: any;
}
  
export interface Post extends PostMetadata {
    slug: string;
    content: string;
}