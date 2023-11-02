import DisplayUpdateWarga from "@/components/display-update-warga";
import React from "react";
import { dataWarga } from "@/data/data";
import { Heading } from "@chakra-ui/react";
const EditWarga = () => {
	return (
		<div>
			<Heading
				as={"h4"}
				mb={"1rem"}
			>
				Edit Warga
			</Heading>

			{dataWarga.length === 0 ? (
				<Heading>Data warga kosong</Heading>
			) : (
				<DisplayUpdateWarga dataWarga={dataWarga} />
			)}
		</div>
	);
};

export default EditWarga;
