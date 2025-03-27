import fs from 'node:fs/promises';
import path from 'node:path';
import matter from 'gray-matter';
import type { Post, PostMetadata } from '../lib/types';

const postsDirectory = path.join(process.cwd(), 'articles');

// function isValidSlug(slug: string): boolean {
//     return /^[a-zA-Z0-9_-]+$/.test(slug);
// }

export async function getPostSlugs(): Promise<string[] | Error> {
    try {
        const data = await fs.readdir(postsDirectory);
        return data;
    } catch (error) {
        return error as Error;
    }
}

export async function getPostBySlug(slug: string): Promise<Post | Error> {
    try {
        const realSlug = slug.replace(/\.md$/, '');
        // console.log('realSlug:', realSlug); 
        const fullPath = path.join(postsDirectory, `${realSlug}.md`);        
        const fileContents = await fs.readFile(fullPath, 'utf8');            
        const { data, content } = matter(fileContents);
        
        if (!data.title || !data.date || !data.excerpt || !data.author || !data.coverImage) {
            throw new Error('Missing required metadata in post');
        }
        
        return {
            slug: realSlug,
            metadata: data as PostMetadata,
            content,
            title: data.title,
            date: data.date,
            excerpt: data.excerpt,
            author: data.author,
            coverImage: data.coverImage
        };
    } catch (error) {
        return error as Error;
    }
}

export async function getAllPosts(): Promise<Post[] | Error> {
    try {
        const slugs = await getPostSlugs();
        if(slugs instanceof Error) {
            throw slugs;
        }
        const postsPromises = slugs.map((slug) => getPostBySlug(slug));
        const posts = await Promise.all(postsPromises);
        const filteredPosts = posts.filter((post): post is Post => !(post instanceof Error));
        
        if(filteredPosts.length === 0) {
            throw new Error('No valid posts found');
        }
        
        return filteredPosts.sort((post1, post2) => 
            (new Date(post2.metadata.date).getTime() - new Date(post1.metadata.date).getTime())
        );
    } catch (error) {
        return error as Error;
    }
}