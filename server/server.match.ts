import prisma from "@/lib/database";
import {z} from 'zod'
import { protectedProcedure, router } from "./trpc";

const createMatch = protectedProcedure
    .input(
        z.string().min(1, {
            message:"User id is required"
        })
    )
    .mutation(({ctx, input}) => {
        return prisma.user.update({
            where:{
                clerk_id: input,
            },
            data:{
                matched:{
                    connect:{clerk_id:ctx.clerk_id}
                }
            }
        })
    })

const myMatches = protectedProcedure
    .query(({ctx,input}) => {
        return prisma.user.findUnique({
            where:{
                clerk_id:ctx.clerk_id
            },
            select:{
                matched:true,
                matchedUser:true
            }
        })
    })

export const match = router({
    createMatch,
    myMatches
})