"use client";
import React from "react";
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
import { SubmitHandler, useForm } from "react-hook-form";
interface IFormKandidat {
	kandidat: string;
	visi: string;
	misi: string;
	file: FileList;
}
export type KandidatFormModalType = {
	isOpen: boolean;
	onClose: () => void;
	isEditFormCandidate: boolean;
	setIsEditFormCandidate: React.Dispatch<React.SetStateAction<boolean>>;
};
const KandidatFormModal: React.FC<KandidatFormModalType> = ({
	isOpen,
	onClose,
}) => {
	const {
		handleSubmit,
		register,
		formState: { errors },
	} = useForm<IFormKandidat>();
	const initialRef = React.useRef(null);
	const finalRef = React.useRef(null);
	const onSubmit: SubmitHandler<IFormKandidat> = (data) => {
		console.log(data);
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
				<ModalHeader>Pendaftaran Kandidat Ketua RT</ModalHeader>
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
								<option value="option1">Option 1</option>
								<option value="option2">Option 2</option>
								<option value="option3">Option 3</option>
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
