"use client";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { SingleDatepicker } from "chakra-dayzed-datepicker";
import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	ModalCloseButton,
	Button,
	FormControl,
	FormLabel,
} from "@chakra-ui/react";
import DateInput from "@/components/date-input/date-input";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import addVoting from "@/helper/addVoting";

import {
	convertToDateObject,
	getHourMinuteEpoch,
} from "@/helper/timeConverters";
import editVoting from "@/helper/editVoting";
import { toast } from "react-toastify";
import { VotingType } from "../../voting.types";
import { useFetchOneAdministrative } from "@/hooks/useQueryHooks";
export type VoteFormModalType = {
	isOpen: boolean;
	onClose: () => void;
	isEditFormVote: boolean;
	setIsEditFormVote: React.Dispatch<React.SetStateAction<boolean>>;
	data: VotingType | null | undefined;
};

export type IFormVote = {
	id?: string;
	date: Date;
	timeStart: string;
	timeEnd: string;
	administrativeId: string;
};
const VoteFormModal: React.FC<VoteFormModalType> = ({
	isOpen,
	onClose,
	isEditFormVote,
	data,
}) => {
	const queryClient = useQueryClient();
	const time = new Date();
	time.setHours(0, 0, 0, 0);
	const [date, setDate] = useState(
		data ? convertToDateObject(data.epochtimeStart) : time
	);
	const [timeStart, setTimeStart] = useState("");
	const [timeEnd, setTimeEnd] = useState("");
	const { handleSubmit } = useForm<IFormVote>();
	const initialRef = React.useRef(null);
	const finalRef = React.useRef(null);
	const { data: dataAdministrative, isLoading: loadingAdministrative } =
		useFetchOneAdministrative();
	const { mutateAsync: addVotingAsync, isPending: isPendingAddVoting } =
		useMutation({
			mutationFn: addVoting,
			onSuccess: () => {
				return queryClient.invalidateQueries({
					queryKey: ["voting"],
				});
			},
		});
	const { mutateAsync: editMutateAync } = useMutation({
		mutationFn: editVoting,
		onSuccess: () => queryClient.invalidateQueries({ queryKey: ["voting"] }),
	});
	const onSubmit: SubmitHandler<IFormVote> = async (dataForm) => {
		dataForm.date = date;
		dataForm.timeStart = timeStart + ":00";
		dataForm.timeEnd = timeEnd + ":00";
		dataForm.administrativeId = dataAdministrative.id;
		try {
			if (isEditFormVote && data) {
				dataForm.id = data.id;
				await editMutateAync(dataForm);
				toast.success("data voting berhasil diupdate");
				onClose();
			} else {
				await addVotingAsync(dataForm);
				toast.success("data voting berhasil ditambahkan");
			}
		} catch (err) {
			console.error(err);
			toast.error("gagal mengupdate data atau menambahkan data");
		}
	};

	return (
		<Modal
			initialFocusRef={initialRef}
			finalFocusRef={finalRef}
			isOpen={isOpen}
			onClose={onClose}
		>
			<ModalOverlay />
			<ModalContent>
				<ModalHeader>
					{isEditFormVote
						? "Edit Pelaksanaan Pemilihan"
						: "Tambah Pelaksanaan Pemilihan"}
				</ModalHeader>
				<ModalCloseButton />
				<form onSubmit={handleSubmit(onSubmit)}>
					<ModalBody
						pb={6}
						display={"flex"}
						flexDirection={"column"}
						rowGap={"0.5rem"}
					>
						<FormControl>
							<FormLabel>Atur Tanggal</FormLabel>
							<SingleDatepicker
								name="date-input"
								date={date}
								onDateChange={setDate}
							/>
						</FormControl>
						<FormControl>
							<FormLabel>Atur waktu Mulai</FormLabel>
							<DateInput
								defaultFirstDigit={
									data ? getHourMinuteEpoch(data.epochtimeStart).hour : 0
								}
								defaultSecondDigit={
									data ? getHourMinuteEpoch(data.epochtimeStart).minute : 0
								}
								setTime={setTimeStart}
								time={timeStart}
							/>
						</FormControl>
						<FormControl>
							<FormLabel>Atur waktu Selesai</FormLabel>
							<DateInput
								defaultFirstDigit={
									data ? getHourMinuteEpoch(data.epochtimeEnd).hour : 0
								}
								defaultSecondDigit={
									data ? getHourMinuteEpoch(data.epochtimeEnd).minute : 0
								}
								setTime={setTimeEnd}
								time={timeEnd}
							/>
						</FormControl>
					</ModalBody>

					<ModalFooter>
						<Button
							colorScheme="blue"
							mr={3}
							type="submit"
						>
							Kirim
						</Button>
						<Button onClick={onClose}>Cancel</Button>
					</ModalFooter>
				</form>
			</ModalContent>
		</Modal>
	);
};

export default VoteFormModal;
