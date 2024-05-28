import { auth, signOut } from "@/app/auth";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getUser, getUserPosts, getProjects, getParticipantsProjects, getProject, getUserById } from "@/lib/actions";

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
        <div className="flex flex-col items-center w-full space-y-5 text-black">
            <div>Search other profiles from the database to try</div>
            <Link href="/sanchezlori@example.com" className="text-textblue">
                {" "}
                for example sanchezlori@example.com
            </Link>
            <div>
                Note that you have to be logged in to access this page and any profile page
            </div>
            <h1 className="text-3xl font-bold">Profile of {decodeEmail}</h1>
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
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 w-full px-10">
                    {await Promise.all(userPosts.map(async post => {
                        try {
                            const project = await getProject(post.project);
                            return (
                                <div key={post._id} className='flex max-w-xl overflow-hidden rounded-xl border border-slate-200 bg-white'>
                                    <div className='wrapper py-7'>
                                        <div className='header px-10 mb-4'>
                                            <div>
                                                <p className='text-sm text-gray-600'>
                                                    {project?.title ? project.title : 'Nom de projet'}
                                                </p>
                                            </div>
                                        </div>
                                        <div className='body px-10 space-y-5'>
                                            <p className='text-gray-900 mb-0'>
                                                {post.content}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            );
                        } catch (error) {
                            console.error("Error fetching project:", error);
                            return (
                                <div key={post._id} className='flex max-w-xl overflow-hidden rounded-xl border border-slate-200 bg-white'>
                                    <div className='wrapper py-7'>
                                        <div className='body px-10 space-y-5'>
                                            <p className='text-gray-900 mb-0'>
                                                {post.content} (in project {post.project})
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            );
                        }
                    }))}
                </div>
            ) : (
                <div>No posts found</div>
            )}
            <h2 className="text-2xl font-bold">My Projects</h2>
            {userProjects.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 w-full px-10">
                    {userProjects.map(project => (
                        <div key={project._id} className='flex max-w-xl overflow-hidden rounded-xl border border-slate-200 bg-white'>
                            <div className='wrapper py-7'>
                                <div className='header px-10 mb-4'>
                                    <div>
                                        <p className='text-lg text-gray-900 font-bold'>{project.title}</p>
                                        <p className='text-sm text-gray-600'>{project.description}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div>No projects found</div>
            )}
            <h2 className="text-2xl font-bold">Projects I'm Participating In</h2>
            {participatingProjects.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 w-full px-10">
                    {await Promise.all(participatingProjects.map(async project => {
                        const author = await getUserById(project.author);
                        return (
                            <div key={project._id} className='flex max-w-xl overflow-hidden rounded-xl border border-slate-200 bg-white'>
                                <div className='wrapper py-7'>
                                    <div className='header px-10 mb-4'>
                                        <div>
                                            <p className='text-lg text-gray-900 font-bold'>{project.title}</p>
                                            <p className='text-sm text-gray-600'>{project.description}</p>
                                            <p className='text-sm text-gray-600'>Author: {author ? author.pseudo : 'Unknown'}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    }))}
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
    );
}
