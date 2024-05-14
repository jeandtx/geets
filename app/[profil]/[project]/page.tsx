import clientPromise from "@/lib/mongodb";
import { Metadata } from "next";
import { auth } from "@/app/auth";

export const metadata: Metadata = {
	title: "All Projects",
};

export default async function ProjectPage({
	params,
}: Readonly<{
	params: { profil: string; project: string };
}>) {
	return (
		<div className="">
			<h1>You are on the projectId page !</h1>
			<div>
				Watching project {params.project} from {params.profil}
			</div>
		</div>
	);
}
