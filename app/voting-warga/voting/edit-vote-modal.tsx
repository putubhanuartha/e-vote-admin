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
export type EditVoteType = {
	isOpen: boolean;
	onClose: () => void;
};
interface IFormVote {
	jenisPilihan: string;
	kelurahan: string;
	kecamatan: string;
	rt?: number;
	rw: number;
}
type IFormVoteSubmit = IFormVote & {
	date: Date;
	time: string;
};
const EditVoteModal: React.FC<EditVoteType> = ({ isOpen, onClose }) => {
	const [date, setDate] = useState(new Date());
	const {
		handleSubmit,
		register,
		watch,
		formState: { errors },
	} = useForm<IFormVote>({ defaultValues: { jenisPilihan: "rt" } });
	const initialRef = React.useRef(null);
	const finalRef = React.useRef(null);
	const onSubmit: SubmitHandler<IFormVote> = (data) => {
		console.log(date);
		console.log(data);
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
				<ModalHeader>Edit Pelaksanaan Pemilihan</ModalHeader>
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
								type="text"
								placeholder="Masukkan lokasi kecamatan"
							/>
							<FormErrorMessage>{errors.kecamatan?.message}</FormErrorMessage>
						</FormControl>
						<FormControl isInvalid={Boolean(errors.kelurahan)}>
							<FormLabel htmlFor="kelurahan">Kelurahan</FormLabel>
							<Input
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
							<FormLabel>Atur waktu</FormLabel>
							<DateInput />
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

export default EditVoteModal;
