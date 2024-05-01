"use client";

import React,{useEffect} from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { trpcClient } from "@/lib/trpcClient";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast"
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const formSchema = z.object({
  age: z.string().min(2, {
    message: "Age must be at least 10+.",
  }),
  gender: z.string().min(3,{
    message:"Invalid gender"
  }),
  location: z.string().min(3, {
    message: "Location must be at least 3 characters.",
  }),
  bio: z.string().min(3, {
    message: "Username must be at least 3 characters.",
  }),
});

export default function Profile() {

    const { toast } = useToast()

    const {
      data: userData,
      isLoading: userLoading,
      refetch
    } = trpcClient.user.getMyProfile.useQuery()

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      age: userData?.age?.toString() || "",
      gender: userData?.gender || "",
      location: userData?.location || "",
      bio: userData?.bio || "",
    },
  });

  const {
    mutate,
    error,
    isPending
  } = trpcClient.user.updateUser.useMutation({
    onSuccess: () => {
      toast({
        title: "Profile Updated",
      })
      refetch()
    }
  })

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    mutate({
      age:parseInt(values.age),
      gender:values.gender,
      location: values.location,
      bio: values.bio
    })
  }

  useEffect(() => {
    if (userData) {
      form.setValue('age', userData.age?.toString() || "");
      form.setValue('gender', userData.gender || "");
      form.setValue('location', userData.location || "");
      form.setValue('bio', userData.bio || "");
    }
  }, [userData]);

  return (
    <div>
      <ScrollArea className="h-[calc(100vh-105px)] w-full rounded-lg border p-4">
        <h1 className="text-center font-semibold text-lg mb-6">Edit Profile</h1>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 pb-4 px-1"
          >
            <div className="flex gap-4">
              <FormField
                control={form.control}
                name="age"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Age</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your age" {...field} type="number" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Gender</FormLabel>
                    <FormControl>
                      <Select>
                        <SelectTrigger className="w-[180px]">
                          <SelectValue
                            placeholder="Select your gender"
                            {...field}
                          />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="male">Male</SelectItem>
                          <SelectItem value="female">Female</SelectItem>
                          <SelectItem value="others">Others</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your location" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bio</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Enter your bio" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isPending || userLoading} className="w-full">
              Update
            </Button>
          </form>
        </Form>
      </ScrollArea>
    </div>
  );
}
