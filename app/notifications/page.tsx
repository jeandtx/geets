import { promises as fs } from "fs";
import path from "path";
import { Metadata } from "next";
import { z } from "zod";
import { columns } from "./components/columns";
import { DataTable } from "./components/data-table";
import { notificationSchema } from "./data/schema";

export const metadata: Metadata = {
	title: "Notifications",
	description: "The list of your latest notifications.",
};

async function getNotifications() {
	const data = await fs.readFile(
		path.join(process.cwd(), "/app/notifications/data/notifications.json")
	);

	const notifications = JSON.parse(data.toString());

	return z.array(notificationSchema).parse(notifications);
}

export default async function NotificationsPage() {
	const notifications = await getNotifications();

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
