"use client";
import { User } from "@/types/tables";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { updateUser } from "@/lib/actions";

interface UpdateProfilProps {
	className?: string;
	user: User;
}

export default function UpdateProfil({ className, user }: UpdateProfilProps) {
	const [onEdit, setOnEdit] = useState<boolean>(false);
	const [userEdited, setUserEdited] = useState<User>(user);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log(userEdited);
    updateUser(userEdited);
  };

	return (
		<div className={cn("flex justify-center items-center", className)}>
			<div className="flex flex-col space-y-5">
				<h1 className="text-3xl font-bold">My Profile</h1>
				Pseudo :<Input
					className={
						onEdit
							? "bg-green-200"
							: "bg-transparent border-none text-black text-inter  placeholder-gray-400 font-normal flex h-5 w-full border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-0 focus:shadow-none focus:border-gray-300 hover:border-gray-400 focus-visible:ring-0 focus-visible:ring-offset-0 "
					}
					readOnly={!onEdit}
					type="text"
					name="pseudo"
					value={userEdited.pseudo}
					onChange={(e) =>
						setUserEdited({ ...userEdited, pseudo: e.target.value })
					}
				/>
        Email :<Input
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
        First name :<Input
					className={
						onEdit
							? "bg-green-200"
							: "bg-transparent border-none text-black text-inter  placeholder-gray-400 font-normal flex h-5 w-full border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-0 focus:shadow-none focus:border-gray-300 hover:border-gray-400 focus-visible:ring-0 focus-visible:ring-offset-0 "
					}
					readOnly={!onEdit}
					type="text"
					name="first_name"
					value={userEdited.first_name}
					onChange={(e) =>
						setUserEdited({ ...userEdited, first_name: e.target.value })
					}
				/>
        Last name :<Input
					className={
						onEdit
							? "bg-green-200"
							: "bg-transparent border-none text-black text-inter  placeholder-gray-400 font-normal flex h-5 w-full border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-0 focus:shadow-none focus:border-gray-300 hover:border-gray-400 focus-visible:ring-0 focus-visible:ring-offset-0 "
					}
					readOnly={!onEdit}
					type="text"
					name="last_name"
					value={userEdited.last_name}
					onChange={(e) =>
						setUserEdited({ ...userEdited, last_name: e.target.value })
					}
				/>
        {/* Birth date :<Input
          className={
            onEdit
              ? "bg-green-200"
              : "bg-transparent border-none text-black text-inter  placeholder-gray-400 font-normal flex h-5 w-full border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-0 focus:shadow-none focus:border-gray-300 hover:border-gray-400 focus-visible:ring-0 focus-visible:ring-offset-0 "
          }
          readOnly={!onEdit}
          type="text"
          name="birth_date"
          value={userEdited.birth_date instanceof Date ? userEdited.birth_date.toLocaleString() : userEdited.birth_date}
          onChange={(e) =>
            setUserEdited({ ...userEdited, birth_date: new Date(e.target.value) })
          }
        /> */}
        Localisation :<Input
					className={
						onEdit
							? "bg-green-200"
							: "bg-transparent border-none text-black text-inter  placeholder-gray-400 font-normal flex h-5 w-full border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-0 focus:shadow-none focus:border-gray-300 hover:border-gray-400 focus-visible:ring-0 focus-visible:ring-offset-0 "
					}
					readOnly={!onEdit}
					type="text"
					name="localisation"
					value={userEdited.localisation}
					onChange={(e) =>
						setUserEdited({ ...userEdited, localisation: e.target.value })
					}
				/>
        Gender :<Input
					className={
						onEdit
							? "bg-green-200"
							: "bg-transparent border-none text-black text-inter  placeholder-gray-400 font-normal flex h-5 w-full border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-0 focus:shadow-none focus:border-gray-300 hover:border-gray-400 focus-visible:ring-0 focus-visible:ring-offset-0 "
					}
					readOnly={!onEdit}
					type="text"
					name="gender"
					value={userEdited.gender}
					onChange={(e) =>
						setUserEdited({ ...userEdited, gender: e.target.value })
					}
				/>
        Experience :<Input
					className={
						onEdit
							? "bg-green-200"
							: "bg-transparent border-none text-black text-inter  placeholder-gray-400 font-normal flex h-5 w-full border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-0 focus:shadow-none focus:border-gray-300 hover:border-gray-400 focus-visible:ring-0 focus-visible:ring-offset-0 "
					}
					readOnly={!onEdit}
					type="text"
					name="experience"
					value={userEdited.experience}
					onChange={(e) =>
						setUserEdited({ ...userEdited, experience: e.target.value })
					}
				/>
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <Button variant="default" onClick={() => setOnEdit(!onEdit)}>
					{onEdit ? "Save" : "Edit"}
				</Button>
				</form>
			</div>
		</div>
	);
}
