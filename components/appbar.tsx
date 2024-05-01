"use client"
import React from "react";
import { Home, Heart, CircleUser } from "lucide-react";
import { UserButton, SignedIn } from "@clerk/nextjs";
import Link from "next/link";
import { usePathname } from 'next/navigation'

export default function Appbar() {

    const pathname = usePathname()

  return (
    <SignedIn>
      <div className="w-full flex justify-between items-center py-1 px-6 gap-2">
        <Link href="/" className={pathname === "/"?'rounded-full bg-secondary p-2':'rounded-full p-2'}>
          <Home />
        </Link>
        <Link href="/matches" className={pathname === "/matches"?'rounded-full bg-secondary p-2':'rounded-full p-2'}>
          <Heart />
        </Link>
        <Link href="/profile" className={pathname === "/profile"?'rounded-full bg-secondary p-2':'rounded-full p-2'}>
          <CircleUser />
        </Link>
        <UserButton />
      </div>
    </SignedIn>
  );
}
