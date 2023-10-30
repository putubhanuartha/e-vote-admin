"use client";
import React, { useState } from "react";
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
export type DisplayUpdateWargaProps = {
	dataWarga: DataWargaType[];
};
const DisplayUpdateWarga: React.FC<DisplayUpdateWargaProps> = ({
	dataWarga,
}) => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [selectedId, setSelectedId] = useState<string>("");

	const initialRef = React.useRef(null);
	const finalRef = React.useRef(null);
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
											onClick={() => {
												onOpen();
												setSelectedId(el.id);
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
					<ModalBody pb={6}>
						<FormControl>
							<FormLabel>NIK</FormLabel>
							<Input
								isDisabled
								ref={initialRef}
								defaultValue={dataWarga.find((el) => el.id === selectedId)?.nik}
							/>
						</FormControl>

						<FormControl mt={4}>
							<FormLabel>Nama</FormLabel>
							<Input placeholder="Nama baru" defaultValue={dataWarga.find((el) => el.id === selectedId)?.nama}/>
						</FormControl>
					</ModalBody>

					<ModalFooter>
						<Button
							colorScheme="blue"
							mr={3}
						>
							Save
						</Button>
						<Button onClick={onClose}>Cancel</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
};

export default DisplayUpdateWarga;
