import { router } from "./trpc";
import { user } from "./server.user";
import { match } from "./server.match";

export const appRouter = router({
    user,
    match
})

export type AppRouter = typeof appRouter