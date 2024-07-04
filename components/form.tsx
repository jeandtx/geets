"use client";
import { useToast } from "./ui/use-toast";

export function Form({
	action,
	children,
	fillInformationForm = false,
}: Readonly<{
	action: any;
	children: React.ReactNode;
	fillInformationForm?: boolean;
}>) {
	const { toast } = useToast();

	function handleSubmit(e: any) {
		action(e)
			.catch(() => {
				toast({
					variant: "destructive",
					title: "Uh oh! Something went wrong.",
					description: "Title, hook and themes are required.",
				});
			})
			.finally(() => {
				toast({
					title: "Success!",
					description: "Your form has been submitted.",
					variant: "success",
				});
			});
	}

	return (
		<form
			action={handleSubmit}
			className="flex flex-col space-y-4 px-4 py-1 pb-20 sm:px-16"
		>
			{/* if fillInformationForm is false display the div */}
			{!fillInformationForm ? (
				<div>
					<div>
						<label
							htmlFor="email"
							className="block text-xs textcolor"
						>
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
						<label
							htmlFor="password"
							className="block text-xs textcolor"
						>
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
				</div>
			) : (
				<div>
					<div>
						<label
							htmlFor="firstName"
							className="block text-xs textcolor"
						>
							First Name
						</label>
						<input
							id="firstName"
							name="firstName"
							type="text"
							required
							className="mt-1 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-inputborder focus:outline-none focus:ring-black sm:text-sm"
						/>
					</div>
					<div>
						<label
							htmlFor="last_name"
							className="block text-xs textcolor"
						>
							Last Name
						</label>
						<input
							id="last_name"
							name="last_name"
							type="text"
							required
							className="mt-1 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-inputborder focus:outline-none focus:ring-black sm:text-sm"
						/>
					</div>
					<div>
						<label
							htmlFor="pseudo"
							className="block text-xs textcolor"
						>
							Pseudo
						</label>
						<input
							id="pseudo"
							name="pseudo"
							type="text"
							required
							className="mt-1 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-inputborder focus:outline-none focus:ring-black sm:text-sm"
						/>
					</div>
					{/* birthday div */}
					<div>
						<label
							htmlFor="birthday"
							className="block text-xs textcolor"
						>
							Birthday
						</label>
						<input
							id="birthday"
							name="birthday"
							type="date"
							required
							className="mt-1 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-inputborder focus:outline-none focus:ring-black sm:text-sm"
						/>
					</div>

					{/* <div>
						<label
							htmlFor="age"
							className="block text-xs textcolor"
						>
							Age
						</label>
						<input
							id="age"
							name="age"
							type="number"
							required
							className="mt-1 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-inputborder focus:outline-none focus:ring-black sm:text-sm"
						/>
					</div> */}
					<div>
						<label
							htmlFor="location"
							className="block text-xs textcolor"
						>
							Location
						</label>
						<input
							id="location"
							name="location"
							type="text"
							required
							className="mt-1 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-inputborder focus:outline-none focus:ring-black sm:text-sm"
						/>
					</div>
					<div>
						<label
							htmlFor="sexe"
							className="block text-xs textcolor"
						>
							sexe
						</label>
						{/* can only choose male or female */}
						<select
							id="sexe"
							name="sexe"
							required
							className="mt-1 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-inputborder focus:outline-none focus:ring-black sm:text-sm"
						>
							<option value="">
								--Please choose an option--
							</option>
							<option value="female">Female</option>
							<option value="male">Male</option>
							<option value="hamster">
								Want to be original by not saying his sexe
							</option>
						</select>
					</div>

					<div>
						<label
							htmlFor="bio"
							className="block text-xs textcolor"
						>
							bio
						</label>
						<input
							id="bio"
							name="bio"
							type="number"
							required
							className="mt-1 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-inputborder focus:outline-none focus:ring-black sm:text-sm"
						/>
					</div>
					<div>
						<label
							htmlFor="available"
							className="block text-xs textcolor"
						>
							Available
						</label>
						{/* can only choose male or female */}
						<select
							id="available"
							name="available"
							required
							className="mt-1 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-inputborder focus:outline-none focus:ring-black sm:text-sm"
						>
							<option value="">
								--Please choose an option--
							</option>
							<option value="yes">Yes</option>
							<option value="no">No</option>
							<option value="maybe">Maybe</option>
						</select>
					</div>

					<div>
						<label
							htmlFor="mobile"
							className="block text-xs textcolor"
						>
							Mobile
						</label>
						<input
							id="mobile"
							name="mobile"
							type="tel"
							required
							className="mt-1 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-inputborder focus:outline-none focus:ring-black sm:text-sm"
						/>
					</div>
					<div>
						<label
							htmlFor="allowEmails"
							className="block text-xs textcolor"
						>
							Allow Emails
						</label>
						{/* can only choose male or female */}
						<select
							id="allowEmails"
							name="allowEmails"
							required
							className="mt-1 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-inputborder focus:outline-none focus:ring-black sm:text-sm"
						>
							<option value="">
								--Please choose an option--
							</option>
							<option value="yes">Yes</option>
							<option value="no">No</option>
						</select>
					</div>
				</div>
			)}

			{children}
		</form>
	);
}
