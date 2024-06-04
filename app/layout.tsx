import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import SessionWrapper from "./sessionwrapper";
import { Sidebar } from "@/components/sidebar";
import { WorkoutProvider } from "./context/WorkoutContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "BodyScan",
	description: "Generated by create next app",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<head>
				<link rel="icon" href="/favicon.png" type="image/x-icon" />
			</head>
			<body className={inter.className}>
				<div className="flex w-full h-screen overflow-hidden">
					<SessionWrapper>
						<WorkoutProvider>
						<Sidebar className="w-1/5 bg-gray-200" />
						<div className="lg:w-4/5 w-full">{children}</div>
						</WorkoutProvider>
					</SessionWrapper>
				</div>
				<Toaster />
			</body>
		</html>
	);
}
