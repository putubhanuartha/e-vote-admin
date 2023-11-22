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
import { useRouter } from "next/navigation";

import VoteFormModal from "./vote-form-modal";
import KandidatFormModal from "./kandidate-form-modal";
import {
	useFetchAllWarga,
	useFetchAvailableVoting,
} from "@/hooks/useQueryHooks";
import { VotingType } from "../voting.types";
import { toast } from "react-toastify";

const VotingPage = () => {
	const router = useRouter();
	const [isEditFormCandidate, setIsEditFormCandidate] = useState(false);
	const [isEditFormVote, setIsEditFormVote] = useState(true);
	const {
		isOpen: isCandidateFormOpen,
		onOpen: onCandidateFormOpen,
		onClose: onCandidateFormClose,
	} = useDisclosure();
	const { data, isLoading } = useFetchAvailableVoting();
	const [keyword, setKeyword] = useState<string | undefined>(undefined);
	const {
		data: datawarga,
		isLoading: isLoadingWarga,
		isFetching: isFetchingWarga,
		isPending: isPendingWarga,
	} = useFetchAllWarga(keyword);
	const {
		isOpen: isVoteFormOpen,
		onOpen: onVoteFormOpen,
		onClose: onVoteFormClose,
	} = useDisclosure();

	useEffect(() => {
		if (!isLoadingWarga && !isLoading && !isFetchingWarga && !isPendingWarga) {
			if (!datawarga || datawarga.length === 0) {
				router.replace("/");
				toast.error("Data warga masih kosong")
			}
		}
	}, [
		datawarga,
		isLoadingWarga,
		router,
		isLoading,
		isFetchingWarga,
		isPendingWarga,
	]);
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
			{(isLoading && !data && !datawarga) ||
			(datawarga && datawarga.length === 0) ? (
				<Heading>Loading ...</Heading>
			) : (
				<>
					{isEditFormVote && data && datawarga && datawarga.length > 0 ? (
						<VotingReadyPage
							data={data as VotingType}
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

					{data && datawarga && datawarga.length > 0 && (
						<KandidatFormModal
							datawarga={datawarga}
							dataProps={data}
							setIsEditFormCandidate={setIsEditFormCandidate}
							isEditFormCandidate={isEditFormCandidate}
							isOpen={isCandidateFormOpen}
							onClose={onCandidateFormClose}
						/>
					)}

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
