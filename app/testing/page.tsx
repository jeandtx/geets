import { Metadata } from "next";
import { InputPost } from "@/components/inputpost";
import { UpperBar } from "@/components/upper-bar";
import { Sidebar } from "@/components/sidebar";

export const metadata: Metadata = {
	title: "Test zone",
};

export default async function Dashboard() {
	return (
		<div className="p-5">
			<InputPost />
			<div className="inline-flex">
				<Sidebar className="w-1/5 bg-gray-200" />
				<UpperBar className="w-3/5 h-20" />
				<div className="bg-red-500 w-1/5">aaa</div>
			</div>
		</div>
	);
}
