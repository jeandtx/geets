import { Metadata } from "next";
import { DashboardContent } from "@/components/Dashboard/dashboardContent";

export const metadata: Metadata = {
	title: "Dashboard",
};

export default async function Dashboard() {
	return (
		<div className="p-5">
			<DashboardContent/>
		</div>
	);
}
