"use client";
import { useUserInfo } from "@/app/context/UserInfoContext";
import { getProjects } from "@/lib/data/project";
import { Project } from "@/types/tables";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function RightSide() {
	const userInfo = useUserInfo();
	const [projects, setProjects] = useState<Project[]>();

	useEffect(() => {
		getProjects({}).then((data) => {
			setProjects(data);
		});
	}, []);

	return (
		<div className="hidden lg:flex flex-col p-6 rounded-xl border border-gray-200 bg-white h-[600px] overflow-auto">
			<h2 className="mb-2 text-lg font-semibold tracking-tight">
				Vous êtes connecté en tant que
			</h2>
			<div className="text-gray-700 mb-6">
				{userInfo.userInfo?.pseudo ??
					userInfo.userInfo?.email ??
					"Anonyme"}
			</div>

			<h3 className="text-lg font-semibold tracking-tight py-2">
				Les derniers projets tendences
			</h3>
			{projects?.slice(0, 4).map((project) => (
				<div key={project._id} className="mb-4">
					<Link href={`/project/${project._id}`}>
						<h4 className="text-md font-semibold hover:text-blue-500 cursor-pointer">
							{project.title}
						</h4>
					</Link>
					<p className="text-gray-600">{project.description}</p>
				</div>
			))}
		</div>
	);
}
