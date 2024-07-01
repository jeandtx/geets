import { Metadata } from "next";
import { columns } from "./components/columns";
import { DataTable } from "./components/data-table";
import { getInteractions } from "@/lib/data/interactions";
import { auth } from "../auth";

export const metadata: Metadata = {
	title: "Notifications",
	description: "The list of your latest notifications.",
};

export default async function NotificationsPage() {
	const session = await auth();
	const email = session?.user?.email;
	const notifications = await getInteractions({
		to: email,
	});

	return (
		<div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
			<div className="flex items-center justify-between space-y-2">
				<div>
					<h2 className="text-2xl font-bold tracking-tight">
						Notifications
					</h2>
					<p className="text-muted-foreground">
						Here&apos;s a list of your latest notifications.
					</p>
				</div>
			</div>
			<DataTable data={notifications} columns={columns} />
		</div>
	);
}
