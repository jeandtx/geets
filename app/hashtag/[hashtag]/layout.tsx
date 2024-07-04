export default function ProjectLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
	params: {
		hashtag: string;
	};
}>) {
	return <section>{children}</section>;
}
