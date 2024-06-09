import React from "react";

// Importing necessary components
import { Button } from "@/components/ui/button";

export default function NotificationsPage() {
	// Sample notifications data, you can adjust this according to your real data structure
	const notifications = [
		{
			id: 1,
			message: "Payment received for $316",
			date: "2023-06-01",
			status: "success",
		},
		{
			id: 2,
			message: "Payment failed for $242",
			date: "2023-06-02",
			status: "failed",
		},
		{
			id: 3,
			message: "Payment processing for $837",
			date: "2023-06-03",
			status: "processing",
		},
	];

	return (
		<div className="min-h-screen bg-gray-100 p-8">
			<h1 className="text-xl font-bold text-gray-900 mb-4">
				Notifications
			</h1>
			<div className="bg-white shadow overflow-hidden sm:rounded-lg">
				<ul className="divide-y divide-gray-200">
					{notifications.map((notification) => (
						<li key={notification.id} className="px-6 py-4">
							<div className="flex items-center justify-between">
								<div className="text-sm font-medium text-gray-900">
									{notification.message}
								</div>
								<div
									className={`badge ${
										notification.status === "success"
											? "bg-green-100 text-green-800"
											: notification.status === "failed"
											? "bg-red-100 text-red-800"
											: "bg-yellow-100 text-yellow-800"
									}`}
								>
									{notification.status}
								</div>
							</div>
							<div className="text-sm text-gray-500">
								{notification.date}
							</div>
						</li>
					))}
				</ul>
			</div>
			<div className="mt-6">
				<Button
					variant="default"
					className="bg-blue-500 hover:bg-blue-700 text-white"
				>
					View All Notifications{" "}
				</Button>
			</div>
		</div>
	);
}
