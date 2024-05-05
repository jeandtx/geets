import { Metadata } from "next";
import { CardDemo } from "@/components/card";

export const metadata: Metadata = {
	title: "Test zone",
};

const jsonData = {
	Title: "Tricks of the Trade",
	Time: {
		$date: "2023-06-28T09:09:58Z",
	},
	Thème: "Magic & Illusion",
	Date: "Learn to perform magic tricks and illusions that will amaze your friends and family, from beginner to advanced levels.",
	Media: "https://images.unsplash.com/photo-1558723223-0f8c63ea0fed?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1OTQ2NjB8MHwxfHNlYXJjaHwxfHxNYWdpYyUyMCUyNiUyMElsbHVzaW9ufGVufDB8fHx8MTcxNDAzODIwOHww&ixlib=rb-4.0.3&q=80&w=1080",
	Labels: ["event", "when", "agreement"],
	Participants: 2,
};

export default async function Dashboard() {
	return (
		<div className="flex p-8 bg-gray-50">
			<CardDemo jsonData={jsonData} />
		</div>
	);
}
