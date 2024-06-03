"use client";
import { useToast } from "./ui/use-toast";

export function Form({
	action,
	children,
}: Readonly<{
	action: any;
	children: React.ReactNode;
}>) {
	const { toast } = useToast();

	function handleSubmit(e: any) {
		action(e)
			.then(() => {
				toast({
					title: "Success!",
					description: "Your form has been submitted.",
				});
			})
			.catch(() => {
				toast({
					variant: "destructive",
					title: "Uh oh! Something went wrong.",
					description: "Title, hook and themes are required.",
				});
			});
	}

	return (
		<form
			action={handleSubmit}
			className="flex flex-col space-y-4 px-4 py-1 pb-20 sm:px-16"
		>
			<div>
				<label htmlFor="email" className="block text-xs textcolor">
					Email Address
				</label>
				<input
					id="email"
					name="email"
					type="email"
					placeholder="user@acme.com"
					autoComplete="email"
					required
					className="mt-1 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-inputborder focus:outline-none focus:ring-black sm:text-sm"
				/>
			</div>
			<div>
				<label htmlFor="password" className="block text-xs textcolor">
					Your Password
				</label>
				<input
					id="password"
					name="password"
					type="password"
					required
					className="mt-1 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-inputborder focus:outline-none focus:ring-black sm:text-sm"
				/>
			</div>
			{children}
		</form>
	);
}
