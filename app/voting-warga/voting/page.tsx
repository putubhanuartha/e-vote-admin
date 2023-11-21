"use client";
import {
	Box,
	Button,
	Flex,
	Heading,
	Stack,
	useEditable,
	useQuery,
} from "@chakra-ui/react";
import { AiFillEdit } from "react-icons/ai";
import React, { useEffect, useState } from "react";
import { useDisclosure, Text } from "@chakra-ui/react";
import { BsPlusSquare } from "react-icons/bs";
import CandidateCard from "./candidate-card";
import VotingReadyPage from "./voting-ready-page";

import VoteFormModal from "./vote-form-modal";
import KandidatFormModal from "./kandidate-form-modal";
import { useFetchAvailableVoting } from "@/hooks/useQueryHooks";
import { VotingCandidatesType } from "./voting.types";

const VotingPage = () => {
	const [isEditFormCandidate, setIsEditFormCandidate] = useState(false);
	const [isEditFormVote, setIsEditFormVote] = useState(true);
	const {
		isOpen: isCandidateFormOpen,
		onOpen: onCandidateFormOpen,
		onClose: onCandidateFormClose,
	} = useDisclosure();
	const { data, isLoading } = useFetchAvailableVoting();
	const {
		isOpen: isVoteFormOpen,
		onOpen: onVoteFormOpen,
		onClose: onVoteFormClose,
	} = useDisclosure();

	useEffect(() => {
		if (!data && !isLoading) {
			setIsEditFormVote(false);
		} else {
			setIsEditFormVote(true);
		}
	}, [isEditFormVote, data, isLoading]);
	useEffect(() => {
		if (!isEditFormVote) {
			onVoteFormOpen();
		} else {
			onVoteFormClose();
		}
	}, [isEditFormVote, onVoteFormClose, onVoteFormOpen]);
	return (
		<>
			{isLoading && !data ? (
				<Heading>Loading ...</Heading>
			) : (
				<>
					{isEditFormVote && data ? (
						<VotingReadyPage
							data={data as VotingCandidatesType}
							isCandidateFormOpen={isCandidateFormOpen}
							isVoteFormOpen={isVoteFormOpen}
							onCandidateFormClose={onCandidateFormClose}
							onCandidateFormOpen={onCandidateFormOpen}
							onVoteFormClose={onVoteFormClose}
							onVoteFormOpen={onVoteFormOpen}
						/>
					) : (
						<Box
							onClick={() => {
								onVoteFormOpen();
								setIsEditFormVote(false);
							}}
							h={"70vh"}
							width={"100%"}
							display={"flex"}
						>
							<Button margin={"auto"}>Tambah Voting</Button>
						</Box>
					)}
					<KandidatFormModal
						setIsEditFormCandidate={setIsEditFormCandidate}
						isEditFormCandidate={isEditFormCandidate}
						isOpen={isCandidateFormOpen}
						onClose={onCandidateFormClose}
					/>
					<VoteFormModal
						data={data}
						setIsEditFormVote={setIsEditFormVote}
						isEditFormVote={isEditFormVote}
						isOpen={isVoteFormOpen}
						onClose={onVoteFormClose}
					/>
				</>
			)}
		</>
	);
};

export default VotingPage;
