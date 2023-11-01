import DisplayUpdateWarga from "@/components/display-update-warga";
import React from "react";
import { dataWarga } from "@/data/data";
import { Heading } from "@chakra-ui/react";
const EditWarga = () => {
	return (
		<div>
			<Heading as={'h4'} mb={'1rem'}>Edit Warga</Heading>
			<DisplayUpdateWarga dataWarga={dataWarga} />
		</div>
	);
};

export default EditWarga;
