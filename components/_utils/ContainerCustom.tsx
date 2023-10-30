import { Container } from "@chakra-ui/react";
import React from "react";

const ContainerCustom = ({ children }: { children: React.ReactNode }) => {
	return (
		<Container
			maxW={"100%"}
			paddingX={["1rem", "3rem", "4rem", "5rem", "7rem", "8rem"]}
		>
			{children}
		</Container>
	);
};

export default ContainerCustom;
