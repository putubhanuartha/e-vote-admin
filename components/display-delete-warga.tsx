"use client";
import React, {
	ChangeEvent,
	ChangeEventHandler,
	FormEvent,
	FormEventHandler,
	useRef,
} from "react";
import { DataWargaType, StatusAkunWarga } from "@/data/data";
import { BsTrashFill } from "react-icons/bs";
import { IconButton } from "@chakra-ui/react";
import {
	AlertDialog,
	AlertDialogBody,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogContent,
	AlertDialogOverlay,
	useDisclosure,
	Stack,
	Input,
} from "@chakra-ui/react";
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
} from "@chakra-ui/react";
import { DataWargaResponseType } from "@/app/(main-ui)/statistik-warga/statistik.type";

export type DisplayDeleteWarga = {
	dataWarga: DataWargaResponseType[];
	id: string | null;
	setId: React.Dispatch<React.SetStateAction<string | null>>;
	handleDelete: () => void;
	setKeyword: React.Dispatch<React.SetStateAction<undefined | string | null>>;
};
const DisplayDeleteWarga: React.FC<DisplayDeleteWarga> = ({
	dataWarga,
	setId,
	handleDelete,
	setKeyword,
}) => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const cancelRef = useRef(null);
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
						id="search"
						name="search"
						placeholder="Cari warga"
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
												setId(el.id);
											}}
											aria-label="delete warga"
											icon={<BsTrashFill />}
											colorScheme="red"
										/>
									</Td>
								</Tr>
							);
						})}
					</Tbody>
				</Table>
			</TableContainer>
			<AlertDialog
				isOpen={isOpen}
				leastDestructiveRef={cancelRef}
				onClose={onClose}
			>
				<AlertDialogOverlay>
					<AlertDialogContent>
						<AlertDialogHeader
							fontSize="lg"
							fontWeight="bold"
						>
							Hapus Warga
						</AlertDialogHeader>

						<AlertDialogBody>
							Apakah anda yakin ingin menghapus data tersebut?
						</AlertDialogBody>

						<AlertDialogFooter>
							<Button
								ref={cancelRef}
								onClick={() => {
									onClose();
									setId(null);
								}}
							>
								Batal
							</Button>
							<Button
								colorScheme="red"
								onClick={async () => {
									await handleDelete();
									onClose();
								}}
								ml={3}
							>
								Hapus
							</Button>
						</AlertDialogFooter>
					</AlertDialogContent>
				</AlertDialogOverlay>
			</AlertDialog>
		</>
	);
};

export default DisplayDeleteWarga;
