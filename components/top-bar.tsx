import { Box, IconButton, Stack, Text, useDisclosure } from "@chakra-ui/react";
import { Link } from "@chakra-ui/next-js";
import React from "react";
import { dataAdmin } from "@/data/data";
import { Spin as Hamburger } from "hamburger-react";
import DrawerMenu from "./drawer-menu";
const TopBar = () => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	return (
		<>
			<Box
				height={"4rem"}
				zIndex={5}
				paddingStart={{ base: "2.5rem", lg: "18.5rem", xl: "20.5rem" }}
				paddingEnd={"2rem"}
				color={"white"}
				backgroundColor={"blue.700"}
				top={0}
				left={0}
				right={0}
				display={"flex"}
				justifyContent={"space-between"}
				alignItems={"center"}
				position={"fixed"}
			>
				<Text>
					Welcome <span className="capitalize">{dataAdmin.username} </span>!
				</Text>

				<Link
					href={"/logout"}
					display={{ base: "none", lg: "block" }}
					width={"fit-content"}
					textUnderlineOffset={"0.2rem"}
				>
					Logout
				</Link>
				<IconButton
					onClick={onOpen}
					display={{ base: "block", lg: "none" }}
					aria-label="button hamburger"
					icon={<Hamburger toggled={isOpen} />}
				/>
			</Box>
			<DrawerMenu
				isOpen={isOpen}
				onClose={onClose}
			/>
		</>
	);
};

export default TopBar;
