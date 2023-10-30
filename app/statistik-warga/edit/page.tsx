import DisplayUpdateWarga from "@/components/display-update-warga";
import React from "react";
import { dataWarga } from "@/data/data";
const EditWarga = () => {
	return (
		<div>
			<DisplayUpdateWarga dataWarga={dataWarga} />
		</div>
	);
};

export default EditWarga;
