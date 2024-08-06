import Link from "next/link";

interface NotFoundProps {
    message?: string;
}
export default async function NotFound({message} : NotFoundProps) {
    return (
        <main className="flex items-center justify-center h-screen">
            <div className="text-center">
                <h1 className="text-4xl font-bold text-primary">404</h1>
                <p className="text-lg text-secondary-foreground mb-4 opacity-75">{message || 'Page not found'}</p>
                <Link href="/" className="text-primary hover:underline underline-offset-1">Go back home</Link>
            </div>
        </main>
    );
    
}