import { Metadata } from "next";
import { RandomComponent } from "@/ui/random";

export const metadata: Metadata = {
	title: "Test zone",
};

export default async function Dashboard() {
	return (
		<div>
			<RandomComponent />
		</div>
	);
}
