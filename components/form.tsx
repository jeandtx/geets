"use client";
import { useToast } from "./ui/use-toast";
import { useState } from "react";
import { CldUploadWidget } from "next-cloudinary";
import { Textarea } from "./ui/textarea";

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
	const [imageUrl, setImageUrl] = useState<string>("");
	const [imageName, setImageName] = useState<string>("Ajouter une photo");

	function handleSubmit(e: any) {
		e.preventDefault();
		const formData = new FormData(e.target);
		if (imageUrl) {
			formData.append("media", imageUrl);
		}
		action(formData)
			.catch(() => {
				toast({
					variant: "destructive",
					title: "Uh oh! Un problème est survenu",
					description: "Un titre, un hook et un thème sont requis.",
				});
			})
			.finally(() => {
				toast({
					title: "Succès",
					description: "Votre formulaire a été soumis",
					variant: "success",
				});
			});
	}

	return (
		<form
			onSubmit={handleSubmit}
			className="flex flex-col space-y-4 px-4 py-1 pb-20 sm:px-16"
		>
			{!fillInformationForm ? (
				<div className="space-y-2">
					<div>
						<label
							htmlFor="email"
							className="block text-xs textcolor"
						>
							Adresse e-mail
						</label>
						<input
							id="email"
							name="email"
							type="email"
							placeholder="user@acme.com"
							autoComplete="email"
							required
							className="mt-1 block w-full appearance-none rounded-md custom-border px-3 py-2 placeholder-gray-400 shadow-sm focus:border-inputborder focus:outline-none focus:ring-black sm:text-sm"
						/>
					</div>
					<div>
						<label
							htmlFor="password"
							className="block text-xs textcolor"
						>
							Mot de passe
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
				<div className="space-y-2">
					<div>
						<label
							htmlFor="firstName"
							className="block text-xs textcolor"
						>
							Prénom
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
							htmlFor="lastName"
							className="block text-xs textcolor"
						>
							Nom de famille
						</label>
						<input
							id="lastName"
							name="lastName"
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
					<div>
						<label
							htmlFor="birthday"
							className="block text-xs textcolor"
						>
							Date de naissance
						</label>
						<input
							id="birthday"
							name="birthday"
							type="date"
							required
							className="mt-1 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-inputborder focus:outline-none focus:ring-black sm:text-sm"
						/>
					</div>
					<div>
						<label
							htmlFor="location"
							className="block text-xs textcolor"
						>
							Localisation
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
							htmlFor="gender"
							className="block text-xs textcolor"
						>
							Genre
						</label>
						<select
							id="gender"
							name="gender"
							required
							className="mt-1 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-inputborder focus:outline-none focus:ring-black sm:text-sm"
						>
							<option value="">
								--Veuillez choisir une option--
							</option>
							<option value="female">Femme</option>
							<option value="male">Homme</option>
							<option value="hamster">
								Je ne préfère pas le dire
							</option>
						</select>
					</div>

					<div>
						<label
							htmlFor="bio"
							className="block text-xs textcolor"
						>
							Biographie
						</label>
						<Textarea
							id="bio"
							name="bio"
							required
							className="mt-1 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-inputborder focus:outline-none focus:ring-black sm:text-sm"
						/>
					</div>
					<div>
						<label
							htmlFor="available"
							className="block text-xs textcolor"
						>
							Disponible
						</label>
						<select
							id="available"
							name="available"
							required
							className="mt-1 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-inputborder focus:outline-none focus:ring-black sm:text-sm"
						>
							<option value="">
								--Veuillez choisir une option--
							</option>
							<option value="yes">Oui</option>
							<option value="no">Non</option>
							<option value="maybe">Peut-être</option>
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
							Autoriser les e-mails
						</label>
						<select
							id="allowEmails"
							name="allowEmails"
							required
							className="mt-1 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-inputborder focus:outline-none focus:ring-black sm:text-sm"
						>
							<option value="">
								--Veuillez choisir une option--
							</option>
							<option value="yes">Oui</option>
							<option value="no">Non</option>
						</select>
					</div>
					<div>
						<label className="block text-xs textcolor">
							Photo de profil
						</label>

						<div className="flex items-center justify-center">
							<CldUploadWidget
								uploadPreset="onrkam98"
								onSuccess={(result) => {
									setImageUrl(
										(result as any).info.secure_url
									);
									setImageName(
										(result as any).info.original_filename
									); // Update the image name
								}}
							>
								{({ open }) => {
									return (
										<button
											className="w-full overflow-hidden inline-flex items-center justify-center border border-input bg-background rounded-md px-6 py-3 text-sm font-medium hover:bg-slate-50"
											style={{
												height: "40px",
												whiteSpace: "nowrap",
												textOverflow: "ellipsis",
												overflow: "hidden",
											}}
											type="button"
											onClick={() => open()}
										>
											<div className="p-1">📥</div>
											{imageName}
										</button>
									);
								}}
							</CldUploadWidget>
						</div>
					</div>
				</div>
			)}

			{children}
		</form>
	);
}
