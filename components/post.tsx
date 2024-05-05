"use client";
import React from "react";
import {
	Card,
	CardContent,
	CardDate,
	CardFooter,
	CardHeader,
	CardTitle,
	CardImage,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import BadgeList from "@/components/ui/badge";
import Img from "next/image";

interface PostProps extends React.HTMLAttributes<HTMLDivElement> {
	className?: string;
	jsonData: {
		Title: string;
		Time: {
			$date: string;
		};
		Thème: string;
		Date: string;
		Media: string;
		Labels: string[];
		Participants: number;
	};
}

export function Post({ className, jsonData, ...props }: Readonly<PostProps>) {
	return (
		<div className="flex flex-col">
			<Card
				className={`border border-gray-200 rounded-lg p-4 shadow-sm ${className}`}
				{...props}
			>
				<CardHeader className="flex justify-between">
					<Avatar>
						<AvatarImage
							src="https://github.com/shadcn.png"
							alt="@shadcn"
						/>
						<AvatarFallback>CN</AvatarFallback>
					</Avatar>
					<CardTitle className="text-lg font-bold">
						{jsonData.Title}
					</CardTitle>

					<CardDate className="text-sm text-gray-500">
						{new Date(jsonData.Time.$date).toLocaleString()}
					</CardDate>
				</CardHeader>

				<CardContent className="mt-4">
					<div className="text-gray-700 font-medium">
						{jsonData.Date}
					</div>
					<CardImage>
						<Img
							src={jsonData.Media}
							alt={jsonData.Title}
							className="flex justify-center items-center rounded-md mt-4 "
							style={{ width: "30%", height: "auto" }}
							width={1080}
							height={720}
						/>
					</CardImage>

					<div className="mt-2 text-sm text-gray-600 flex justify-between">
						<BadgeList
							jsonData={{ Labels: jsonData.Labels }}
						></BadgeList>
					</div>
					<div className="mt-2">
						<div className="text-sm text-gray-600 flex justify-between">
							Participants:
						</div>{" "}
						{jsonData.Participants}
					</div>
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
