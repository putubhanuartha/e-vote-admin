"use client";
import React, { useEffect, useState } from "react";
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
	Input,
	useDisclosure,
	Select,
	Box,
	Button,
	Flex,
	FormControl,
	FormErrorMessage,
	FormLabel,
	Stack,
	Textarea,
} from "@chakra-ui/react";
import DateInput from "@/components/date-input/date-input";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import addVoting from "@/helper/addVoting";
import { VotingCandidatesType } from "./voting.types";
import {
	convertToDateObject,
	getHourMinuteEpoch,
} from "@/helper/timeConverters";
import editVoting from "@/helper/editVoting";
import { toast } from "react-toastify";
export type VoteFormModalType = {
	isOpen: boolean;
	onClose: () => void;
	isEditFormVote: boolean;
	setIsEditFormVote: React.Dispatch<React.SetStateAction<boolean>>;
	data: VotingCandidatesType | null | undefined;
};

export type IFormVote = {
	id?: string;
	date: Date;
	timeStart: string;
	timeEnd: string;
	jenisPilihan: "rt" | "rw";
	kelurahan: string;
	kecamatan: string;
	rt?: number;
	rw: number;
};
const VoteFormModal: React.FC<VoteFormModalType> = ({
	isOpen,
	onClose,
	isEditFormVote,
	data,
}) => {
	const queryClient = useQueryClient();

	const [date, setDate] = useState(
		data?.voting
			? new Date(convertToDateObject(data.voting.epochtimeStart))
			: new Date()
	);
	const [timeStart, setTimeStart] = useState("");
	const [timeEnd, setTimeEnd] = useState("");
	const {
		handleSubmit,
		register,
		watch,
		formState: { errors },
	} = useForm<IFormVote>({
		defaultValues: {
			jenisPilihan: data?.voting ? data.voting.jenisPilihan : "rt",
		},
	});
	const initialRef = React.useRef(null);
	const finalRef = React.useRef(null);
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
		try {
			if (isEditFormVote && data) {
				dataForm.id = data.votingId;
				await editMutateAync({
					votingCandidateId: data.id as string,
					...dataForm,
				});
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
	const watchJenisPilihan = watch("jenisPilihan");
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
						<FormControl isInvalid={Boolean(errors.jenisPilihan)}>
							<FormLabel htmlFor="jenisPilihan">
								Pilih Jenis Pemilihan
							</FormLabel>
							<Select
								{...register("jenisPilihan", {
									required: "Pilih kandidat jenis pemilihan",
								})}
							>
								<option value="rt">RT</option>
								<option value="rw">RW</option>
							</Select>
							<FormErrorMessage>
								{errors.jenisPilihan?.message}
							</FormErrorMessage>
						</FormControl>
						<FormControl isInvalid={Boolean(errors.kecamatan)}>
							<FormLabel htmlFor="kecamatan">Kecamatan</FormLabel>
							<Input
								{...register("kecamatan", {
									required: "Masukkan lokasi kecamatan pemilihan",
								})}
								defaultValue={data?.voting.kecamatan}
								type="text"
								placeholder="Masukkan lokasi kecamatan"
							/>
							<FormErrorMessage>{errors.kecamatan?.message}</FormErrorMessage>
						</FormControl>
						<FormControl isInvalid={Boolean(errors.kelurahan)}>
							<FormLabel htmlFor="kelurahan">Kelurahan</FormLabel>
							<Input
								defaultValue={data?.voting.kelurahan}
								{...register("kelurahan", {
									required: "Masukkan lokasi kandidat",
								})}
								placeholder="Masukkan lokasi kelurahan"
							/>
							<FormErrorMessage>{errors.kelurahan?.message}</FormErrorMessage>
						</FormControl>
						<FormControl isInvalid={Boolean(errors.rw)}>
							<FormLabel htmlFor="rw">Masukkan nomor rw</FormLabel>
							<Input
								defaultValue={data?.voting.rw}
								{...register("rw", { required: "Masukkan rw" })}
								type="number"
								placeholder="Masukkan nomor rw"
							/>
							<FormErrorMessage>{errors.rw?.message}</FormErrorMessage>
						</FormControl>
						{watchJenisPilihan === "rt" && (
							<FormControl isInvalid={Boolean(errors.rt)}>
								<FormLabel htmlFor="rt">Masukkan nomor rw</FormLabel>
								<Input
									defaultValue={data?.voting.rt ? data.voting.rt : undefined}
									{...register("rt", { required: "Masukkan nomor rt" })}
									type="number"
									placeholder="Masukkan nomor rt"
								/>
								<FormErrorMessage>{errors.rt?.message}</FormErrorMessage>
							</FormControl>
						)}
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
									data?.voting
										? getHourMinuteEpoch(data.voting.epochtimeStart).hour
										: 0
								}
								defaultSecondDigit={
									data?.voting
										? getHourMinuteEpoch(data.voting.epochtimeStart).minute
										: 0
								}
								setTime={setTimeStart}
								time={timeStart}
							/>
						</FormControl>
						<FormControl>
							<FormLabel>Atur waktu Selesai</FormLabel>
							<DateInput
								defaultFirstDigit={
									data?.voting
										? getHourMinuteEpoch(data.voting.epochtimeEnd).hour
										: 0
								}
								defaultSecondDigit={
									data?.voting
										? getHourMinuteEpoch(data.voting.epochtimeEnd).minute
										: 0
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
