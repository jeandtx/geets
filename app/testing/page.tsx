import { Metadata } from "next";
import { InputPost } from "@/components/inputpost";

export const metadata: Metadata = {
	title: "Test zone",
};

export default async function Dashboard() {
	return (
		<div className="p-5 ">
			<div className="border-2 p-5 rounded-3xl border-black">
				<InputPost />
			</div>
		</div>
	);
}
