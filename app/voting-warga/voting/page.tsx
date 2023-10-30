import { Box, Button } from "@chakra-ui/react";
import React from "react";
import { BsPlusSquare } from "react-icons/bs";
const VotingPage = () => {
	return (
		<Box
			h={"100%"}
			display={"flex"}
		>
			<Box margin={"auto"}>
				<Button
					leftIcon={<BsPlusSquare size={23} />}
					paddingY={"2rem"}
				>
					Tambah Kandidat Ketua RT
				</Button>
			</Box>
		</Box>
	);
};

export default VotingPage;
