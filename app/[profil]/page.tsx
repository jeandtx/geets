import { signOut } from "@/app/auth";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getUser } from "@/lib/data/user";
import { getProjects } from "@/lib/data/project";
import { getPosts } from "@/lib/data/post";
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
			<Button variant={"outline"} type="submit" className="mt-6">
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
		<div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
			<div className="max-w-4xl mx-auto">
				<div className="bg-white shadow-lg rounded-lg p-8 space-y-6">
					<div className="flex flex-col items-center">
						<h1 className="text-3xl font-extrabold text-gray-900">
							{user?.email}
						</h1>
						{user ? (
							<table className="min-w-full divide-y divide-gray-200 mt-6">
								<thead>
									<tr>
										<th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
											Field
										</th>
										<th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
											Value
										</th>
									</tr>
								</thead>
								<tbody className="bg-white divide-y divide-gray-200">
									{[
										{ label: "Pseudo", value: user.pseudo },
										{ label: "Email", value: user.email },
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
										{ label: "Gender", value: user.gender },
										{
											label: "Experience",
											value: user.experience,
										},
										{
											label: "Available",
											value: user.available
												? "Yes"
												: "No",
										},
										{ label: "Mobile", value: user.mobile },
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
						) : (
							<div className="mt-6 text-center text-gray-500">
								User not found :(
							</div>
						)}
					</div>
					<div className="space-y-8">
						<section>
							<h2 className="text-2xl font-semibold text-gray-900">
								My Posts
							</h2>
							{userPosts.length > 0 ? (
								<div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
									{userPosts.map((post) => (
										<div
											key={post._id}
											className="bg-white rounded-lg shadow-lg overflow-hidden"
										>
											<div className="p-6">
												<div className="text-sm text-gray-600 mb-2">
													{post.project?.title
														? post.project.title
														: "Nom de projet"}{" "}
													•{" "}
													{post.project?._id ||
														"ID de projet"}
												</div>
												<p className="text-gray-900">
													{post.content}
												</p>
											</div>
										</div>
									))}
								</div>
							) : (
								<div className="mt-6 text-center text-gray-500">
									No posts found
								</div>
							)}
						</section>
						<section>
							<h2 className="text-2xl font-semibold text-gray-900">
								Projects {decodeEmail} is participating in
							</h2>
							{participatingProjects.length > 0 ? (
								<div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
									{participatingProjects.map(
										async (project: Project) => {
											const author =
												project.participants?.find(
													(participant) =>
														participant.role ===
														"author"
												);
											const authorInfo = await getUser(
												author?.name ?? ""
											);
											return (
												<div
													key={project._id.toString()}
													className="bg-white rounded-lg shadow-lg overflow-hidden"
												>
													<div className="p-6">
														<Link
															href={`/${author?.name}/${project._id}`}
															className="text-lg font-bold text-blue-600 hover:underline"
														>
															{project.title}
														</Link>
														<p className="text-sm text-gray-600 mt-2">
															{
																project.description
															}
														</p>
														<p className="text-sm text-gray-600 mt-2">
															Author:{" "}
															{authorInfo
																? authorInfo.email
																: "Unknown"}
														</p>
													</div>
												</div>
											);
										}
									)}
								</div>
							) : (
								<div className="mt-6 text-center text-gray-500">
									No participating projects found
								</div>
							)}
						</section>
					</div>
					<SignOut />
				</div>
			</div>
		</div>
	);
}
