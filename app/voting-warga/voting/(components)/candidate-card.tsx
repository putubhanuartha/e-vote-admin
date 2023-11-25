"use client";
import {
	Button,
	Card,
	CardBody,
	Divider,
	Heading,
	Image,
	Stack,
	Text,
} from "@chakra-ui/react";
import React from "react";

export type CandidateCardType = {
	nama: string;
	visi: string;
	misi: string;
	nik: string;
	candidateId: string;
	photoUrl: string;
	votingId: string;
	handleDeleteCandidate: (id: string, votingId: string) => Promise<void>;
};
const CandidateCard: React.FC<CandidateCardType> = ({
	candidateId,
	misi,
	nama,
	nik,
	photoUrl,
	visi,
	handleDeleteCandidate,
	votingId,
}) => {
	return (
		<Card maxW="xs">
			<CardBody>
				<Image
					src={photoUrl}
					alt={`${nama}-image`}
					borderRadius="lg"
					h={"20rem"}
					w={"17rem"}
					objectFit={"cover"}
				/>
				<Stack
					mt="3"
					spacing="1"
				>
					<Heading size="md">{nama}</Heading>
					<Text
						color="blue.600"
						fontSize="lg"
					>
						{visi}
					</Text>
					<Text>{misi}</Text>
				</Stack>
				<Button
					onClick={() => handleDeleteCandidate(candidateId, votingId)}
					colorScheme="red"
					mt={"1.5"}
					ml={"auto"}
					display={"block"}
				>
					Delete
				</Button>
			</CardBody>
			<Divider />
		</Card>
	);
};

export default CandidateCard;
