import { Metadata } from "next";
import { RandomComponent } from "@/components/random";
import { Sidebar } from "@/components/sidebar";

export const metadata: Metadata = {
	title: "Test zone",
};

export default async function Dashboard() {
	return (
		<div className="flex p-8 bg-gray-50 h-screen overflow-hidden">
			<Sidebar />
		</div>
	);
}
