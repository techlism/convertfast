import { source } from "@/lib/source";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { FileText, Clock } from "lucide-react";
import Link from "next/link";

export default async function BlogPage() {
	const articles = source.getPages();

	return (
		<div className="container max-w-4xl py-12">
			<div className="mb-16 text-center">
				<h1 className="text-4xl font-bold tracking-tight mb-4">
					Convifi - Blog
				</h1>
				<p className="text-muted-foreground text-lg">
					Everything going on with Convifi.
				</p>
			</div>

			{articles.length === 0 ? (
				<div className="flex flex-col items-center justify-center h-[60vh] text-center space-y-6">
					<FileText className="h-16 w-16 text-muted-foreground" />
					<div className="space-y-2">
						<h2 className="text-2xl font-semibold">Content in Progress</h2>
						<p className="text-muted-foreground">
							New articles are being crafted with care
						</p>
					</div>
				</div>
			) : (
				<div className="grid gap-4">
					{articles.map((article) => (
						<Link
							key={article.url}
							href={article.url}
							className="group focus-visible:outline-none"
						>
							<Card className="transition-colors hover:bg-muted/25 group-hover:border-primary/25">
								<CardHeader className="pb-2">
									<CardTitle className="text-xl">
										<span className="group-hover:text-primary transition-colors">
											{article.data.title}
										</span>
									</CardTitle>
								</CardHeader>

								<CardContent className="pt-0">
									<div className="flex items-center gap-4 text-sm text-muted-foreground">
										{article.data.date && (
											<div className="flex items-center gap-1.5">
												<Clock className="h-4 w-4" />
												<time>
													{new Date(article.data.date).toLocaleDateString(
														"en-US",
														{
															year: "numeric",
															month: "short",
															day: "numeric",
														},
													)}
												</time>
											</div>
										)}
									</div>

									{article.data.description && (
										<p className="mt-4 text-muted-foreground leading-relaxed">
											{article.data.description}
										</p>
									)}
								</CardContent>
							</Card>
						</Link>
					))}
				</div>
			)}
		</div>
	);
}
