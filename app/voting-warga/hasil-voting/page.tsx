import { Box, Stack } from "@chakra-ui/react";
import React from "react";
import CardVotingResult from "./(components)/card-voting-result";

const HasilVoting = () => {
	return (
		<Box>
			<Stack direction={"column"}>
				<CardVotingResult />
				<CardVotingResult />
				<CardVotingResult />
				<CardVotingResult />
			</Stack>
		</Box>
	);
};

export default HasilVoting;
