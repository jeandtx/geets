import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Test zone",
};

export default async function Dashboard() {
	return (
		<div className="p-5">
			test zone
		</div>
	);
}
