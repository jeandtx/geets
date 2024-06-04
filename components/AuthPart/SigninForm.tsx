"use client";
import { useState } from "react";
import { useToast } from "../ui/use-toast";
import { Eye, EyeOff } from "lucide-react";

export function SigninForm({ action, children }: { action: any; children: React.ReactNode }) {
	const { toast } = useToast();
	const [showPassword, setShowPassword] = useState(false);

	function handleSubmit(e: any) {
		e.preventDefault();
		const formData = new FormData(e.target);
		action(formData)
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
					description: "Please check your email and password.",
				});
			});
	}

	return (
		<form
			onSubmit={handleSubmit}
			className="flex flex-col space-y-4 px-4 py-1 pb-20 sm:px-16"
		>
			<div>
				<label htmlFor="email" className="block text-xs textcolor">
					Adresse email
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
					Mot de passe
				</label>
				<div className="relative mt-1">
					<input
						id="password"
						name="password"
						type={showPassword ? "text" : "password"}
						placeholder="Ton mot de passe"
						required
						className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-inputborder focus:outline-none focus:ring-black sm:text-sm"
					/>
					<div className="absolute inset-y-0 right-0 flex items-center pr-3">
						<button
							type="button"
							onClick={() => setShowPassword((prev) => !prev)}
							className="text-gray-500 hover:text-gray-700 focus:outline-none"
						>
							{showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
						</button>
					</div>
				</div>
			</div>
			{children}
		</form>
	);
}
