import { auth, signOut } from "@/app/auth";
import clientPromise from "@/lib/mongodb";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getUser } from "@/lib/actions";


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

    if (!session) {
        return (
            <div className="flex h-screen">
                <div className="flex flex-col items-center justify-center w-full h-screen">
                    <div className="text-3xl font-bold pt-24">Vous n'êtes pas connecté</div>
                    <Link href="/login" className="text-textblue">
                        Connectez-vous ici
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="flex h-screen">
            <div className="flex flex-col items-center justify-center w-full h-screen text-3xl font-bold gap-5">
                    <div>
                        Hey
                    </div>
                    <div> {session?.user?.email}
                    </div>
                    <SignOut />
                    ça arrive bientôt la team 😉
                     </div>
                                
        </div>
    );
}
