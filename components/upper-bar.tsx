"use client";
import React, { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import InfiniteScroll from "@/components/infinitescroll";
import { InputPost } from "@/components/inputpost";
import { getPosts } from "@/lib/data/post";
import { useUserInfo } from "@/app/context/UserInfoContext";
import { getProjects } from "@/lib/data/project";
import { Project } from "@/types/tables";

interface UpperbarProps extends React.HTMLAttributes<HTMLDivElement> {}

const TabContent = ({
	value,
	children,
}: {
	value: string;
	children: React.ReactNode;
}) => (
	<TabsContent value={value} className="flex flex-col space-y-4">
		{children}
	</TabsContent>
);

export const UpperBar = ({ className }: UpperbarProps) => {
	const [selectedTab, setSelectedTab] = useState("recent");
	const { userInfo } = useUserInfo();
	const [projects, setProjects] = useState<Project[]>([]);
	useEffect(() => {
		if (!userInfo) return;
		getProjects({ "participants.name": userInfo.email }).then(
			(projects: Project[]) => {
				setProjects(projects);
			}
		);
	}, [userInfo]);

	const handleTabClick = (tabName: string) => {
		setSelectedTab(tabName);
	};

	return (
		<div className="flex flex-col items-center">
			<Tabs defaultValue="popular">
				<div className="mx-auto flex flex-col md:flex-row justify-between items-center">
					<TabsList className="py-5 space-x-3">
						<TabsTrigger
							value="popular"
							onClick={() => handleTabClick("popular")}
						>
							Populaires 🔥
						</TabsTrigger>
						<TabsTrigger
							value="friends"
							onClick={() => handleTabClick("Abonnements")}
						>
							Suivis 👥
						</TabsTrigger>
						<TabsTrigger
							value="recent"
							onClick={() => handleTabClick("recent")}
						>
							Récents ⏳
						</TabsTrigger>
					</TabsList>
				</div>
				<div className="w-full">
					<TabContent value="recent">
						<div className="hidden sm:block">
							<InputPost />
						</div>
						<InfiniteScroll
							fetchFunction={(page: number) =>
								getPosts(page, {}, { time: -1 })
							}
						/>
					</TabContent>
					<TabContent value="popular">
						<div className="hidden sm:block">
							<InputPost />
						</div>
						<InfiniteScroll
							fetchFunction={(page: number) =>
								getPosts(page, {}, { score: -1, time: -1 })
							}
						/>
					</TabContent>
					<TabContent value="friends">
						<div className="hidden sm:block">
							<InputPost />
						</div>
						<InfiniteScroll
							fetchFunction={(page: number) =>
								getPosts(
									page,
									{
										"project._id": {
											$in: projects.map((p) => p._id),
										},
									},
									{ score: -1, time: -1 }
								)
							}
						/>
					</TabContent>
				</div>
			</Tabs>
		</div>
	);
};
