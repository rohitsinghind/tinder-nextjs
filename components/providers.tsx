"use client";

import React from "react";
import { useState } from "react";
import { Toaster } from "@/components/ui/toaster"
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { type ThemeProviderProps } from "next-themes/dist/types";
import { dark } from "@clerk/themes";
import { ClerkProvider } from "@clerk/nextjs";
import { useTheme } from "next-themes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/client";
import superjson from "superjson";
import { trpcClient } from "@/lib/trpcClient";

function TrpcProvider({ children }:{ children : React.ReactNode}){
  const [queryClient] = useState(() => new QueryClient({}))
  const [client] = useState(()=>
  trpcClient.createClient({
    links:[
      httpBatchLink({
        url: "https://tinder-next.vercel.app/api/trpc",
        transformer:superjson
      })
    ]
  }))

  return (
    <trpcClient.Provider client={client} queryClient={queryClient}>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
    </trpcClient.Provider>
  )
}


export function Provider({ children, ...props }: ThemeProviderProps) {

  const theme = useTheme();


  return (
    <TrpcProvider>
    <NextThemesProvider {...props}>
      {" "}
      <ClerkProvider
        appearance={{
          // variables: {
          //   colorPrimary: "hsl(262.1 83.3% 57.8%)",
          // },
          baseTheme: theme.resolvedTheme === "dark" ? dark : undefined,
        }}
      >
        {children}
        <Toaster />
      </ClerkProvider>
    </NextThemesProvider>
    </TrpcProvider>
  );
}
