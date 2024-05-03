import { Metadata } from "next";
import { RandomComponent } from "@/components/random";
import { Sidebar } from "@/components/sidebar";
import { CardDemo } from "@/components/card";
import { InputPost } from "@/components/inputpost";

export const metadata: Metadata = {
	title: "Test zone",
};

export default async function Dashboard() {
	return (
		<div className="flex p-8 bg-gray-50">
			{/* <Sidebar /> */}
			{/* <InputPost /> */}
			<CardDemo />
		</div>
	);
}
