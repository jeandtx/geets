import Link from "next/link";
import { signIn } from "@/app/auth";
import { SubmitButton } from "@/components/ui/submit-button";
import { SigninForm} from "@/components/AuthPart/SigninForm";

export default function Login() {
	return (
		<div className="flex h-screen w-screen items-center justify-center mt-5">
			<div className="z-10 w-full max-w-md overflow-hidden rounded-2xl border border-gray-100 shadow-xl">
				<div className="flex flex-col space-y-1 bg-white px-4 py-6 pt-8 sm:px-16 ">
					<h3 className="text-xl font-semibold">Connexion</h3>
				</div>
				<SigninForm
					action={async (formData: FormData) => {
						"use server";
						await signIn("credentials", {
							email: formData.get("email") as string,
							password: formData.get("password") as string,
							redirectTo: "/home" as string,
						});
					}}
				>
					<SubmitButton
						style={{
							backgroundColor: "rgb(58, 93, 240)",
							color: "white",
						}}
					>
						Connexion
					</SubmitButton>
					<div className="flex flex-row justify-center space-x-4">
						{/* <div className="text-center text-sm text-plaintext">
							Forget Password?{" "}
						</div> */}
						<div className="text-center text-sm text-plaintext">
							{"Pas encore de compte ? "}
							<Link href="/register" className="text-textblue">
								Inscris-toi
							</Link>
						</div>
					</div>
				</SigninForm>
			</div>
		</div>
	);
}
