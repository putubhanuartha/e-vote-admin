"use client";
import React, { useEffect, useState } from "react";
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
import { DataWargaType } from "@/data/data";
import { SubmitHandler, useForm } from "react-hook-form";
export type DisplayUpdateWargaProps = {
	dataWarga: DataWargaType[];
};
const DisplayUpdateWarga: React.FC<DisplayUpdateWargaProps> = ({
	dataWarga,
}) => {
	const { isOpen, onOpen, onClose } = useDisclosure();

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
		setValue,
	} = useForm<DataWargaType>();
	const initialRef = React.useRef(null);
	const finalRef = React.useRef(null);

	const onSubmit: SubmitHandler<DataWargaType> = (data) => {
		console.log(data);
	};
	return (
		<>
			<Stack direction={"row"}>
				<Input
					type="text"
					placeholder="Cari warga"
					mb={3}
				/>
				<Button
					type="button"
					variant={"solid"}
					colorScheme="blue"
				>
					Cari
				</Button>
			</Stack>
			<TableContainer>
				<Table variant="simple">
					<TableCaption>Data Statistik Warga RT 01</TableCaption>
					<Thead>
						<Tr>
							<Th>Nama</Th>
							<Th>NIK</Th>
							<Th>Email</Th>
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
										<IconButton
											onClick={() => {
												onOpen();
												setValue("email", dataWarga[index].email);
												setValue("nama", dataWarga[index].nama);
												setValue("nik", dataWarga[index].nik);
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
								colorScheme="blue"
								mr={3}
								type="submit"
							>
								Save
							</Button>
							<Button onClick={onClose}>Cancel</Button>
						</ModalFooter>
					</form>
				</ModalContent>
			</Modal>
		</>
	);
};

export default DisplayUpdateWarga;
