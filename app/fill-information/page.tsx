import { Form } from "@/components/form";
import { redirect } from "next/navigation";
import { SubmitButton } from "@/components/ui/submit-button";
import { updateUser, getUser } from "@/lib/data/user";
import { User } from "@/types/tables";
import { auth } from "../auth";

export default function AdditionalInfo() {
	async function saveAdditionalInfo(formData: FormData) {
		"use server";
		console.log("Saving additional information");
		const session = await auth();
		const userEmail = session?.user?.email;

		const user = await getUser(userEmail ?? "");

		const fields: Partial<User> = {
			_id: user._id,
			first_name: formData.get("firstName") as string,
			lastName: formData.get("lastName") as string,
			mobile: formData.get("mobile") as string,
			pseudo: formData.get("pseudo") as string,
			birth_date: new Date(formData.get("birthday") as string),
			// age: parseInt(formData.get("age") as string),
			localisation: formData.get("location") as string,
			gender: formData.get("gender") as string,
			experience: formData.get("experience") as string, // Convert to string before parsing
			available: formData.get("available") === "on",
			allowEmails: formData.get("allowEmails") === "on",
		};
		await updateUser(fields);

		redirect("/");
	}

	return (
		<div className="flex h-full w-full items-center justify-center bg-gray-50">
			<div className="z-10 w-full max-w-md overflow-hidden rounded-2xl border border-gray-100 shadow-xl">
				<div className="flex flex-col items-center justify-center space-y-3 border-b border-gray-200 bg-white px-4 py-6 pt-8 text-center sm:px-16">
					<h3 className="text-xl font-semibold">
						Additional Information
					</h3>
					<div className="text-sm text-gray-500">
						Please provide additional information to complete your
						profile
					</div>
				</div>
				<Form action={saveAdditionalInfo} fillInformationForm={true}>
					<div className="px-4 py-6 sm:px-16 space-y-4">
						<SubmitButton>Save and Continue</SubmitButton>
					</div>
				</Form>
			</div>
		</div>
	);
}