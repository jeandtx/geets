"use client"
import React from 'react';
import { Card, CardContent, CardDate, CardFooter, CardHeader, CardTitle, CardImage } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import BadgeList from '@/components/ui/badge';

const jsonData = {
  Title: "Tricks of the Trade",
  Time: {
    $date: "2023-06-28T09:09:58Z",
  },
  Thème: "Magic & Illusion",
  Date:
    "Learn to perform magic tricks and illusions that will amaze your friends and family, from beginner to advanced levels.",
  Media:
    "https://images.unsplash.com/photo-1558723223-0f8c63ea0fed?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1OTQ2NjB8MHwxfHNlYXJjaHwxfHxNYWdpYyUyMCUyNiUyMElsbHVzaW9ufGVufDB8fHx8MTcxNDAzODIwOHww&ixlib=rb-4.0.3&q=80&w=1080",
  Labels: ["event", "when", "agreement"],
  Participants: 2,
};

export function CardDemo({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (

    <div className="flex flex-col">
      <Card className={`border border-gray-200 rounded-lg p-4 shadow-sm ${className}`}{...props}>
      
      <CardHeader className="flex justify-between">
        
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
        <CardTitle className="text-lg font-bold">{jsonData.Title}</CardTitle>
        
          <CardDate className="text-sm text-gray-500">
              {new Date(jsonData.Time.$date).toLocaleString()}
            </CardDate>
        </CardHeader>

        <CardContent className="mt-4">
        <p className="text-gray-700 font-medium">{jsonData.Date}</p>
        <CardImage><img
            src={jsonData.Media}
            alt={jsonData.Title}
            className="flex justify-center items-center rounded-md mt-4 "
            style={{ width: "30%", height: "auto" }}
          /></CardImage> 
          
          <ul className="mt-2 text-sm text-gray-600 flex justify-between">
          <BadgeList jsonData={{ Labels: jsonData.Labels }}></BadgeList>
          </ul>
        <p className="mt-2">
            <strong>Participants:</strong> {jsonData.Participants}
        </p>
       </CardContent>

      <CardFooter className="mt-4">
        <Button className="w-full">
          <Send className="mr-2 h-4 w-4" /> Contact the Person
        </Button>
      </CardFooter>
    </Card>


    </div>
    
  );
}