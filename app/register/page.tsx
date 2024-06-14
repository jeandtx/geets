import Link from "next/link";
import { Form } from "@/components/form";
import { redirect } from "next/navigation";
import { createUser, getUser } from "@/app/db";
import { SubmitButton } from "@/components/ui/submit-button";
import { generateVerificationToken } from "@/lib/crypto";
import { sendEmail } from "@/lib/mailer";

export default function Login() {
    async function register(formData: FormData) {
		"use server";
		console.log("Registering user")
        let email = formData.get("email") as string;
        let password = formData.get("password") as string;
        let user = await getUser(email);
		console.log("User: ", user)

        if (user) {
			console.log("User already exists")
            return "User already exists";
        } else {
            const verificationToken = generateVerificationToken();
            const verificationTokenExpires = new Date();
            verificationTokenExpires.setHours(verificationTokenExpires.getHours() + 1); // 1 heure d'expiration

            const result = await createUser(email, password, verificationToken, verificationTokenExpires);

            await sendEmail({
				email,
				emailType: 'verify',
				userId: result.insertedId
			});

            redirect("/login");
        }
    }

    return (
        <div className="flex h-full w-full items-center justify-center bg-gray-50">
            <div className="z-10 w-full max-w-md overflow-hidden rounded-2xl border border-gray-100 shadow-xl">
                <div className="flex flex-col items-center justify-center space-y-3 border-b border-gray-200 bg-white px-4 py-6 pt-8 text-center sm:px-16">
                    <h3 className="text-xl font-semibold">Sign Up</h3>
                    <div className="text-sm text-gray-500">
                        Create an account with your email and password
                    </div>
                </div>
                <Form action={register}>
                    <SubmitButton>Sign Up</SubmitButton>
                    <div className="text-center text-sm text-gray-600">
                        {"Already have an account? "}
                        <Link
                            href="/login"
                            className="font-semibold text-gray-800"
                        >
                            Sign in
                        </Link>
                        {" instead."}
                    </div>
                </Form>
            </div>
        </div>
    );
}