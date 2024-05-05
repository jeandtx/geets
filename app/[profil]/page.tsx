import { auth, signOut } from "@/app/auth";
import clientPromise from "@/lib/mongodb";
import { Button } from "@/components/ui/button";

async function getUser(email: string) {
	const client = await clientPromise;
	const db = client.db("geets");
	const user = await db.collection("users").findOne({ email });
	return user;
}

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
	const user = await getUser(session?.user?.email ?? "");

	return (
		<div className="flex h-screen ">
			<div className="w-screen h-screen flex flex-col space-y-5 justify-center items-center text-black">
				<div>The pseudo of the searched profile is {profil}</div>
				<div>You are logged in as {session?.user?.email}</div>
				{user && <div>Nom: {user.name}</div>}
				{user && <div>Prénom: {user.last_name}</div>}
				{user && <div>Age: {user.age}</div>}
				{user && <div>Localisation: {user.location}</div>}
				{user && <div>Sexe: {user.sexe}</div>}
				{user && <div>Expérience: {user.experience}</div>}
				<SignOut />
			</div>
		</div>
	);
}
