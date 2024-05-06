import { Metadata } from "next";
import { InputPostInterface } from "@/components/input-post-interface";


export default async function Dashboard() {
	return (
		<div className="p-2 ">
			<InputPostInterface/>
		</div>
	);
}
