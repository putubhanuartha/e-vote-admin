import { Box, Button, Flex, Heading, Stack, Text } from "@chakra-ui/react";
import React from "react";
import { AiFillEdit } from "react-icons/ai";
import { BsPlusSquare } from "react-icons/bs";

import {
	convertEpochToLocalGMT,
	timeDigitConverter,
} from "@/helper/timeConverters";
import { VotingType } from "./voting.types";
export type VotingReadyPageProps = {
	isCandidateFormOpen: boolean;
	isVoteFormOpen: boolean;
	onCandidateFormClose: () => void;
	onVoteFormClose: () => void;
	onCandidateFormOpen: () => void;
	onVoteFormOpen: () => void;
	data: VotingType;
};
const VotingReadyPage: React.FC<VotingReadyPageProps> = ({
	isCandidateFormOpen,
	isVoteFormOpen,
	onCandidateFormClose,
	onVoteFormClose,
	onCandidateFormOpen,
	onVoteFormOpen,
	data,
}) => {
	const { hour: hourEnd, minute: minuteEnd } = convertEpochToLocalGMT(
		data.epochtimeEnd
	);
	const { day, hour, minute, month, year } = convertEpochToLocalGMT(
		data.epochtimeStart
	);
	console.log(data)
	return (
		<>
			<Flex
				justifyContent={"space-between"}
				flexDirection={{ base: "column", lg: "row" }}
				rowGap={3}
				columnGap={3}
			>
				<Box>
					<Text fontWeight={"medium"}>Waktu Pelaksanaan :</Text>
					<Text color={"green.700"}>
						{day}-{month}-{year} | {timeDigitConverter(hour, minute)} -{" "}
						{timeDigitConverter(hourEnd, minuteEnd)} WIB
					</Text>
				</Box>
				<Flex
					flexDirection={"column"}
					alignItems={{ base: "start", lg: "center" }}
				>
					<Text
						fontWeight={"medium"}
						textAlign={{ base: "start", lg: "center" }}
					>
						Status :
					</Text>
					{data.status === "active" && (
						<Text
							color={"green.400"}
							textAlign={"center"}
						>
							sedang berjalan
						</Text>
					)}
					{data.status === "ready" && (
						<Text
							color={"tomato"}
							textAlign={"center"}
						>
							belum mulai
						</Text>
					)}
					{data.status === "not_ready" && (
						<Text
							color={"tomato"}
							textAlign={{ base: "start", lg: "center" }}
						>
							tidak dapat dimulai
						</Text>
					)}
				</Flex>
				<Box>
					<Text
						textAlign={{ base: "start", lg: "end" }}
						fontWeight={"medium"}
					>
						Pemilihan Ketua{" "}
						<span className="uppercase">{data.jenisPilihan}</span>
					</Text>
					<Box>
						<Text
							textAlign={{ base: "start", lg: "end" }}
							fontWeight={"normal"}
						>
							Kelurahan {data.kelurahan}, Kecamatan{" "}
							{data.kecamatan}
						</Text>
						<Text
							textAlign={{ base: "start", lg: "end" }}
							fontWeight={"normal"}
						>
							{data.jenisPilihan === "rw"
								? `RW ${data.rw}`
								: `RW ${data.rw}, RT ${data.rt}`}
						</Text>
					</Box>
				</Box>
			</Flex>
			<Box
				h={"100%"}
				display={"flex"}
				flexDirection={"column"}
				alignItems={"center"}
				mt={3}
				rowGap={5}
			>
				<Stack
					direction={"row"}
					spacing={5}
					flexWrap={"wrap"}
					alignItems={"center"}
					justifyContent={"center"}
				>
					<Heading
						as={"h5"}
						fontWeight={"semibold"}
					>
						Kandidat Masih Kosong
					</Heading>
					{/* <CandidateCard />
					<CandidateCard /> */}
				</Stack>
				<Box margin={"auto"}>
					<Flex
						flexDirection={{ base: "column", lg: "row" }}
						gap={5}
					>
						<Button
							onClick={onCandidateFormOpen}
							leftIcon={<BsPlusSquare size={23} />}
							paddingY={"2rem"}
						>
							Tambah Kandidat Ketua
						</Button>
						<Button
							onClick={onVoteFormOpen}
							leftIcon={<AiFillEdit size={23} />}
							paddingY={"2rem"}
						>
							Edit Pelaksanaan Pemilihan
						</Button>
					</Flex>
				</Box>
			</Box>
		</>
	);
};

export default VotingReadyPage;
