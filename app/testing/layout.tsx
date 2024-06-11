import clientPromise from "@/lib/mongodb";
import React from "react";

export default async function TestingPageLayout({
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
		const data = change;
		return (
			<div>
				{children &&
					React.Children.map(children, (child) => {
						return React.cloneElement(child as React.ReactElement, {
							data,
						});
					})}
			</div>
		);
	});
	return <div>{children}</div>;
}
