"use client";
import { User } from "@/types/tables";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { updateUser } from "@/lib/data/user";
import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { CldUploadWidget } from "next-cloudinary";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useSession } from "next-auth/react";
import Img from "next/image";

interface DatePickerDemoProps {
	className?: string;
	value: Date | undefined;
	onChange: (date: Date | undefined) => void;
}

export function DatePickerDemo({
	className,
	value,
	onChange,
}: DatePickerDemoProps) {
	const normalizeDate = (date: Date | undefined): Date | undefined => {
		if (!date) return undefined;
		const offset = date.getTimezoneOffset();
		const normalizedDate = new Date(date.getTime() - offset * 60 * 1000);
		return new Date(normalizedDate.toISOString().split("T")[0]);
	};

	const handleSelect = (date: Date | undefined) => {
		const normalizedDate = normalizeDate(date);
		onChange(normalizedDate);
	};

	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button
					variant={"outline"}
					className={cn(
						"w-[280px] justify-start text-left font-normal",
						!value && "text-muted-foreground",
						className
					)}
				>
					<CalendarIcon className="mr-2 h-4 w-4" />
					{value ? (
						format(value, "PPP")
					) : (
						<span>Choisissez une date</span>
					)}
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-auto p-0">
				<Calendar
					mode="single"
					selected={value}
					onSelect={handleSelect}
					initialFocus
				/>
			</PopoverContent>
		</Popover>
	);
}

