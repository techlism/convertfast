import React from 'react';
import ReactMarkdown from 'react-markdown';
import { createHighlighter, type Highlighter } from 'shiki';
import { getPostBySlug } from "@/app/actions";
import aurora from 'shiki/themes/aurora-x.mjs';
import NotFound from '@/components/NotFound';


let highlighter: Highlighter | null = null;

export default async function BlogPost({params}: {params: {title: string}}) {
    const {title} = params;
    const post = await getPostBySlug(title);
    if(post instanceof Error) {
        if(post?.message.includes('ENOENT')) {
            return <NotFound message="No such article!" />;

        }
        return <NotFound message="An unexpected error occured" />;
    }

    if (!highlighter) {
        highlighter = await createHighlighter({
            themes: [aurora],
            langs: ['javascript', 'typescript', 'html', 'css', 'json', 'markdown', 'python']
        });
    }

    return (
        <main className="max-w-5xl mx-auto px-4 py-8">
            <div className="mb-8">
                <p className="text-sm text-gray-400 mb-2">Project Updates • {post.date}</p>
                <h1 className="text-5xl font-bold mb-4 text-primary">{post.title}</h1>
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
                    className="w-full rounded-lg shadow-md"
                />
            </div>
            <article className="prose lg:prose-xl md:prose-base max-w-full mx-auto">
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
                        h2: ({ node, ...props }) => <h2 className="text-xl font-bold  text-primary" {...props} />,
                        h3: ({ node, ...props }) => <h3 className="text-lg font-bold  text-primary" {...props} />,
                        strong: ({ node, ...props }) => <strong className="font-semibold text-primary" {...props} />,
                        table: ({ node, ...props }) => <table className="w-full  text-primary rounded-lg" {...props} />,
                        div: ({ node, ...props }) => <div className="mx-auto rounded-lg shadow-sm text-primary flex justify-center items-center max-w-full" {...props} />,
                        img: ({ node, ...props }) => <img className='rounded-lg max-w-full mx-auto my-4 border' src={props.src} alt={props.alt} />,
                        em: ({ node, ...props }) => <em className="italic text-primary" {...props} />,
                        p: ({ node, ...props }) => <p className=" text-primary w-full text-justify" {...props} />,
                        ul: ({ node, ...props }) => <ul className="list-inside text-primary" {...props} />,
                        ol: ({ node, ...props }) => <ol className="list-inside text-primary" {...props} />,
                        li: ({ node, ...props }) => <li className="mb-2 text-primary" {...props} />,
                        blockquote: ({ node, ...props }) => <blockquote className="border-l-4 border-gray-300 pl-4 italic my-4 text-primary" {...props} />,
                        hr: ({ node, ...props }) => <hr className="my-4 border" {...props} />,
                        a: ({ node, ...props }) => <a className="text-primary decoration-transparent hover:underline hover:decoration-primary underline-offset-1 ease-in-out" {...props} />,
                    }}
                >
                    {post.content}
                </ReactMarkdown>
            </article>
        </main>
    );
}