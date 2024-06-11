import Link from "next/link";
import { Form } from "@/components/form";
import { redirect } from "next/navigation";
import { SubmitButton } from "@/components/ui/submit-button";
import { getUser } from "@/app/db";
import { updateUser } from "@/lib/data/user";
import { User } from "@/types/tables"
import { useSession } from "next-auth/react";
import { auth } from "../auth";

export default function AdditionalInfo() {
    async function saveAdditionalInfo(formData: FormData) {
        
        "use server";
        console.log("Saving additional information");
     
        const fields = {
            first_name: formData.get("firstName") as string,
            last_name: formData.get("lastName") as string,
            phoneNumber: formData.get("phoneNumber") as string,
            pseudo: formData.get("pseudo") as string,
            birthday: formData.get("birthday") as string,
            age: parseInt(formData.get("age") as string),
            location: formData.get("location") as string,
            gender: formData.get("gender") as string,
            experience: parseInt(formData.get("experience") as string), // Convert to string before parsing
            available: formData.get("available") === "on",
            mobile: formData.get("mobile") as string,
            allowEmails: formData.get("allowEmails") === "on",
        };

        
        
        console.log(fields);
        const session = await auth();
        const userEmail = session?.user?.email;
        console.log("this is session : \n",session, "\n this is userEmail : \n", userEmail);
        // call this function :
        // export async function updateUser(email: string, user: User) {
        //     const client = await clientPromise
        //     const db = client.db('geets')
        //     const updatedUser = await db.collection('users').updateOne({
        //         email
        //     }, {
        //         $set: user
        //     })
        //     console.log('updatedUser', updatedUser)
        //     return 
        // }
        
        await updateUser(userEmail ?? "", fields as unknown as User);

        redirect("/"); // Redirect after successful update
        
        
    }

    return (
        <div className="flex h-full w-full items-center justify-center bg-gray-50">
            <div className="z-10 w-full max-w-md overflow-hidden rounded-2xl border border-gray-100 shadow-xl">
                <div className="flex flex-col items-center justify-center space-y-3 border-b border-gray-200 bg-white px-4 py-6 pt-8 text-center sm:px-16">
                    <h3 className="text-xl font-semibold">Additional Information</h3>
                    <div className="text-sm text-gray-500">
                        Please provide additional information to complete your profile
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