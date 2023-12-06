import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import generateRGBAValues from "@/helper/generateRGBAColor";
import { Box, Heading } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { axiosMainServerCredentials } from "@/config/axios.config";
ChartJS.register(ArcElement, Tooltip, Legend);

export type StatsPemilihan = {
	votingId: string;
	titleLabel: string;
};
const StatsPemilihan: React.FC<StatsPemilihan> = ({ titleLabel, votingId }) => {
	const { data: statsData, isLoading } = useQuery({
		queryKey: ["statspemilihan"],
		queryFn: async () =>
			await axiosMainServerCredentials.get(
				`/admin/stats-pemilihan?votingId=${votingId}`
			),
	});

	function generateDataStats(datas: [{ label: string; value: number }]) {
		const data = {
			labels: datas.map((el) => el.label),
			datasets: [
				{
					label: titleLabel,
					data: datas.map((el) => el.value),
					backgroundColor: generateRGBAValues(datas.length),
					borderWidth: 1,
				},
			],
		};
		return data;
	}

	return (
		<>
			{isLoading && <Heading>Loading Stats ...</Heading>}
			{statsData?.data && (
				<Box
					w={"full"}
					h={{ base: "30rem", md: "40rem", lg: "50rem" }}
					display={"flex"}
					justifyContent={"center"}
					alignItems={"center"}
					flexDirection={"column"}
				>
					<Pie data={generateDataStats(statsData.data)} />
				</Box>
			)}
		</>
	);
};

export default StatsPemilihan;
