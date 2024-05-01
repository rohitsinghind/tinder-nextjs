"use client"
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { MapPin, Heart } from "lucide-react";
import { trpcClient } from "@/lib/trpcClient";
import {arrayOutputType, z} from 'zod'

export default function Home() {

  const {
    data: userData,
    isLoading: userLoading,
    refetch
  } = trpcClient.user.getAllUsers.useQuery()

  const {
    data: myData,
    isLoading: myDataLoading,
    refetch: refetchMyData
  } = trpcClient.user.getMyProfile.useQuery()

  const {
    mutate,
    error,
    isPending
  } = trpcClient.match.createMatch.useMutation({
    onSuccess: () => {
      console.log("matched")
      refetch()
    }
  })

  const handleMatchClick = (id:string) => {
    mutate(id)
  }


interface User {
    clerk_id?: string;
}

const isMatched = (matched: User[] | undefined): boolean => {
    return matched?.some(user => user.clerk_id === myData?.clerk_id) || false;
};

  return (
    <div>
      <Carousel>
        <CarouselContent>
          {userData?.map((item) => (
            <CarouselItem key={item?.id}>
              <div className="relative h-[calc(100vh-105px)]">
                <Image
                  src={item?.imgUrl || "/rohit.jpeg"}
                  height={1280}
                  width={720}
                  alt=""
                  className="object-cover h-[calc(100vh-105px)] object-center p-1 rounded-xl z-10"
                />
                <div className="absolute z-40 bottom-0 left-0 right-0 m-1 mr-4 w-full bg-gradient-to-t from-black h-52 rounded-xl pt-12 px-4 text-gray-100">
                  <div className="flex gap-2 justify-between">
                    <div>
                      <h1 className="font-medium text-3xl ">
                        {item?.name} <span className="font-light">{item?.age}</span>
                      </h1>

                      <div className="flex items-center gap-2 mt-1">
                        <MapPin />
                        <h2 className="text-lg">{item?.location}</h2>
                      </div>
                    </div>
                    <div className="mr-2">
                      <Button
                        onClick={()=>handleMatchClick(item.clerk_id)}
                        disabled={isPending}
                        variant="outline"
                        size="icon"
                        className={` rounded-full border-white ${isMatched(item?.matched)?'bg-red-400':'bg-transparent'}`}
                      >
                        <Heart />
                      </Button>
                      <h2 className="text-center mt-1 text-sm">{item?.matched?.length}</h2>
                    </div>
                  </div>
                  <p className="text-sm text-gray-300 mt-2">
                    {
                      item?.bio
                    }
                  </p>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}
