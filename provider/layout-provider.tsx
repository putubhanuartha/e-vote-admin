"use client";
import MenuBar from "@/components/menu-bar";
import { Box } from "@chakra-ui/react";
import React from "react";
import TopBar from "@/components/top-bar";
const LayoutProvider = ({ children }: { children: React.ReactNode }) => {
	return (
		<Box>
			<MenuBar />
			<TopBar />
			<Box
				paddingStart={{ base: "1rem", lg: "17rem", xl: "19rem" }}
				pt={"5.5rem"}
				display={"flex"}
				flexDirection={"column"}
				h={"100%"}
			>
				<Box
					flex={"1"}
					pb={"1rem"}
					px={"1.5rem"}
				>
					{children}
				</Box>
			</Box>
		</Box>
	);
};

export default LayoutProvider;
