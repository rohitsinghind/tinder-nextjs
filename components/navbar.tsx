import React from "react";
import { Button } from "./ui/button";
import { ThemeToggle } from "./themeToggle";
import { SignedIn } from "@clerk/nextjs";

import { Bell } from "lucide-react";

export default function Navbar() {
  return (
    <nav>
      <div className="flex w-full justify-between items-center p-2">
        <h1>PiyaMilan Chowk</h1>
        <div className="flex items-center gap-0">
          {/* <SignedIn>
            <Button className="rounded-full" variant="ghost" size="icon">
              <Bell className="h-[1.2rem] w-[1.2rem" />
            </Button>
          </SignedIn> */}
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}
