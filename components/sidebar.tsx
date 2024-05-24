"use client";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import {
  FlaskConical,
  BookHeart,
  PersonStanding,
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
                  <BookHeart className="mr-2 h-4 w-4" />
                  For You
                </Button>
              </Link>
              <Link href={"/testing"}>
                <Button variant="ghost" className="w-full justify-start">
                  <FlaskConical className="mr-2 h-4 w-4" />
                  Testing Page
                </Button>
              </Link>
              <Link href={`/${session.data?.user?.email}`}>
                <Button variant="ghost" className="w-full justify-start">
                  <PersonStanding className="mr-2 h-4 w-4" />
                  Profil
                </Button>
              </Link>
            </div>
          </div>
          
        </div>
      </div>

      {/* Navbar mobile */}
      <div className="fixed bottom-0 left-0 right-0 bg-white shadow-md md:hidden flex justify-around py-2">
        <Link href={"/testing"}>
          <Button variant="ghost" className="flex flex-col items-center">
            <FlaskConical className="h-6 w-6" />
            <span className="text-xs">Testing</span>
          </Button>
        </Link>
        <Link href={"/"}>
          <Button variant="ghost" className="flex flex-col items-center">
            <BookHeart className="h-6 w-6" />
            <span className="text-xs">For You</span>
          </Button>
        </Link>
        <Link href={`/${session.data?.user?.email}`}>
          <Button variant="ghost" className="flex flex-col items-center">
            <PersonStanding className="h-6 w-6" />
            <span className="text-xs">Profile</span>
          </Button>
        </Link>
      </div>
    </>
  );
}
