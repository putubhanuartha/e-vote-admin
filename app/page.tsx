"use client";
import { Button } from "@material-tailwind/react";
import { useState } from "react";

export default function Home() {
	const [number, setNumber] = useState(0);
	return (
		<main className="flex h-screen w-screen justify-center">
			<div className="m-auto flex items-center justify-center flex-col bg-red-600">
				<h1 className="text-3xl font-medium">Hello World</h1>
				<p>{number}</p>
				<Button onClick={() => setNumber((num) => num + 1)}>Click Me !</Button>
			</div>
		</main>
	);
}
