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
import { Slider } from "@/components/ui/slider";

import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useSession } from "next-auth/react";

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
					{value ? format(value, "PPP") : <span>Pick a date</span>}
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

	const handleSubmit = (e: any) => {
		e.preventDefault();
		console.log("user : ", userEdited);
		updateUser(userEdited);
	};
	console.log(userSession, user.email);

	if (!userSession) {
		return (
			<div className="flex justify-center items-center h-[80vh] w-full text-2xl font-bold text-center text-gray-500">
				Loading …
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
					First name :
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
					Last name :
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
					Birth date:
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
					Gender :
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
								<SelectItem value="Male">Male</SelectItem>
								<SelectItem value="Female">Female</SelectItem>
								<SelectItem value="Rather not say">
									Rather not say
								</SelectItem>
							</SelectContent>
						</Select>
					) : (
						<div>
							<Select
								value={userEdited.gender ?? "Rather not say"}
								aria-labelledby="sexe-select"
								disabled={!onEdit}
							>
								<SelectTrigger className="w-[180px]">
									<SelectValue placeholder="Rather not say" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="Male">Male</SelectItem>
									<SelectItem value="Female">
										Female
									</SelectItem>
									<SelectItem value="Rather not say">
										Rather not say
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
					Experience :<div className="h-[20px]"></div>
					{onEdit ? (
						<>
							<Slider
								max={10}
								step={1}
								value={[parseInt(userEdited.experience ?? "0")]}
								onValueChange={(newValue) =>
									setUserEdited({
										...userEdited,
										experience: newValue[0].toString(),
									})
								}
							/>
						</>
					) : (
						<Slider
							max={10}
							step={1}
							value={[parseInt(userEdited.experience ?? "0")]}
							disabled={!onEdit}
						/>
					)}
				</div>
				<div>
					Available :<div className="h-[20px]"></div>
					{onEdit ? (
						<>
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
									I want to join other projects{" "}
								</Label>
							</div>
						</>
					) : (
						<>
							<div className="flex items-center space-x-2">
								<Switch
									id="join-projects"
									disabled={true}
									checked={userEdited.available}
								/>
								<Label htmlFor="join-projects">
									I want to join other projects{" "}
								</Label>
							</div>
						</>
					)}
				</div>
				{userSession === user.email && (
					<form
						onSubmit={handleSubmit}
						className="flex flex-col gap-2"
					>
						<Button
							variant="default"
							onClick={() => setOnEdit(!onEdit)}
						>
							{onEdit ? "Save" : "Edit"}
						</Button>
					</form>
				)}
			</div>
		</div>
	);
}
