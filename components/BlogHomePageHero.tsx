import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "./ui/card";
import Link from 'next/link';

import { Post } from "../lib/types";

interface BlogPageArticlePreviewProps {
    post: Post;
}

function BlogPageArticlePreview({ post }: BlogPageArticlePreviewProps) {
    return (        
        <Card className="hover:shadow-md transition-all ease-in-out">
            <CardHeader>
                <CardTitle>{post.title}</CardTitle>
                <CardDescription className="text-pretty text-base">
                    {post.excerpt}
                </CardDescription>
            </CardHeader>
            <CardContent>
                <img src={post.coverImage} alt={post.title} className="border rounded-lg shadow-md" />
            </CardContent>
            <CardFooter className="flex justify-between items-center">
                <div className="flex items-center">
                    <Avatar>
                        <AvatarImage src={post.author.avatar} alt={post.author.name} />
                        <AvatarFallback>{post.author.name[0]}</AvatarFallback>
                    </Avatar>
                    <p className="ml-2 text-gray-500">{post.author.name}</p>                    
                </div>
                <Link href={`/blog/${post.slug}`}>
                    <span className="bg-blue-500 text-white px-4 py-2 rounded-md">Read More</span>
                </Link>
            </CardFooter>
        </Card>
    );
}

interface BlogHomePageArticlesProps {
    posts: Post[];
}

export default function BlogHomePageArticles({ posts }: BlogHomePageArticlesProps) {
    return (
        <div className="max-w-7xl mx-auto p-10 grid grid-cols-1 xl:grid-cols-2 lg:grid-cols-2 items-center gap-10">
            {posts.map((post) => (
                <BlogPageArticlePreview key={post.slug} post={post} />
            ))}
        </div>
    );
}