import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
	"inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
	{
		variants: {
			variant: {
				default:
					"border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
				secondary:
					"border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
				destructive:
					"border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
				outline: "text-foreground",
				success:
					"border-transparent bg-green-500 text-white hover:bg-green-600",
				warning:
					"border-transparent bg-yellow-500 text-black hover:bg-yellow-600",
				info: "border-transparent text-blue bg-blue-100 hover:bg-blue-300",
				custom: (color: any) => `border-transparent ${color}`,
			},
		},
		defaultVariants: {
			variant: "default",
		},
	}
);

export interface BadgeProps
	extends React.HTMLAttributes<HTMLDivElement>,
		VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
	return (
		<div className={cn(badgeVariants({ variant }), className)} {...props} />
	);
}

export { Badge, badgeVariants };

interface BadgeListProps {
	jsonData: {
		Labels: string[];
	};
}

const BadgeList = ({ jsonData }: BadgeListProps) => {
	// Define a list of colors to cycle through
	const colors = [
		"bg-red-500",
		"bg-orange-500",
		"bg-yellow-500",
		"bg-green-500",
		"bg-blue-500",
		"bg-indigo-500",
		"bg-violet-500",
	];

	return (
		<ul className="mt-2 text-sm text-gray-600 flex justify-between">
			{jsonData.Labels.map((label, index) => (
				<li key={index}>
					<Badge
						variant="custom"
						className={colors[index % colors.length]}
					>
						{label}
					</Badge>
				</li>
			))}
		</ul>
	);
};

export default BadgeList;
