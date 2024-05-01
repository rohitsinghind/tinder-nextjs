import { updateUserValidation } from "@/common/validation";
import prisma from "@/lib/database";
import {z} from 'zod'
import { protectedProcedure, router } from "./trpc";

const updateUser = protectedProcedure
    .input(updateUserValidation)
    .mutation(({ ctx, input }) => {
        return prisma.user.update({
            where: {
                clerk_id: ctx.clerk_id,
              },
            data:{
                age:input.age,
                location:input.location,
                gender:input.gender,
                bio:input.bio
            }
        })
    })

export const getAllUsers = protectedProcedure
    // .input(
    //     z.string().min(1,{
    //         message: 'User id is required'
    //     })
    // )
    .query(({ ctx, input}) => {
        // console.log(input)
        return prisma.user.findMany({
            where:{
                NOT:{
                    clerk_id: ctx.clerk_id
                }
            },
            select:{
                name:true,
                id:true,
                gender:true,
                bio:true,
                imgUrl:true,
                location:true,
                age:true,
                clerk_id:true,
                matched:true
            }
        })

    })

    export const getMyProfile = protectedProcedure
    // .input(
    //     z.string().min(1,{
    //         message: 'User id is required'
    //     })
    // )
    .query(({ ctx, input}) => {
        // console.log(input)
        return prisma.user.findUnique({
            where: {
                clerk_id: ctx.clerk_id,
              },
            select:{
                name:true,
                id:true,
                gender:true,
                bio:true,
                imgUrl:true,
                location:true,
                age:true,
                matched:true,
                clerk_id:true
            }
        })

    })

export const user = router({
    getAllUsers,
    getMyProfile,
    updateUser
})