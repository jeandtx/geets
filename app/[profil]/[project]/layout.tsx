export default function ProjectLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
	params: {
		profil: string;
		project: string;
	};
}>) {
	return <section>{children}</section>;
}
