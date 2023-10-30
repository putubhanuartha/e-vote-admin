"use client"
import Image from "next/image";
import { Link } from "@chakra-ui/next-js";
export default function Home() {
	return (
		<main className="flex min-h-screen flex-col items-center justify-between">
			<div className="m-auto">
				<h1>Hello World</h1>
				<Link
					href={"https://google.com"}
					color={"blue.400"}
					_hover={{ color: "blue.500" }}
				>
					Go to google
				</Link>
			</div>
		</main>
	);
}
