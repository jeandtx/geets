export default function ProjectSettingsLayout({
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
