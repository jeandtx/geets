"use client";
import UserSearchComponent from "@/components/userSearchBar";

export default function TestingPage({ data }: any) {
	console.log(data);
	return (
		<div className="p-2 ">
			<UserSearchComponent/>
			{/* <div className="p-4 rounded-2xl bg-white">testing shits</div>
			<br />
			<div className="p-4 rounded-2xl bg-white">
				{data && (
					<div>
						<h1>data</h1>
						{JSON.stringify(data)}
					</div>
				)}
			</div> */}
		</div>
	);
}
