"use client";

import React from "react";
import { useInView } from "react-intersection-observer";
import { cn } from "@/lib/utils";

/* 
LIST OF TODOs:
1. Modify the fetchNewData function to actually fetch data from an API
2. Change the mapping to display card components

General task: change types to match the data you are fetching (create interface)
*/

interface InfiniteScrollProps extends React.HTMLAttributes<HTMLDivElement> {}

export const InfiniteScroll = ({ className }: InfiniteScrollProps) => {
	const [data, setData] = React.useState<Object[]>([]);

	// TODO n°1
	const fetchNewData = () => {
		return new Promise((resolve) => {
			setTimeout(() => {
				resolve(Array.from({ length: 10 }, () => "z"));
			}, 1000);
		});
	};

	const [ref, inView] = useInView({
		threshold: 0,
	});

	React.useEffect(() => {
		if (inView) {
			fetchNewData().then((newData: any) => {
				setData((prevData) => [...prevData, ...newData]);
			});
		}
	}, [inView]);

	return (
		<div
			className={cn("flex flex-col items-center", className)}
			style={{ height: "100%", width: "60vw", overflowY: "scroll" }}
		>
			<ul>
				{/* TODO n°2*/}
				{data.map((item: any, index: any) => (
					<div key={index}>
						<div className="max-w-lg mx-auto rounded-lg  p-5 border-2 border-white">
							<h2 className="text-center text-2xl font-semibold mt-3">
								John Doe
							</h2>
							<p className="text-center text-gray-600 mt-1">
								Software Engineer
							</p>
							<div className="mt-5">
								<h3 className="text-xl font-semibold">Bio</h3>
								<p className="text-gray-600 mt-2">
									John is a software engineer with over 10
									years of experience in developing web and
									mobile applications. He is skilled in
									JavaScript, React, and Node.js.
								</p>
							</div>
						</div>
					</div>
				))}
				<div ref={ref}>Loading...</div>
			</ul>
		</div>
	);
};
