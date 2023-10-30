import { DataWargaType } from "@/data/data";
import {
	Table,
	Thead,
	Tbody,
	Tfoot,
	Tr,
	Th,
	Td,
	TableCaption,
	TableContainer,
} from "@chakra-ui/react";
import React from "react";

export type DisplayWargaProps = {
	dataWarga: DataWargaType[];
};
const DisplayWarga: React.FC<DisplayWargaProps> = ({ dataWarga }) => {
	return (
		<TableContainer>
			<Table variant="simple">
				<TableCaption>Data Statistik Warga RT 01</TableCaption>
				<Thead>
					<Tr>
						<Th>Nama</Th>
						<Th>NIK</Th>
						<Th>Email</Th>
					</Tr>
				</Thead>
				<Tbody>
					{dataWarga.map((el, index) => {
						return (
							<Tr key={index}>
								<Td>{el.nama}</Td>
								<Td>{el.nik}</Td>
								<Td>{el.email}</Td>
							</Tr>
						);
					})}
				</Tbody>
			</Table>
		</TableContainer>
	);
};

export default DisplayWarga;
