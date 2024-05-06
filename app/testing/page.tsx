import { Metadata } from "next";
import { InputPost } from "@/components/inputpost";
import { UpperBar } from "@/components/upper-bar";

export const metadata: Metadata = {
	title: "Test zone",
};

export default async function Dashboard() {
	return (
		<div className="p-5">
			<InputPost />
			<div className="">
				<UpperBar className="w-3/5 h-20" />
			</div>
		</div>
	);
}
