"use client";
import React, { useRef } from "react";
import { DataWargaType } from "@/data/data";
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
import { toast } from "react-toastify";
export type DisplayDeleteWarga = {
	dataWarga: DataWargaType[];
};
const DisplayDeleteWarga: React.FC<DisplayDeleteWarga> = ({ dataWarga }) => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const cancelRef = useRef(null);
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
							<Th>Action</Th>
						</Tr>
					</Thead>
					<Tbody>
						{dataWarga.map((el, index) => {
							return (
								<Tr key={index}>
									<Td>{el.nama}</Td>
									<Td>{el.nik}</Td>
									<Td>
										<IconButton
											onClick={onOpen}
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
								onClick={onClose}
							>
								Batal
							</Button>
							<Button
								colorScheme="red"
								onClick={() => {
									onClose();
									toast.success("Data warga terhapus");
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
