export default function ProfilLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
	params: {
		pseudo: string;
	};
}>) {
	return <section>{children}</section>;
}
