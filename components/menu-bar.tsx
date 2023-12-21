import { Heading, Box } from "@chakra-ui/react";
import React from "react";
import AccordionMenu from "./accordion-menu";

const MenuBar = () => {
	return (
		<Box
			position={"fixed"}
			left={0}
			display={{ base: "none", lg: "block" }}
			height={"100vh"}
			padding={"1.5rem"}
			width={"100vw"}
			zIndex={10}
			maxW={["12rem", "14rem", "16rem", "18rem"]}
			backgroundColor={"blue.50"}
		>
			<Heading
				fontFamily={"inherit"}
				fontWeight={"medium"}
				as={"h1"}
				size={"lg"}
			>
				E-Vote
			</Heading>
			<AccordionMenu />
		</Box>
	);
};

export default MenuBar;
