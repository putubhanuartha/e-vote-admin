"use client"
import SecurityProvider from "@/provider/security-provider";
import { Box } from "@chakra-ui/react";
import React from "react";

const LayoutCreateAdministrative = ({
	children,
}: {
	children: React.ReactNode;
}) => {
	return (
		<SecurityProvider>
			<Box
				backgroundColor={["gray.100"]}
				minH={"100vh"}
				display={"flex"}
				alignItems={"center"}
				justifyContent={"center"}
			>
				{children}
			</Box>
		</SecurityProvider>
	);
};

export default LayoutCreateAdministrative;
