import { signOut } from "@/app/auth";
import { Button } from "@/components/ui/button";
import { getUser } from "@/lib/data/user";
import UpdateProfil from "./updateprofil";
import Link from "next/link";

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

export default async function EditProfilPage({
	params,
}: Readonly<{
	params: { profil: string };
}>) {
	const { profil } = params;
	const decodeEmail = decodeURIComponent(profil);
	const user = await getUser(decodeEmail);

	return (
		<div className="">
			<h1 className="text-3xl font-bold">{user?.email}</h1>
			<Link href={`/${decodeEmail}`}>
				<Button variant={"default"}>Back To My Profile</Button>
			</Link>
			{user ? <UpdateProfil user={user} /> : <div>User not found 😔</div>}

			<SignOut />
		</div>
	);
}
