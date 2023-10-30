"use client";
import MenuBar from "@/components/menu-bar";
import { Box } from "@chakra-ui/react";
import { Link, Text } from "@chakra-ui/react";
import React from "react";
import { dataAdmin } from "@/data/data";
const LayoutProvider = ({ children }: { children: React.ReactNode }) => {
	return (
		<Box h={'100vh'}>
			<MenuBar />
			<Box paddingStart={["12rem", "14rem", "16rem", "18rem"]} display={'flex'} flexDirection={'column'} h={'100%'}>
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
				<Box  flex={'1'} padding={"1.5rem"}>{children}</Box>
			</Box>
		</Box>
	);
};

export default LayoutProvider;
