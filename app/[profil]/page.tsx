import { auth, signOut } from "@/app/auth";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getUser, getUserPosts, getProjects, getParticipantsProjects } from "@/lib/actions";

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
    const session = await auth();
    const { profil } = params;
    const decodeEmail = decodeURIComponent(profil);
    const user = await getUser(decodeEmail);

    const userPosts = await getUserPosts(decodeEmail);
    const userProjects = await getProjects(decodeEmail);
    const participatingProjects = await getParticipantsProjects(decodeEmail);

    return (
        <div className="flex h-screen">
            <div className="w-screen flex flex-col space-y-5 justify-center items-center text-black">
                <div>Search other profils from the database to try</div>
                <Link href="/sanchezlori@example.com" className="text-textblue">
                    {" "}
					for example sanchezlori@example.com
                </Link>
                <div>
                    Note that you have to be logged in to access this page and
                    any profil page
                </div>
                <h1 className="text-3xl font-bold">Profil of {decodeEmail}</h1>
                {user ? (
                    <>
                        <div>Pseudo: {user.pseudo}</div>
                        <div>Name: {user.first_name}</div>
                    	<div>
							Age:{" "}
							{user.birth_date?.toLocaleString() ?? "no data"}
						</div>
						<div>Localisation: {user.localisation}</div>
                        <div>Sexe: {user.gender}</div>
                        <div>Experience: {user.experience}</div>
                    </>
                ) : (
                    <div>User not found :(</div>
                )}
                <h2 className="text-2xl font-bold">My Posts</h2>
                {userPosts.length > 0 ? (
                    <div>
                        {userPosts.map(post => (
                            <div key={post._id}>
                                <div>{post.content} (in project {post.project})</div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div>No posts found</div>
                )}
                <h2 className="text-2xl font-bold">My Projects</h2>
                {userProjects.length > 0 ? (
                    <div>
                        {userProjects.map(project => (
                            <div key={project._id}>
                                <div>{project.title} - {project.description}</div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div>No projects found</div>
                )}
                <h2 className="text-2xl font-bold">Projects I'm Participating In</h2>
                {participatingProjects.length > 0 ? (
                    <div>
                        {participatingProjects.map(project => (
                            <div key={project._id}>
                                <div>{project.title} - {project.description}</div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div>No participating projects found</div>
                )}
                <div className="text-2xl font-bold">
                    You are logged in as {session?.user?.email}
                </div>
                <Link 
					href={`/${session?.user?.email}`} 
					className="text-textblue">
                    Back to my profile
                </Link>
                <SignOut />
            </div>
        </div>
    );
}
