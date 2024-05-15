"use client"
import { User } from "@/types/tables";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/button";
import { useState } from "react";

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
        <h1 className="text-3xl font-bold">My Profile</h1>
        <Input 

          type="text"
          name="email"
          value={userEdited.email}
          onChange={(e) => setUserEdited({ ...userEdited, email: e.target.value })}
        />

      </div>
    </div>
  );
}
