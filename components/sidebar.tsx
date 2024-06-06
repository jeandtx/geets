"use client";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import {
  Zap,
  Home,
  CircleUserRoundIcon,
} from "lucide-react";
import Link from "next/link";
import { useSession } from "next-auth/react";

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Sidebar({ className }: SidebarProps) {
  const session = useSession();

  return (
    <>
      <div className={cn("pb-12 md:block hidden", className)}>
        <div className="space-y-4 py-4">
          <div className="px-3 py-2">
            <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
              Navigate
            </h2>
            <div className="space-y-1">
              <Link href={"/"}>
                <Button variant="ghost" className="w-full justify-start">
                  <Home className="mr-2 h-6 w-6" />
                  Home
                </Button>
              </Link>
              <Link href={"/dashboard"}>
                <Button variant="ghost" className="w-full justify-start">
                  <Zap className="mr-2 h-6 w-6" />
                  Dash board
                </Button>
              </Link>
              <Link href={'/profil'}>
                <Button variant="ghost" className="w-full justify-start">
                  <CircleUserRoundIcon className="mr-2 h-6 w-6" />
                  Profil
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Navbar mobile */}
      <div className="fixed bottom-0 left-0 right-0 bg-gray-200 shadow-md md:hidden flex justify-around py-2 rounded-tl-3xl rounded-tr-3xl">   
           <Link href={"/dashboard"}>
          <Button variant="ghost" className="h-15 w-15 flex flex-col items-center">
            <Zap className="h-12 " />
            <span className="text-sm">Dashboard</span>
          </Button>
        </Link>
        <Link href={"/"}>
          <Button variant="ghost" className="h-15 w-15 flex flex-col items-center">
            <Home className="h-12" />
            <span className="text-sm">Home</span>
          </Button>
        </Link>
        <Link href={`/profil`}>
          <Button variant="ghost" className="h-15 w-15 flex flex-col items-center">
            <CircleUserRoundIcon className="h-12" />
            <span className="text-sm">Profile</span>
          </Button>
        </Link>
      </div>
    </>
  );
}
