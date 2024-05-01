import z from 'zod'

//user validation
export const updateUserValidation = z.object({
    age: z 
        .number()
        .min(18,{
            message:"you must be 18+"
        }),
    gender: z
        .string(),
    location: z
        .string()
        .min(3,"Must enter valid Location"),
    bio: z 
        .string()
        .min(3,{
            message:"Bio is too short"
        }),
})