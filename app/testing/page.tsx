import { Metadata } from "next";
import { InputPost } from "@/components/inputpost";
import SearchComponent from "@/components/searchBar";

export const metadata: Metadata = {
	title: "Testing page",
};

export default async function TestingPage() {
	return (
		<div className="p-2 ">
			<div className="p-4 rounded-2xl bg-white">
				<SearchComponent />
			</div>
		</div>
	);
}
