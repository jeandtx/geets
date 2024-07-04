import { signOut } from "@/app/auth";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getUser } from "@/lib/data/user";
import { getProjects } from "@/lib/data/project";
import { getPosts } from "@/lib/data/post";
import type { Project } from "@/types/tables";
import { ProjectCard } from "@/components/project";
import PostCard from "@/components/postcard";

function SignOut() {
	return (
		<form
			action={async () => {
				"use server";
				await signOut();
			}}
		>
			<Button variant={"outline"} type="submit" className="mt-6">
				Se déconnecter
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
											Champs
										</th>
										<th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
											Valeur
										</th>
									</tr>
								</thead>
								<tbody className="bg-white divide-y divide-gray-200">
									{[
										{ label: "Pseudo", value: user.pseudo },
										{ label: "Email", value: user.email },
										{
											label: "Prénom",
											value: user.first_name,
										},
										{
											label: "Nom de famille",
											value: user.lastName,
										},
										{
											label: "Âge",
											value: user.birth_date
												? new Date().getFullYear() -
												  new Date(
														user.birth_date
												  ).getFullYear()
												: "Unknown",
										},
										{
											label: "Localisation",
											value: user.localisation,
										},
										{ label: "Genre", value: user.gender },
										{
											label: "Expériences",
											value: user.experience,
										},
										{
											label: "Dispobilité",
											value: user.available
												? "Oui"
												: "Non",
										},
										{ label: "Mobile", value: user.mobile },
										{
											label: "Autoriser les emails",
											value: user.allowEmails
												? "Oui"
												: "Non",
										},
										{
											label: "Créé le",
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
								Utilisateur non trouvé
							</div>
						)}
					</div>
					<div className="space-y-8">
						<section>
							<h2 className="text-2xl font-semibold text-gray-900">
								Postes
							</h2>
							{userPosts.length > 0 ? (
								<div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
									{userPosts.map((post) => (
										<ul
											className="space-y-4"
											key={post._id}
										>
											<PostCard
												key={post._id}
												post={post}
											/>
										</ul>
									))}
								</div>
							) : (
								<div className="mt-6 text-center text-gray-500">
									Aucun poste trouvé
								</div>
							)}
						</section>
						<section>
							<h2 className="text-2xl font-semibold text-gray-900">
								Projets auxquels {decodeEmail} participe
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
									Aucun projet trouvé
								</div>
							)}
						</section>
						<section>
							<h2 className="text-2xl font-semibold text-gray-900">
								Projets créés par {decodeEmail}
							</h2>
							{userProjects.length > 0 ? (
								<div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
									{userProjects.map((project: Project) => (
										<ProjectCard
											key={project._id.toString()}
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
					<SignOut />
				</div>
			</div>
		</div>
	);
}