interface UpdateProfilProps {
	className?: string;
	user: User;
}
export default function UpdateProfil({ className, user }: UpdateProfilProps) {
	const [onEdit, setOnEdit] = useState<boolean>(false);
	const [userEdited, setUserEdited] = useState<User>({
		...user,
	});
	const session = useSession();
	const userSession = session.data?.user?.email;
	const [imageUrl, setImageUrl] = useState<string>("");
	const [imageName, setImageName] = useState<string>("Ajouter une photo");

	const handleSubmit = (e: any) => {
		e.preventDefault();
		updateUser(userEdited);
	};

	if (!userSession) {
		return (
			<div className="flex justify-center items-center h-[80vh] w-full text-2xl font-bold text-center text-gray-500">
				Chargement…
			</div>
		);
	}

	return (
		<div className={cn("flex justify-center items-center", className)}>
			<div className="flex flex-col space-y-5">
				<div>
					Pseudo :
					<Input
						className={
							onEdit
								? "bg-green-200"
								: "bg-transparent border-none text-black font-normal flex h-5 w-full px-3 py-2 text-sm focus:outline-none focus:ring-0 focus:shadow-none focus:border-gray-300 hover:border-gray-400 focus-visible:ring-0 focus-visible:ring-offset-0 min-h-[40px]"
						}
						readOnly={!onEdit}
						type="text"
						name="pseudo"
						value={userEdited.pseudo}
						onChange={(e) =>
							setUserEdited({
								...userEdited,
								pseudo: e.target.value,
							})
						}
					/>
				</div>
				<div>
					Email :
					<Input
						className={
							onEdit
								? "bg-green-200"
								: "bg-transparent border-none text-black font-normal flex h-5 w-full px-3 py-2 text-sm focus:outline-none focus:ring-0 focus:shadow-none focus:border-gray-300 hover:border-gray-400 focus-visible:ring-0 focus-visible:ring-offset-0 min-h-[40px]"
						}
						readOnly={!onEdit}
						type="text"
						name="email"
						value={userEdited.email}
						onChange={(e) =>
							setUserEdited({
								...userEdited,
								email: e.target.value,
							})
						}
					/>
				</div>
				<div>
					Prénom :
					<Input
						className={
							onEdit
								? "bg-green-200"
								: "bg-transparent border-none text-black font-normal flex h-5 w-full px-3 py-2 text-sm focus:outline-none focus:ring-0 focus:shadow-none focus:border-gray-300 hover:border-gray-400 focus-visible:ring-0 focus-visible:ring-offset-0 min-h-[40px]"
						}
						readOnly={!onEdit}
						type="text"
						name="name"
						value={userEdited.first_name}
						onChange={(e) =>
							setUserEdited({
								...userEdited,
								first_name: e.target.value,
							})
						}
					/>
				</div>
				<div>
					Nom de famille :
					<Input
						className={
							onEdit
								? "bg-green-200"
								: "bg-transparent border-none text-black font-normal flex h-5 w-full px-3 py-2 text-sm focus:outline-none focus:ring-0 focus:shadow-none focus:border-gray-300 hover:border-gray-400 focus-visible:ring-0 focus-visible:ring-offset-0 min-h-[40px]"
						}
						readOnly={!onEdit}
						type="text"
						name="last_name"
						value={userEdited.lastName}
						onChange={(e) =>
							setUserEdited({
								...userEdited,
								lastName: e.target.value,
							})
						}
					/>
				</div>
				<div>
					Date de naissance :
					{onEdit ? (
						<DatePickerDemo
							className="bg-green-200"
							value={userEdited.birth_date}
							onChange={(date) =>
								setUserEdited({
									...userEdited,
									birth_date: date ?? new Date(),
								})
							}
						/>
					) : (
						<div>
							{userEdited.birth_date
								? format(userEdited.birth_date, "PPP")
								: ""}
						</div>
					)}
				</div>
				<div>
					Genre :
					{onEdit ? (
						<Select
							value={userEdited.gender ?? ""}
							aria-labelledby="sexe-select"
							onValueChange={(value) =>
								setUserEdited({
									...userEdited,
									gender: value ?? "Rather not say",
								})
							}
						>
							<SelectTrigger className="w-[180px]">
								<SelectValue placeholder="Sexe" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="Male">Homme</SelectItem>
								<SelectItem value="Female">Femme</SelectItem>
								<SelectItem value="Rather not say">
									Je ne préfère pas le dire
								</SelectItem>
							</SelectContent>
						</Select>
					) : (
						<div>
							<Select
								value={
									userEdited.gender ??
									"Je ne préfère pas le dire"
								}
								aria-labelledby="sexe-select"
								disabled={!onEdit}
							>
								<SelectTrigger className="w-[180px]">
									<SelectValue placeholder="Je ne préfère pas le dire" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="Male">Homme</SelectItem>
									<SelectItem value="Female">
										Femme
									</SelectItem>
									<SelectItem value="Rather not say">
										Je ne préfère pas le dire
									</SelectItem>
								</SelectContent>
							</Select>
						</div>
					)}
				</div>
				<div>
					Location :
					<Input
						className={
							onEdit
								? "bg-green-200"
								: "bg-transparent border-none text-black font-normal flex h-5 w-full px-3 py-2 text-sm focus:outline-none focus:ring-0 focus:shadow-none focus:border-gray-300 hover:border-gray-400 focus-visible:ring-0 focus-visible:ring-offset-0 min-h-[40px]"
						}
						readOnly={!onEdit}
						type="text"
						name="location"
						value={userEdited.localisation}
						onChange={(e) =>
							setUserEdited({
								...userEdited,
								localisation: e.target.value,
							})
						}
					/>
				</div>
				<div>
					Biographie :<div className="h-[20px]"></div>
					{onEdit ? (
						<textarea
							className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
							value={userEdited.bio ?? ""}
							onChange={(e) =>
								setUserEdited({
									...userEdited,
									bio: e.target.value,
								})
							}
							rows={4}
							placeholder="Enter your bio"
						/>
					) : (
						<div className="p-2 bg-gray-100 rounded-lg">
							{userEdited.bio ?? " "}
						</div>
					)}
				</div>
				<div>
					Available :<div className="h-[20px]"></div>
					{onEdit ? (
						<div className="flex items-center space-x-2">
							<Switch
								id="join-projects"
								checked={userEdited.available}
								onCheckedChange={() =>
									setUserEdited({
										...userEdited,
										available: !userEdited.available,
									})
								}
							/>
							<Label htmlFor="join-projects">
								Je veux rejoindre d&apos;autres projets{" "}
							</Label>
						</div>
					) : (
						<div className="flex items-center space-x-2">
							<Switch
								id="join-projects"
								disabled={true}
								checked={userEdited.available}
							/>
							<Label htmlFor="join-projects">
								Je veux rejoindre d&apos;autres projets{" "}
							</Label>
						</div>
					)}
				</div>
				<div>
					<label className="block text-xs textcolor">
						Photo de profil
					</label>
					<Img
						className="rounded-full"
						src={
							user.media && user.media !== ""
								? user.media
								: "https://loremflickr.com/640/480/user"
						}
						alt="PP"
						width={65}
						height={65}
						style={{ height: "5rem", width: "5rem" }}
					/>
					<div className="flex items-center justify-center">
						<CldUploadWidget
							uploadPreset="onrkam98"
							onSuccess={(result) => {
								setImageUrl((result as any).info.secure_url);
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
				{userSession === user.email && (
					<form
						onSubmit={handleSubmit}
						className="flex flex-col gap-2"
					>
						<Button
							variant="default"
							onClick={() => {
								setOnEdit(!onEdit);
							}}
						>
							{onEdit ? "Save" : "Edit"}
						</Button>
					</form>
				)}
			</div>
		</div>
	);
}
