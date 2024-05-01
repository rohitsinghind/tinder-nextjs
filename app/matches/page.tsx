"use client"
import React from 'react'
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {z} from 'zod'
import { trpcClient } from '@/lib/trpcClient'

const matches = [1,2,3,4,5,6,7,7,8,1,2,3,4,5,5]

export default function Matches() {

    const {
        data: matchData,
        isLoading: matchLoading,
        refetch
    } = trpcClient.match.myMatches.useQuery()

    console.log(matchData)

  return (
    <div>
        <ScrollArea className="h-[calc(100vh-105px)] w-full rounded-lg border p-4">
            <h1 className='text-center font-semibold text-lg mb-4'>Matches</h1>
            {
                matchData?.matched?.map((item,index)=>(
                    <div key={index} className='w-full flex items-center rounded-full p-1 gap-4 bg-secondary mb-2 hover:dark:bg-gray-900 hover:bg-gray-200 cursor-pointer'>
                        <Avatar>
                        <AvatarImage src={item?.imgUrl || "https://github.com/shadcn.png"} />
                        <AvatarFallback>{item?.name?.substring(0,1)}</AvatarFallback>
                        </Avatar>
                        <h1>{item?.name}</h1>
                    </div>
                ))
            }
        </ScrollArea>
    </div>
  )
}
