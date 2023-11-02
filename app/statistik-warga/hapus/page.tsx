import DisplayDeleteWarga from "@/components/display-delete-warga";
import React from "react";
import { dataWarga } from "@/data/data";
import { Heading } from "@chakra-ui/react";
const HapusWarga = () => {
	return (
		<div>
			<Heading
				as={"h4"}
				mb={"1rem"}
			>
				Hapus Warga
			</Heading>
			{dataWarga.length === 0 ? (
				<Heading>Data warga kosong</Heading>
			) : (
				<DisplayDeleteWarga dataWarga={dataWarga} />
			)}
			
		</div>
	);
};

export default HapusWarga;
