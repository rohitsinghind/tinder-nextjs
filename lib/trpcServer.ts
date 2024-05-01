import { AppRouter, appRouter } from "@/server";
import { auth } from "@clerk/nextjs/server";
import { createServerSideHelpers } from '@trpc/react-query/server'
import superjson from 'superjson'

export const trpcServer = createServerSideHelpers<AppRouter>({
    router: appRouter,
    transformer: superjson,
    ctx: {
        clerk_id: auth().userId || '',
    }
})