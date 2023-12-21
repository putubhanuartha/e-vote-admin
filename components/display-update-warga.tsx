"use client";
import React, { FormEvent, useState } from "react";
import { BsPencilSquare } from "react-icons/bs";
import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	ModalCloseButton,
	FormControl,
	FormLabel,
	FormErrorMessage,
} from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";
import {
	Table,
	Thead,
	Tbody,
	Tr,
	Th,
	Td,
	TableCaption,
	TableContainer,
	Button,
	Stack,
	Input,
	IconButton,
} from "@chakra-ui/react";
import { DataWargaType, StatusAkunWarga } from "@/data/data";
import { SubmitHandler, useForm } from "react-hook-form";
import updateWarga from "@/helper/updateWarga";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { DataWargaResponseType } from "@/app/(main-ui)/statistik-warga/statistik.type";
export type DisplayUpdateWargaProps = {
	dataWarga: DataWargaResponseType[];
	id: string | null;
	setId: React.Dispatch<React.SetStateAction<string | null>>;
	keyword: string | undefined | null;
	setKeyword: React.Dispatch<React.SetStateAction<null | undefined | string>>;
};
const DisplayUpdateWarga: React.FC<DisplayUpdateWargaProps> = ({
	dataWarga,
	id,
	setId,
	keyword,
	setKeyword,
}) => {
	const queryClient = useQueryClient();
	const { isOpen, onOpen, onClose } = useDisclosure();

	const { mutateAsync, isPending } = useMutation({
		mutationFn: updateWarga,
		onSuccess: () => {
			return queryClient.invalidateQueries({
				queryKey: ["statswarga", keyword],
			});
		},
	});
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
		setValue,
	} = useForm<DataWargaType>();
	const initialRef = React.useRef(null);
	const finalRef = React.useRef(null);

	const onSubmit: SubmitHandler<DataWargaType> = async (data) => {
		try {
			const res = await mutateAsync(data);
			toast.success("Data berhasil diupdate");
			onClose();
			console.log(res);
		} catch (err) {
			console.error(err);
			toast.error("Data gagal diupdate");
		}
	};
	const handleSubmitSearch = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const data = new FormData(e.currentTarget);
		const dataSearch = data.get("search");
		setKeyword(dataSearch as string);
	};
	return (
		<>
			<form onSubmit={handleSubmitSearch}>
				<Stack direction={"row"}>
					<Input
						type="text"
						placeholder="Cari warga"
						id="search"
						name="search"
						mb={3}
					/>
					<Button
						type="submit"
						variant={"solid"}
						colorScheme="blue"
					>
						Cari
					</Button>
				</Stack>
			</form>
			<TableContainer>
				<Table variant="simple">
					<TableCaption>Data Statistik Warga RT 01</TableCaption>
					<Thead>
						<Tr>
							<Th>Nama</Th>
							<Th>NIK</Th>
							<Th>Email</Th>
							<Th>Status</Th>
							<Th>Action</Th>
						</Tr>
					</Thead>
					<Tbody>
						{dataWarga.map((el, index) => {
							return (
								<Tr key={index}>
									<Td>{el.nama}</Td>
									<Td>{el.nik}</Td>
									<Td>{el.email}</Td>
									<Td>
										{el.registered
											? StatusAkunWarga.terdaftar
											: StatusAkunWarga.belum_terdaftar}
									</Td>
									<Td>
										<IconButton
											onClick={() => {
												onOpen();
												setValue("email", dataWarga[index].email);
												setValue("nama", dataWarga[index].nama);
												setValue("nik", dataWarga[index].nik);
												setValue("id", dataWarga[index].id);
											}}
											aria-label="edit warga"
											icon={<BsPencilSquare />}
											colorScheme="blue"
										/>
									</Td>
								</Tr>
							);
						})}
					</Tbody>
				</Table>
			</TableContainer>
			<Modal
				initialFocusRef={initialRef}
				finalFocusRef={finalRef}
				isOpen={isOpen}
				onClose={onClose}
			>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>Edit data warga</ModalHeader>
					<ModalCloseButton />

					<form onSubmit={handleSubmit(onSubmit)}>
						<ModalBody pb={6}>
							<FormControl>
								<FormLabel>NIK</FormLabel>
								<Input
									{...register("nik")}
									isDisabled
								/>
							</FormControl>

							<FormControl mt={4}>
								<FormLabel>Nama</FormLabel>
								<Input
									{...register("nama")}
									placeholder="Nama baru"
								/>
							</FormControl>
							<FormControl
								mt={4}
								isInvalid={Boolean(errors.email)}
							>
								<FormLabel>Email</FormLabel>

								<Input
									{...register("email", {
										pattern: {
											value:
												/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
											message: "Alamat email tidak sesuai",
										},
									})}
									placeholder="Email baru"
								/>
								<FormErrorMessage>{errors.email?.message}</FormErrorMessage>
							</FormControl>
						</ModalBody>

						<ModalFooter>
							<Button
								disabled={isSubmitting || isPending}
								colorScheme="blue"
								mr={3}
								type="submit"
							>
								Save
							</Button>
							<Button
								disabled={isSubmitting || isPending}
								onClick={onClose}
							>
								Cancel
							</Button>
						</ModalFooter>
					</form>
				</ModalContent>
			</Modal>
		</>
	);
};

export default DisplayUpdateWarga;
