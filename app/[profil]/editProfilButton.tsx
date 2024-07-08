"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useUserInfo } from "../context/UserInfoContext";

interface EditProfilButtonProps {
	className?: string;
	user: string;
}

export default function EditProfilButton({
	className,
	user,
}: EditProfilButtonProps) {
	const { userInfo } = useUserInfo();
	if (userInfo === undefined) return null;
	if (userInfo?.email !== user) return null;
	else {
		return (
			<Link href={`/${userInfo.email}/edit`}>
				<Button variant="link">Editer mon profil</Button>
			</Link>
		);
	}
}
