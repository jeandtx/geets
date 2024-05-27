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
	console.log("first step");
	const session = await auth();
	console.log("second step");
	const { profil } = params;
	console.log("third step");
	const decodeEmail = decodeURIComponent(profil);
	console.log("fourth step");
	const user = await getUser(decodeEmail);
	console.log("fifth step");


	return (
		<div className="flex h-screen">
			<div className="flex flex-col items-center justify-center w-full h-screen">
				<div className="text-3xl font-bold pt-24">Hey </div>
				
				
				<h1 className="text-3xl font-bold ">Profil of {decodeEmail}</h1>
				{user ? (
					<>
						<div>Nom: {user.pseudo}</div>
						<div>Nom: {user.first_name}</div>
						<div>
							Age:{" "}
							{user.birth_date?.toLocaleString() ?? "no data"}
						</div>
						<div>Localisation: {user.localisation}</div>
						<div>Sexe: {user.gender}</div>
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
