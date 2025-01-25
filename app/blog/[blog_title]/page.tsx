import { source } from "@/lib/source";
import { DocsBody } from "fumadocs-ui/page";
import defaultMdxComponents from "fumadocs-ui/mdx";
import customMdxComponents from "@/components/blog-components";
import { Separator } from "@/components/ui/separator";
import { TableofContents } from "@/components/blog-components/table-of-content";
import type { Metadata } from "next";

export const dynamicParams = false;
export const dynamic = "force-static";

export const generateStaticParams = () => {
	return source.getPages().map((page) => ({
		blog_title: page.slugs[0],
	}));
};

export const generateMetadata = async (props: {
    params: Promise<{ blog_title: string }>;
  }) => {
    const params = await props.params;
    const post = source.getPage([params.blog_title]);
    if (post === undefined) return;
  
    const title = post.data.title;
    const description = post.data.description;
    const imageParams = new URLSearchParams();
    imageParams.set('title', title);
    imageParams.set('description', description ?? '');
  
    return {
      metadataBase: new URL(
        process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000',
      ),
      title,
      description,
      openGraph: {
        title,
        description,
        url: post.url,
      },
      twitter: {
        title,
        description,

      },
      alternates: {
        canonical: post.url,
      },
    } satisfies Metadata;
  };

export default function Page({ params }: { params: { blog_title: string } }) {
	const page = source.getPage([params.blog_title]);
	if (page) {
		const MDX = page?.data.body;
		const toc = page.data.toc;

		return (
			<article className="max-w-7xl mx-auto py-6 px-4 space-y-2">
				<div className="space-y-4">
					{page.data.cover_url && (
						<img
							src={page.data.cover_url}
							alt="cover"
							className="rounded-lg shadow-sm"
						/>
					)}
					<h1 className="text-4xl mb-4 font-semibold">{page.data.title}</h1>
					<div className="flex gap-2 text-sm text-fd-muted-foreground">
						<p>{page.data.author}</p>|
						<p>
							{page.data.date.toLocaleDateString("en-US", {
								year: "numeric",
								month: "short",
								day: "numeric",
							})}
						</p>
					</div>
				</div>
				<Separator />
				<TableofContents toc={toc} />
				<MDX components={{ ...customMdxComponents }} />
			</article>
		);
	}
	return <h1>No article</h1>;
}
