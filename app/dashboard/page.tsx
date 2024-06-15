
import { Metadata } from "next";
import { DashboardHeader } from "@/components/Dashboard/dashboardHeader";
import Tonnage from "@/components/Dashboard/tonnage";
export const metadata: Metadata = {
    title: "Dashboard",
};

export default async function Dashboard() {
    return (
        <div className="">
            <DashboardHeader />
        </div>
    );
}
