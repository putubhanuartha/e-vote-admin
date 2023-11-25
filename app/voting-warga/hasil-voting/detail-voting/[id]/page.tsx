"use client";
import StatsPemilihan from "@/components/stats-pemilihan";
import { pemilihan } from "@/data/data";
import { Box, Heading } from "@chakra-ui/react";
import React from "react";

const page = () => {
	return (
		<Box>
			<Heading textAlign={'center'}>Statistik Pemilihan </Heading>
			<StatsPemilihan {...pemilihan} />
		</Box>
	);
};

export default page;
