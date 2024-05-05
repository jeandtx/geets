import { Metadata } from "next";
import { CardDemo } from "@/components/card";

export const metadata: Metadata = {
	title: "Test zone",
};

export default async function Dashboard() {
	return (
		<div className="flex p-8 bg-gray-50">
			<CardDemo />
		</div>
	);
}
