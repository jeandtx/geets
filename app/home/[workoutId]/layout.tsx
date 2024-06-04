export default function WorkoutLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
    params: {
        workout: string;
    };
}>) {
    return <section>{children}</section>;
}