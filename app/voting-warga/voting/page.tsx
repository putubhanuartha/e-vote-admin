"use client";
import { Box, Button, Heading } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useDisclosure } from "@chakra-ui/react";
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
	const {
		isOpen: isVoteFormOpen,
		onOpen: onVoteFormOpen,
		onClose: onVoteFormClose,
	} = useDisclosure();

	const { data: dataVoting, isLoading: loadingVoting } =
		useFetchAvailableVoting();
	const {
		data: datawarga,
		isLoading: isLoadingWarga,
		isFetching: isFetchingWarga,
		isPending: isPendingWarga,
	} = useFetchAllWarga(undefined);

	useEffect(() => {
		if (
			!isLoadingWarga &&
			!loadingVoting &&
			!isFetchingWarga &&
			!isPendingWarga
		) {
			if (!datawarga || datawarga.length === 0) {
				router.replace("/");
				toast.error("Data warga masih kosong");
			}
		}
	}, [
		datawarga,
		isLoadingWarga,
		router,
		loadingVoting,
		isFetchingWarga,
		isPendingWarga,
	]);

	useEffect(() => {
		if (!dataVoting && !loadingVoting) {
			setIsEditFormVote(false);
		} else {
			setIsEditFormVote(true);
		}
	}, [isEditFormVote, dataVoting, loadingVoting]);

	useEffect(() => {
		if (!isEditFormVote) {
			onVoteFormOpen();
		} else {
			onVoteFormClose();
		}
	}, [isEditFormVote, onVoteFormClose, onVoteFormOpen]);

	return (
		<>
			{(loadingVoting || isLoadingWarga || !datawarga)  ? (
				<Heading>Loading ...</Heading>
			) : (
				<>
					{isEditFormVote && dataVoting && datawarga && datawarga.length > 0 ? (
						<VotingReadyPage
							data={dataVoting as VotingType}
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

					{dataVoting && datawarga && (
						<KandidatFormModal
							datawarga={datawarga}
							dataProps={dataVoting}
							setIsEditFormCandidate={setIsEditFormCandidate}
							isEditFormCandidate={isEditFormCandidate}
							isOpen={isCandidateFormOpen}
							onClose={onCandidateFormClose}
						/>
					)}

					<VoteFormModal
						data={dataVoting}
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
