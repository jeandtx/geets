import Link from "next/link";
import { redirect } from "next/navigation";
import { createUser, getUser } from "@/app/db";
import { SubmitButton } from "@/components/ui/submit-button";
import { SignupForm } from "@/components/SignupForm";
export default function Login() {
	async function register(formData: FormData) {
		"use server";
		let email = formData.get("email") as string;
		let password = formData.get("password") as string;
		console.log(email)
		console.log(password)
		let user = await getUser(email);
		console.log(user)
		let name = formData.get("name") as string;

		if (user && user.length > 0) {
			console.log("User already exists");
			return "User already exists"; // TODO: Handle errors with useFormStatus
		} else {
			console.log("Creating user");
			await createUser(email, password,name);
			redirect("/login");
		}
	}

	return (
		<div className="flex h-screen w-screen items-center justify-center bg-gray-50">
			<div className="z-10 w-full max-w-md overflow-hidden rounded-2xl border border-gray-100 shadow-xl">
				<div className="flex flex-col items-center justify-center space-y-3 border-b border-gray-200 bg-white px-4 py-6 pt-8 text-center sm:px-16">
					<h3 className="text-xl font-semibold">S'inscrire</h3>
					<div className="text-sm text-gray-500">
						Créer un compte pour accéder à l'application
					</div>
				</div>
				<SignupForm action={register}>
					<SubmitButton style={{
							backgroundColor: "rgb(58, 93, 240)",
							color: "white",
						}} >S'inscrire</SubmitButton>
					<div className="text-center text-sm text-gray-600">
						{"Déjà un compte ? "}
						<Link
							href="/login"
							className="font-semibold text-gray-800"
						>
							Se connecter
						</Link>
						{""}
					</div>
				</SignupForm>
			</div>
		</div>
	);
}
