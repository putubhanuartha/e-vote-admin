"use client";
import React, { useState } from "react";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { app } from "../../../config/firebase.config";
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
	useQuery,
} from "@chakra-ui/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useFetchAllWarga } from "@/hooks/useQueryHooks";
import { DataWargaResponseType } from "@/app/statistik-warga/statistik.type";
import addCandidate, {
	AxiosPostCandidateType,
} from "../../../helper/addCandidate";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { VotingType } from "../voting.types";
import { toast } from "react-toastify";

type IFormKandidat = AxiosPostCandidateType & {
	file: FileList;
};
export type KandidatFormModalType = {
	isOpen: boolean;
	onClose: () => void;
	isEditFormCandidate: boolean;
	setIsEditFormCandidate: React.Dispatch<React.SetStateAction<boolean>>;
	dataProps: VotingType;
	datawarga: any;
};
const KandidatFormModal: React.FC<KandidatFormModalType> = ({
	isOpen,
	onClose,
	dataProps,
	datawarga,
}) => {
	const queryClient = useQueryClient();
	const {
		handleSubmit,
		register,
		formState: { errors },
	} = useForm<IFormKandidat>();
	const initialRef = React.useRef(null);
	const finalRef = React.useRef(null);

	const { mutateAsync: addCandidateAsync } = useMutation({
		mutationFn: addCandidate,
		onSuccess: () =>
			Promise.all([
				queryClient.invalidateQueries({
					queryKey: ["candidates"],
				}),
				queryClient.invalidateQueries({
					queryKey: ["voting"],
				}),
			]),
	});
	const onSubmit: SubmitHandler<IFormKandidat> = (dataForm) => {
		const storage = getStorage(app);
		const storageRef = ref(
			storage,
			`images/candidates/${new Date().getTime().toString()}_${
				dataForm.file[0].name
			}`
		);
		uploadBytes(storageRef, dataForm.file[0]).then((snapshot) => {
			getDownloadURL(storageRef).then(async (downloadUrl) => {
				try {
					const response = await addCandidateAsync({
						misi: dataForm.misi,
						visi: dataForm.visi,
						imageUrl: downloadUrl,
						kandidat: dataForm.kandidat,
						votingId: dataProps.id,
					});
					toast.success("sukses menambahka kandidat");
					onClose();
				} catch (err) {
					console.error(err);
					toast.error("gagal menambahkan data");
				}
			});
		});
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
				<ModalHeader>Pendaftaran Kandidat Ketua</ModalHeader>
				<ModalCloseButton />
				<form onSubmit={handleSubmit(onSubmit)}>
					<ModalBody
						pb={6}
						display={"flex"}
						flexDirection={"column"}
						rowGap={"0.5rem"}
					>
						<FormControl isInvalid={Boolean(errors.kandidat)}>
							<FormLabel htmlFor="kandidat">Pilih Kandidat</FormLabel>
							<Select
								{...register("kandidat", {
									required: "Pilih kandidat calon ketua",
								})}
								placeholder="Pilih calon kandidat"
							>
								{(datawarga as DataWargaResponseType[]).map((el) => {
									return (
										<option
											key={el.id}
											value={el.id}
										>
											{el.nama}
										</option>
									);
								})}
							</Select>
							<FormErrorMessage>
								{errors.kandidat && errors.kandidat.message}
							</FormErrorMessage>
						</FormControl>
						<FormControl isInvalid={Boolean(errors.visi)}>
							<FormLabel htmlFor="visi">Visi Kandidat</FormLabel>
							<Input
								{...register("visi", { required: "Masukkan visi kandidat" })}
								type="text"
								placeholder="Masukkan visi kandidat"
							/>
							<FormErrorMessage>
								{errors.visi && errors.visi.message}
							</FormErrorMessage>
						</FormControl>
						<FormControl isInvalid={Boolean(errors.misi)}>
							<FormLabel htmlFor="misi">Misi Kandidat</FormLabel>
							<Textarea
								{...register("misi", { required: "Masukkan misi kandidat" })}
								placeholder="Masukkan misi kandidat"
							/>
							<FormErrorMessage>{errors.misi?.message}</FormErrorMessage>
						</FormControl>
						<FormControl isInvalid={Boolean(errors.file)}>
							<FormLabel htmlFor="file">Upload Foto</FormLabel>
							<Input
								{...register("file", { required: "Upload gambar kandidat" })}
								type="file"
								accept="image/*"
							/>
							<FormErrorMessage>{errors.file?.message}</FormErrorMessage>
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

export default KandidatFormModal;
