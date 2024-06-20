import clientPromise from "@/lib/mongodb";
import React from "react";

export default async function NotificationsPageLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const client = await clientPromise;
	const db = client.db("geets");
	const collection = await db.collection("interactions");

	const changeStream = collection.watch();
	changeStream.on("change", (change) => {
		console.log(change);
	});
	return <div>{children}</div>;
}
