"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getUser } from "@/lib/data/user";
import { getProjects } from "@/lib/data/project";
import { getPosts } from "@/lib/data/post";
import type { User, Post, Project } from "@/types/tables";
import { ProjectCard } from "@/components/project";
import Posts from "./post";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
// import { ObjectId } from "mongodb";

export default function ProfilPage({
	params,
}: Readonly<{ params: { profil: string } }>) {
	const { profil } = params;
	const { data: session } = useSession();
	const [user, setUser] = useState<User>();
	const [userPosts, setUserPosts] = useState<Post[] | null>(null);
	const [userProjects, setUserProjects] = useState<Project[]>([]);
	const [participatingProjects, setParticipatingProjects] = useState<
		Project[]
	>([]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const decodeEmail = decodeURIComponent(profil);
				const userData = await getUser(decodeEmail);
				setUser(userData);

				const posts = await getPosts(-1, {
					"author.email": decodeEmail,
				});
				setUserPosts(posts);

				const projects = await getProjects({
					participants: { name: decodeEmail, role: "author" },
				});
				setUserProjects(projects);

				const participating = await getProjects({
					participants: {
						$elemMatch: {
							name: decodeEmail,
							role: { $ne: "author" },
						},
					},
				});
				setParticipatingProjects(participating);
			} catch (error) {
				console.error("Error fetching data: ", error);
			}
		};

		fetchData();
	}, [profil]);

	return (
		<div className="">
			<div className="">
				<div className="bg-white shadow-lg rounded-lg p-8 space-y-6">
					<div className="flex flex-col items-center">
						<h1 className="text-3xl font-extrabold text-gray-900">
							{user?.email}
						</h1>
						{user ? (
							<>
								{session?.user?.email ===
									decodeURIComponent(profil) && (
									<Link href={`/fill-information`}>
										<Button variant="link">Editer</Button>
									</Link>
								)}

								<table className="min-w-full divide-y divide-gray-200 mt-6">
									<tbody className="">
										{[
											{
												label: "Pseudo",
												value: user.pseudo,
											},
											{
												label: "Email",
												value: user.email,
											},
											{
												label: "Name",
												value: user.first_name,
											},
											{
												label: "Last Name",
												value: user.lastName,
											},
											{
												label: "Age",
												value: user.birth_date
													? new Date().getFullYear() -
													  new Date(
															user.birth_date
													  ).getFullYear()
													: "Unknown",
											},
											{
												label: "Location",
												value: user.localisation,
											},
											{
												label: "sexe",
												value: user.gender,
											},
											{
												label: "Bio",
												value: user.experience,
											},
											{
												label: "Available",
												value: user.available
													? "Yes"
													: "No",
											},
											{
												label: "Mobile",
												value: user.mobile,
											},
											{
												label: "Allow Emails",
												value: user.allowEmails
													? "Yes"
													: "No",
											},
											{
												label: "Account Creation",
												value: user.created,
											},
										].map(({ label, value }) => (
											<tr key={label}>
												<td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
													{label}:
												</td>
												<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
													{value?.toLocaleString()}
												</td>
											</tr>
										))}
									</tbody>
								</table>
							</>
						) : (
							<div className="mt-6 text-center text-gray-500">
								User not found 😔
							</div>
						)}
					</div>
					<div className="space-y-8">
						<section>
							<h2 className="text-2xl font-semibold text-gray-900">
								Postes
							</h2>
							{userPosts && userPosts.length > 0 ? (
								<div className="grid grid-cols-1 sm:grid-cols-2 gap-5 w-full px-10">
									{userPosts.map((post) => (
										<Posts key={post._id} post={post} />
									))}
								</div>
							) : (
								<div>No posts found</div>
							)}
						</section>
						<section>
							<h2 className="text-2xl font-semibold text-gray-900">
								Projets auxquels {decodeURIComponent(profil)}{" "}
								participe
							</h2>
							{participatingProjects.length > 0 ? (
								<div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
									{participatingProjects.map((project) => (
										<ProjectCard
											key={project._id}
											project={project}
										/>
									))}
								</div>
							) : (
								<div className="mt-6 text-center text-gray-500">
									Aucun projet trouvé
								</div>
							)}
						</section>
						<section>
							<h2 className="text-2xl font-semibold text-gray-900">
								Projets de {decodeURIComponent(profil)}
							</h2>
							{userProjects.length > 0 ? (
								<div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
									{userProjects.map((project) => (
										<ProjectCard
											key={project._id}
											project={project}
										/>
									))}
								</div>
							) : (
								<div className="mt-6 text-center text-gray-500">
									Aucun projet trouvé
								</div>
							)}
						</section>
					</div>
					{/* <SignOut /> */}
				</div>
			</div>
		</div>
	);
}
