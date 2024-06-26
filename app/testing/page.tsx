"use client";

export default function TestingPage({ data }: any) {
	console.log(data);
	return (
		<div className="p-2 ">
			<div className="p-4 rounded-2xl bg-white">testing shits</div>
			<br />
			<div className="p-4 rounded-2xl bg-white">
				{data && (
					<div>
						<h1>data</h1>
						{JSON.stringify(data)}
					</div>
				)}
			</div>
		</div>
	);
}
