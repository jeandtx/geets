"use client";
import { User } from "@/types/tables";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Button } from "@/components/ui/button";

interface UpdateProfilProps {
	className?: string;
	user: User;
}

export default function UpdateProfil({ className, user }: UpdateProfilProps) {
	const [onEdit, setOnEdit] = useState<boolean>(false);
	const [userEdited, setUserEdited] = useState<User>(user);

	return (
		<div className={cn("flex justify-center items-center", className)}>
			<div className="flex flex-col space-y-5">
				<Button variant="default" onClick={() => setOnEdit(!onEdit)}>
					{onEdit ? "Save" : "Edit"}
				</Button>
				<h1 className="text-3xl font-bold">My Profile</h1>
				<Input
					className={
						onEdit
							? "bg-green-200"
							: "bg-transparent border-none text-black text-inter  placeholder-gray-400 font-normal flex h-5 w-full border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-0 focus:shadow-none focus:border-gray-300 hover:border-gray-400 focus-visible:ring-0 focus-visible:ring-offset-0 "
					}
					readOnly={!onEdit}
					type="text"
					name="email"
					value={userEdited.email}
					onChange={(e) =>
						setUserEdited({ ...userEdited, email: e.target.value })
					}
				/>
			</div>
		</div>
	);
}
