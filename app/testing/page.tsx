import { Metadata } from "next";
import { InputPost } from "@/components/inputpost";

export const metadata: Metadata = {
	title: "Test zone",
};

export default async function Dashboard() {
	return (
		<div>
			<InputPost />
		</div>
	);
}
