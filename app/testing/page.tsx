import { Metadata } from "next";
import { Contact } from "@/components/contact";

export const metadata: Metadata = {
	title: "Test zone",
};

export default async function Dashboard() {
	return (
		<div>
			<Contact />
		</div>
	);
}
