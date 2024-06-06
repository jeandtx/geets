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
            <div className="flex flex-col items-center justify-center w-full h-screen">
                <div className="text-3xl font-bold pt-24">Hey </div>
                <h1 className="text-3xl font-bold ">Profil de {decodeEmail}</h1>
                {user ? (
                    <>
                        <div>Nom: {user.pseudo}</div>
                    </>
                ) : (
                    <div>Utilisateur non trouvé :(</div>
                )}
                <div className="text-2xl font-bold ">
                    Vous êtes connecté en tant que {session?.user?.email}
                </div>

                <Link href={`/${session?.user?.email}`} className="text-textblue">
                    Retour à mon profil
                </Link>
                <SignOut />
            </div>
        </div>
    );
}
