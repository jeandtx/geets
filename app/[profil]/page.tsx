import { auth, signOut } from "@/app/auth";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getUser } from "@/lib/data/user";
import { getProjects } from "@/lib/data/project";
import { getPosts } from "@/lib/data/post";
import type { Project } from "@/types/tables";
import { ProjectCard } from "@/components/project";
import UpdateProfil from "./updateprofil";

function SignOut() {
	return (
		<form
			action={async () => {
				"use server";
				await signOut();
			}}
		>
			<Button variant={"outline"} type="submit">
				Sign out
			</Button>
		</form>
	);
}

export default async function ProfilPage({
	params,
}: Readonly<{
	params: { profil: string };
}>) {
	const { profil } = params;
	const decodeEmail = decodeURIComponent(profil);
	const user = await getUser(decodeEmail);
	const userPosts = await getPosts(-1, {
		"author.email": decodeEmail,
	});
	const userProjects = await getProjects({
		participants: {
			name: decodeEmail,
			role: "author",
		},
	});
	const participatingProjects = await getProjects({
		participants: {
			$elemMatch: { name: decodeEmail, role: { $ne: "author" } },
		},
	});

	return (
		<div className="">
			<h1 className="text-3xl font-bold">{user?.email}</h1>
			{user ? <UpdateProfil user={user} /> : <div>User not found 😔</div>}
			<h2 className="text-2xl font-bold">My Posts</h2>
			{userPosts.length > 0 ? (
				<div className="grid grid-cols-1 sm:grid-cols-2 gap-5 w-full px-10">
					{await Promise.all(
						userPosts.map(async (post) => {
							return (
								<div
									key={post._id}
									className="flex overflow-hidden rounded-xl border border-slate-200 bg-white"
								>
									<div className="wrapper py-7">
										<div className="header px-10 mb-4">
											<div>
												<p className="text-sm text-gray-600">
													{post.project?.title
														? post.project.title
														: "Nom de projet"}{" "}
													•{" "}
													{post.project?._id
														? post.project._id
														: "ID de projet"}
												</p>
											</div>
										</div>
										<div className="body px-10 space-y-5">
											<p className="text-gray-900 mb-0">
												{post.content}
											</p>
										</div>
									</div>
								</div>
							);
						})
					)}
				</div>
			) : (
				<div>No posts found</div>
			)}
			<h2 className="text-2xl font-bold">My Projects</h2>
			{Array.isArray(userProjects) && userProjects.length > 0 ? (
				<div className="grid grid-cols-1 sm:grid-cols-2 gap-5 w-full px-10">
					{userProjects.map((project) => (
						<ProjectCard key={project._id} project={project} />
					))}
				</div>
			) : (
				<div>No projects found</div>
			)}
			<h2 className="text-2xl font-bold">
				Projects {decodeEmail} is participating in
			</h2>
			{participatingProjects.length > 0 ? (
				<div className="grid grid-cols-1 sm:grid-cols-2 gap-5 w-full px-10">
					{await Promise.all(
						participatingProjects.map(async (project: Project) => {
							const author = project.participants
								? project.participants.find(
										(participant) =>
											participant.role === "author"
								  )
								: null;

							const authorInfo = await getUser(
								author?.name || ""
							);
							return (
								<div
									key={project._id.toString()}
									className="flex max-w-xl overflow-hidden rounded-xl border border-slate-200 bg-white"
								>
									<div className="wrapper py-7">
										<div className="header px-10 mb-4">
											<div>
												<Link
													href={`/${author?.name}/${project._id}`}
												>
													<p className="text-lg text-gray-900 font-bold">
														{project.title}
													</p>
												</Link>
												<p className="text-sm text-gray-600">
													{project.description}
												</p>
												<p className="text-sm text-gray-600">
													Author:{" "}
													{authorInfo
														? authorInfo.email
														: "Unknown"}
												</p>
											</div>
										</div>
									</div>
								</div>
							);
						})
					)}
				</div>
			) : (
				<div>No participating projects found</div>
			)}
			<SignOut />
		</div>
	);
}
