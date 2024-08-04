import React from 'react';
import ReactMarkdown from 'react-markdown';
import { createHighlighter, type Highlighter } from 'shiki';
import { getPostBySlug } from "@/app/actions";
import aurora from 'shiki/themes/aurora-x.mjs';
import Image from 'next/image';

let highlighter: Highlighter | null = null;

export default async function BlogPost({params}: {params: {title: string}}) {
    const {title} = params;
    const post = await getPostBySlug(title);
    if(post instanceof Error) {
        return <div className="text-red-600">Error: {post.message}</div>;
    }

    if (!highlighter) {
        highlighter = await createHighlighter({
            themes: [aurora],
            langs: ['javascript', 'typescript', 'html', 'css', 'json', 'markdown', 'python']
        });
    }

    return (
        <main className="max-w-4xl mx-auto px-4 py-8">
            <div className="mb-8">
                <p className="text-sm text-gray-400 mb-2">Company News • {post.date}</p>
                <h1 className="text-4xl font-bold mb-4 text-primary">{post.title}</h1>
                <p className="text-lg text-secondary-foreground mb-4 opacity-75">{post.excerpt}</p>
                <div className="flex items-center mb-6">
                    <img 
                        src={post.author.avatar} 
                        alt={post.author.name} 
                        width={40} 
                        height={40} 
                        className="rounded-full mr-3"
                    />
                    <p className="text-sm text-gray-400">{post.author.name}</p>
                </div>
                <img
                    src={post.coverImage} 
                    alt={post.title} 
                    width={800} 
                    height={400} 
                    className="w-full rounded-lg shadow-md"
                />
            </div>
            <article className="prose lg:prose-xl">
                <ReactMarkdown
                    components={{
                        code({ node, className, children, ...props }) {
                            const match = /language-(\w+)/.exec(className || '');
                            const lang = match ? match[1] : '';
                            const code = String(children).replace(/\n$/, '');

                            if (lang) {
                                const html = highlighter?.codeToHtml(code, { lang, theme: aurora });
                                // biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
                                return <div dangerouslySetInnerHTML={{ __html: html || '' }} className="my-4" />;
                            }

                            return <code className={className} {...props}>{children}</code>;
                        },
                        // Add custom styling for other Markdown elements
                        h2: ({ node, ...props }) => <h2 className="text-2xl font-bold mt-8 mb-4 text-primary" {...props} />,
                        h3: ({ node, ...props }) => <h3 className="text-xl font-bold mt-6 mb-4 text-primary" {...props} />,
                        strong: ({ node, ...props }) => <strong className="font-semibold text-primary" {...props} />,
                        table: ({ node, ...props }) => <table className="w-full mb-4 text-primary rounded-lg" {...props} />,
                        div: ({ node, ...props }) => <div className="mx-auto rounded-lg shadow-sm text-primary flex justify-center items-center max-w-full" {...props} />,
                        article: ({ node, ...props }) => <article className="prose lg:prose-xl text-primary w-full mx-auto flex flex-col items-center" {...props} />,
                        img: ({ node, ...props }) => <img className='rounded-lg max-w-full mx-auto my-4' src={props.src} alt={props.alt} />,
                        em: ({ node, ...props }) => <em className="italic text-primary" {...props} />,
                        p: ({ node, ...props }) => <p className="mb-4 text-primary" {...props} />,
                        ul: ({ node, ...props }) => <ul className="list-disc pl-5 mb-4 text-primary" {...props} />,
                        ol: ({ node, ...props }) => <ol className="list-decimal pl-5 mb-4 text-primary" {...props} />,
                        li: ({ node, ...props }) => <li className="mb-2 text-primary" {...props} />,
                        blockquote: ({ node, ...props }) => <blockquote className="border-l-4 border-gray-300 pl-4 italic my-4 text-primary" {...props} />,
                        hr: ({ node, ...props }) => <hr className="my-8 border" {...props} />,
                    }}
                >
                    {post.content}
                </ReactMarkdown>
            </article>
        </main>
    );
}