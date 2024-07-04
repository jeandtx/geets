import { Form } from "@/components/form";
import { redirect } from "next/navigation";
import { SubmitButton } from "@/components/ui/submit-button";
import { updateUser, getUser } from "@/lib/data/user";
import { User } from "@/types/tables";
import { auth } from "../auth";

export default function AdditionalInfo() {
	async function saveAdditionalInfo(formData: FormData) {
		"use server";
		const session = await auth();
		const userEmail = session?.user?.email;

		const user = await getUser(userEmail ?? "");

        const fields: Partial<User> = {
            _id: user._id,
            first_name: formData.get('firstName') as string,
            lastName: formData.get('lastName') as string,
            mobile: formData.get('mobile') as string,
            pseudo: formData.get('pseudo') as string,
            birth_date: new Date(formData.get('birthday') as string),
            localisation: formData.get('location') as string,
            gender: formData.get('gender') as string,
            experience: formData.get('experience') as string, // Convert to string before parsing
            available: formData.get('available') === 'on',
            allowEmails: formData.get('allowEmails') === 'on',
            media: formData.get('media') as string,
        }
        await updateUser(fields)

		redirect("/");
	}

	return (
		<div className="flex h-full w-full items-center justify-center bg-gray-50">
			<div className="z-10 w-full max-w-md overflow-hidden rounded-xl custom-border shadow-xl">
				<div className="flex flex-col items-center justify-center space-y-3 custom-border bg-white px-4 py-6 pt-8 text-center sm:px-16">
					<h3 className="text-xl font-semibold">
						Informations supplémentaires
					</h3>
					<div className="text-sm text-gray-500">
						Veuillez fournir des informations supplémentaires pour
						compléter votre profil
					</div>
				</div>
				<Form action={saveAdditionalInfo} fillInformationForm={true}>
					<div className="px-4 py-6 sm:px-16 space-y-4">
						<SubmitButton>
							Enregistrer les informations
						</SubmitButton>
					</div>
				</Form>
			</div>
		</div>
	);
}
