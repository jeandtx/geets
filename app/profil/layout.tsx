export default function ProfilLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
	params: {
		profil: string;
	};
}>) {
	return <section>{children}</section>;
}
