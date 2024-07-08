"use client";
import React from "react";
import UpdateProfil from "./updateprofil";
import { useUserInfo } from "@/app/context/UserInfoContext";

export default function UpdateProfilePage() {
	const { userInfo } = useUserInfo();

	if (!userInfo) {
		return (
			<div className="flex justify-center items-center h-[80vh] w-full text-2xl font-bold text-center text-gray-500">
				Loading …
			</div>
		);
	}
	if (userInfo) {
		return (
			<div>
				<h1>UpdateProfilePage</h1>
				<UpdateProfil user={userInfo} />
			</div>
		);
	}
}
