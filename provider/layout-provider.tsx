"use client";
import MenuBar from "@/components/menu-bar";
import { Box } from "@chakra-ui/react";
import { Link, Text } from "@chakra-ui/react";
import React from "react";
import { dataAdmin } from "@/data/data";
const LayoutProvider = ({ children }: { children: React.ReactNode }) => {
	return (
		<main className="min-h-screen">
			<MenuBar />
			<Box paddingStart={["12rem", "14rem", "16rem", "18rem"]}>
				<Box
					padding={"1.5rem"}
					color={"white"}
					backgroundColor={"blue.700"}
					display={"flex"}
					justifyContent={"space-between"}
					alignItems={"center"}
				>
					<Text>
						Welcome <span className="capitalize">{dataAdmin.username} </span>!
					</Text>
					<Link
						href={"/logout"}
						display={"block"}
						width={"fit-content"}
						textUnderlineOffset={"0.2rem"}
					>
						Logout
					</Link>
				</Box>
				<Box padding={"1.5rem"}>{children}</Box>
			</Box>
		</main>
	);
};

export default LayoutProvider;
