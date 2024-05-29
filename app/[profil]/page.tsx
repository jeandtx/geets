import { signOut } from "@/app/auth";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getUser } from "@/lib/data/user";
import { getProjects } from "@/lib/data/project";
import { getUserPosts } from "@/lib/data/post";
import type { Project } from "@/types/tables";
import { ProjectCard } from "@/components/project";

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
	const userPosts = await getUserPosts(decodeEmail);
	const userProjects = await getProjects({ author: decodeEmail });
	const participatingProjects = await getProjects({
		participants: [decodeEmail],
	});

	return (
		<div className="flex flex-col items-center w-full space-y-5 text-black py-5">
			<h1 className="text-3xl font-bold">{user.email}</h1>
			{user ? (
				<table>
					<thead>
						<tr>
							<th>Field</th>
							<th>Value</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>Pseudo:</td>
							<td>{user.pseudo}</td>
						</tr>
						<tr>
							<td>Email:</td>
							<td>{user.email}</td>
						</tr>
						<tr>
							<td>Name:</td>
							<td>{user.first_name}</td>
						</tr>
						<tr>
							<td>LastName:</td>
							<td>{user.lastName}</td>
						</tr>
						<tr>
							<td>Age:</td>
							<td>
								{user.birth_date?.toLocaleDateString() ??
									"No data"}
							</td>
						</tr>
						<tr>
							<td>Localisation:</td>
							<td>{user.localisation}</td>
						</tr>
						<tr>
							<td>Gender:</td>
							<td>{user.gender}</td>
						</tr>
						<tr>
							<td>Experience:</td>
							<td>{user.experience}</td>
						</tr>
						<tr>
							<td>Available:</td>
							<td>{user.available ? "Yes" : "No"}</td>
						</tr>
						<tr>
							<td>Mobile:</td>
							<td>{user.mobile}</td>
						</tr>
						<tr>
							<td>Allow Emails:</td>
							<td>{user.allowEmails ? "Yes" : "No"}</td>
						</tr>
						<tr>
							<td>Account Creation:</td>
							<td>{user.created?.toLocaleDateString()}</td>
						</tr>
					</tbody>
				</table>
			) : (
				<div>User not found :(</div>
			)}
			<h2 className="text-2xl font-bold">My Posts</h2>
			{userPosts.length > 0 ? (
				<div className="grid grid-cols-1 sm:grid-cols-2 gap-5 w-full px-10">
					{await Promise.all(
						userPosts.map(async (post) => {
							return (
								<div
									key={post._id}
									className="flex max-w-xl overflow-hidden rounded-xl border border-slate-200 bg-white"
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
			{userProjects.length > 0 ? (
				<div className="grid grid-cols-1 sm:grid-cols-2 gap-5 w-full px-10">
					{userProjects.map((project) => (
						<ProjectCard key={project._id} project={project} />
					))}
				</div>
			) : (
				<div>No projects found</div>
			)}
			<h2 className="text-2xl font-bold">
				Projects I am Participating In
			</h2>
			{participatingProjects.length > 0 ? (
				<div className="grid grid-cols-1 sm:grid-cols-2 gap-5 w-full px-10">
					{await Promise.all(
						participatingProjects.map(async (project: Project) => {
							const author = await getUser(project.author);
							return (
								<div
									key={project._id.toString()}
									className="flex max-w-xl overflow-hidden rounded-xl border border-slate-200 bg-white"
								>
									<div className="wrapper py-7">
										<div className="header px-10 mb-4">
											<div>
												<Link
													href={`/${project.author}/${project._id}`}
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
													{author
														? author.pseudo
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
