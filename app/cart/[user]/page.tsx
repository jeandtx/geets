"use client";

import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { getCart, setCart } from "./cart";
import { Input } from "@/components/ui/input";

export default function Cart() {
	const [data, setData] = useState<any>([]);
	const [input, setInput] = useState("");
	useEffect(() => {
		if (!data || data.length === 0) {
			getCart().then((res) => {
				setData(res);
			});
			console.log(data);
		}
	}, [data]);
	return (
		<div>
			<h1>addOne</h1>
			{data?.map((item: any) => (
				<div key={item.id}>
					{item.id} - {item.quantity}
				</div>
			))}
			<Input value={input} onChange={(e) => setInput(e.target.value)} />
			<Button
				onClick={() => {
					getCart().then((res) => {
						res?.push({ id: input, quantity: 8888 });
						setData(res);
						setCart(res);
					});
					console.log(data);
				}}
			>
				Add one
			</Button>
		</div>
	);
}
