import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import generateRGBAValues from "@/helper/generateRGBAColor";
import { Box, Heading } from "@chakra-ui/react";
ChartJS.register(ArcElement, Tooltip, Legend);

export type StatsPemilihan = {
	datas: {
		label: string;
		value: number;
	}[];
	titleLabel: string;
};
const StatsPemilihan: React.FC<StatsPemilihan> = ({ datas, titleLabel }) => {
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
	return (
		<Box
			w={"full"}
			h={{ base: "30rem", md: "40rem", lg: "50rem" }}
			display={"flex"}
			justifyContent={"center"}
			alignItems={"center"}
			flexDirection={"column"}
		>
			<Pie data={data} />
		</Box>
	);
};

export default StatsPemilihan;
