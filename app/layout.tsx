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
  description: "L'application BodyScan pour surveiller votre santé.",
  icons: {
    icon: "/icons/icon-192x192.png",
    apple: "/icons/icon-980x980.png", // Use the larger icon for Apple devices
  },
  manifest: "/manifest.json",
};

export const viewport = {
  themeColor: "#8936FF",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#8936FF" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="BodyScan" />
        <link rel="icon" href="/favicon.png" type="image/x-icon" />
        <link rel="apple-touch-icon" sizes="180x180" href="@/public/icons/icon-980x980.png" />
        <link rel="apple-touch-icon" sizes="192x192" href="/icons/icon-980x980.png" />
        <link rel="apple-touch-icon" sizes="512x512" href="/icons/icon-980x980.png" />
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
