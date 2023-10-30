import DisplayWarga from "@/components/display-warga";
import React from "react";
import { dataWarga } from "@/data/data";
import { Button, Input, Stack } from "@chakra-ui/react";
const StatistikWarga = () => {
	return (
		<div>
			<Stack direction={'row'}>
				<Input
					type="text"
					placeholder="Cari warga"
					mb={3}
				/>
                <Button type="button" variant={'solid'} colorScheme="blue">
                    Cari
                </Button>
			</Stack>
			<DisplayWarga dataWarga={dataWarga} />
		</div>
	);
};

export default StatistikWarga;
