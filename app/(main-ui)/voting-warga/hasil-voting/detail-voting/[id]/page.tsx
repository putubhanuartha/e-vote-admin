"use client";
import StatsPemilihan from "@/components/stats-pemilihan";
import { Box, Heading } from "@chakra-ui/react";
import React from "react";

const DetailVotingPage = ({ params }: { params: { id: string } }) => {
	const { id } = params;
	return (
		<Box>
			<Heading textAlign={"center"}>Statistik Pemilihan </Heading>
			<StatsPemilihan
				votingId={id}
				titleLabel="Hasil Final Pemilihan"
			/>
		</Box>
	);
};

export default DetailVotingPage;
