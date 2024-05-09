import { auth, signOut } from "@/app/auth";
import clientPromise from "@/lib/mongodb";
import { Button } from "@/components/ui/button";
import Link from "next/link";

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
	const decodeEmail = decodeURIComponent(profil);
	const user = await getUser(decodeEmail);

	return (
		<div className="flex h-screen">
			<div className="w-screen h-screen flex flex-col space-y-5 justify-center items-center text-black">
				<div>Search other profils from the database to try</div>
				<Link href="/sanchezlori@example.com" className="text-textblue">
					{" "}
					for example sanchezlori@example.com
				</Link>
				<div>
					Note that you have to be logged in to access this page and
					any profil page
				</div>
				<h1 className="text-3xl font-bold ">Profil of {decodeEmail}</h1>
				{user ? (
					<>
						<div>Nom: {user.name}</div>
						<div>Prénom: {user.last_name}</div>
						<div>Age: {user.age}</div>
						<div>Localisation: {user.location}</div>
						<div>Sexe: {user.sexe}</div>
						<div>Expérience: {user.experience}</div>
					</>
				) : (
					<div>User not found :(</div>
				)}
				<div className="text-2xl font-bold ">
					You are logged in as {session?.user?.email}
				</div>

				<Link
					href={`/${session?.user?.email}`}
					className="text-textblue"
				>
					Back to my profile
				</Link>
				<SignOut />
			</div>
		</div>
	);
}
