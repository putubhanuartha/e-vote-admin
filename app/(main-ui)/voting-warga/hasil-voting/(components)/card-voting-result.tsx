import React from "react";
import {
	Button,
	Card,
	CardBody,
	CardFooter,
	CardHeader,
	Heading,
	Text,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";

export type CardVotingResultProps = {
	id: string;
	epochtimeStart: number;
};
const CardVotingResult: React.FC<CardVotingResultProps> = ({
	id,
	epochtimeStart,
}) => {
	const router = useRouter();
	return (
		<Card>
			<CardHeader>
				<Heading size="md">Hasil Voting Pemilihan</Heading>
			</CardHeader>
			<CardBody>
				<Text>Periode Pemilihan</Text>
				<Text>{new Date(epochtimeStart * 1000).toLocaleString()}</Text>
			</CardBody>
			<CardFooter>
				<Button
					onClick={() =>
						router.push(`/voting-warga/hasil-voting/detail-voting/${id}`)
					}
				>
					View here
				</Button>
			</CardFooter>
		</Card>
	);
};

export default CardVotingResult;
