"use client";
import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
	SquareKanban,
	FlaskConical,
	BookHeart,
	PersonStanding,
	SquareMousePointer,
} from "lucide-react";
import { useUserInfo } from '@/app/context/UserInfoContext';
export function Navbar() {
	const { userInfo, status } = useUserInfo();
    console.log(userInfo);

      

      return( <div>
          <div className="sm:hidden">
      <div className="w-full z-50 flex flex-row fixed bottom-0 bg-gray-200 shadow-md sm:hidden justify-around py-2 ">	
      <Link href={"/"}>
            <Button variant="ghost" className="h-15 w-15 flex flex-col items-center">
              
              <span className="text-sm"><BookHeart/></span>
            </Button>
          </Link>
          <Link href={`/${userInfo?.email}/projects`}>
            <Button variant="ghost" className="h-15 w-15 flex flex-col items-center">
              
              <span className="text-sm"><SquareKanban/></span>
            </Button>
          </Link>
          <Link href={`/${userInfo?.email}`}>
            <Button variant="ghost" className="h-15 w-15 flex flex-col items-center">
              
              <span className="text-sm"><PersonStanding/></span>
            </Button>
          </Link>
          <Link href={`/new-project`}>
            <Button variant="ghost" className="h-15 w-15 flex flex-col items-center">
                  
                  <span className="text-sm"><SquareMousePointer/></span>
              </Button>
          </Link>
      </div>
      </div>
      </div>
  );
  };

  export default Navbar;