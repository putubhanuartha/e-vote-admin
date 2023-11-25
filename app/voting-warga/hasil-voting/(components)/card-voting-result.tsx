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
const CardVotingResult = () => {
	return (
		<Card>
			<CardHeader>
				<Heading size="md">Hasil Voting Pemilihan</Heading>
			</CardHeader>
			<CardBody>
				<Text>Periode Pemilihan</Text>
                <Text>2-12-2023</Text>
			</CardBody>
			<CardFooter>
				<Button>View here</Button>
			</CardFooter>
		</Card>
	);
};

export default CardVotingResult;
