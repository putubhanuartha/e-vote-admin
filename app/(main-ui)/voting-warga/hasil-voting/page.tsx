"use client";
import { Box, Heading, Stack } from "@chakra-ui/react";
import React from "react";
import CardVotingResult from "./(components)/card-voting-result";
import { useQuery } from "@tanstack/react-query";
import { axiosMainServerCredentials } from "@/config/axios.config";

const HasilVoting = () => {
	const { data, isLoading } = useQuery({
		queryKey: ["statspemilihan"],
		queryFn: async () =>
			await axiosMainServerCredentials.get("/admin/get-all-pemilihan"),
	});
	console.log(data?.data);
	return (
		<Box>
			<Stack direction={"column"}>
				{isLoading && <Heading>Loading ...</Heading>}
				{data &&
					data.data.map((el: any, index: number) => {
						return (
							<CardVotingResult
								epochtimeStart={el.epochtimeStart}
								id={el.id}
								key={index}
							/>
						);
					})}
			</Stack>
		</Box>
	);
};

export default HasilVoting;
