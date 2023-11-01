"use client";
import { Box, Button, Flex, Heading, Stack } from "@chakra-ui/react";
import { AiFillEdit } from "react-icons/ai";
import React from "react";
import { useDisclosure, Text } from "@chakra-ui/react";
import { BsPlusSquare } from "react-icons/bs";
import CandidateCard from "./candidate-card";
import TambahKandidatModal from "./tambah-kandidat-modal";
import EditVoteModal from "./edit-vote-modal";

const VotingPage = () => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const {
		isOpen: isEditOpen,
		onOpen: onEditOpen,
		onClose: onEditClose,
	} = useDisclosure();

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
					<Text color={"green.700"}>01-04-2023 | 08:00 - 16:00 WIB</Text>
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
					{/* <Text color={'green.400'} textAlign={'center'}>sedang berjalan</Text> */}
					{/* <Text color={"tomato"} textAlign={'center'}>belum mulai</Text> */}
					<Text
						color={"tomato"}
						textAlign={{ base: "start", lg: "center" }}
					>
						tidak dapat dimulai
					</Text>
				</Flex>
				<Box>
					<Text
						textAlign={{ base: "start", lg: "end" }}
						fontWeight={"medium"}
					>
						Pemilihan Ketua RT
					</Text>
					<Box>
						<Text
							textAlign={{ base: "start", lg: "end" }}
							fontWeight={"normal"}
						>
							Kelurahan Rawamangun, Kecamatan Suhat
						</Text>
						<Text
							textAlign={{ base: "start", lg: "end" }}
							fontWeight={"normal"}
						>
							RT 01, RW 05
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
							onClick={onOpen}
							leftIcon={<BsPlusSquare size={23} />}
							paddingY={"2rem"}
						>
							Tambah Kandidat Ketua
						</Button>
						<Button
							onClick={onEditOpen}
							leftIcon={<AiFillEdit size={23} />}
							paddingY={"2rem"}
						>
							Edit Pelaksanaan Pemilihan
						</Button>
					</Flex>
				</Box>
			</Box>
			<TambahKandidatModal
				isOpen={isOpen}
				onClose={onClose}
			/>
			<EditVoteModal
				isOpen={isEditOpen}
				onClose={onEditClose}
			/>
		</>
	);
};

export default VotingPage;
