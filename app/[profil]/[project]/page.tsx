import { getUser, getProject, getPostsByProjectId } from "@/lib/actions";
import { Post, Project } from "@/types/tables";

export default async function ProjectPage({
	params,
}: Readonly<{
	params: { profil: string; project: string };
}>) {
	const { profil } = params;
	const decodeEmail = decodeURIComponent(profil);
	const user = await getUser(decodeEmail);

	const projectId = params.project;
	const project: Project | null = await getProject(projectId);

	let posts: Post[] = [];
	posts = await getPostsByProjectId(projectId);

	return (
		<div className="">
			<div>
				Watching project {params.project} from {user.pseudo}
				<div>
					{project ? (
						<>
							<div className="flex flex-col items-center justify-center">
								<div>Title: {project.title}</div>
								<div>Description: {project.description}</div>
								<div>Participants: {project.participants}</div>
								<div>Themes: {project.themes?.join(", ")}</div>
							</div>
							<div>
								<h3>Posts:</h3>
								<div className="flex flex-wrap justify-center m-0 p-0 list-none">
									{posts.length > 0 ? (
										posts.map((post) => (
											<div
												key={post._id}
												className="w-[300px] bg-black-400 rounded-lg shadow-md m-2 p-2 text-center"
											>
												<div>Title: {post.title}</div>
												<div>
													Content: {post.content}
												</div>
												<div>
													Time:{" "}
													{post.time.toLocaleString()}
												</div>
												<div>Author: {post.author}</div>
												{post.media && (
													<div>
														Media:{" "}
														<img
															src={post.media}
															alt="post media"
														/>
													</div>
												)}
											</div>
										))
									) : (
										<div>
											No posts found for this project.
										</div>
									)}
								</div>
							</div>
						</>
					) : (
						<div>Project not found :(</div>
					)}
				</div>
			</div>
		</div>
	);
}
