'use client'
import posthog from 'posthog-js'
import { PostHogProvider as PHProvider } from 'posthog-js/react'

const POSTHOG_PUBLIC_KEY = process.env.NEXT_PUBLIC_POSTHOG_KEY || "";
const POSTHOG_HOST = process.env.NEXT_PUBLIC_POSTHOG_HOST || "";

if (typeof window !== 'undefined') {
    posthog.init(POSTHOG_PUBLIC_KEY, {
        api_host: POSTHOG_HOST,
        person_profiles: 'always', // or 'always' to create profiles for anonymous users as well
    })
}
export function PostHogProvider({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return <PHProvider client={ posthog }>
        { children }
        </PHProvider>
}