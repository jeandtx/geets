const links = [
	{ name: "Open roles", href: "#" },
	{ name: "Internship program", href: "#" },
	{ name: "Our values", href: "#" },
	{ name: "Meet our leadership", href: "#" },
];
const stats = [
	{ name: "Offices worldwide", value: "12" },
	{ name: "Full-time colleagues", value: "300+" },
	{ name: "Hours per week", value: "40" },
	{ name: "Paid time off", value: "Unlimited" },
];

const TestingLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<div className="bg-gray-500 flex flex-col items-center justify-center min-h-screen">
			<h1>You are in the testing zone</h1>
			<div className="bg-orange-300 p-4 rounded-lg shadow-lg">
				{children}
			</div>
		</div>
	);
};

export default TestingLayout;
