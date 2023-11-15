"use client"
import DisplayUpdateWarga from "@/components/display-update-warga";
import React, { useState } from "react";
import { Heading } from "@chakra-ui/react";
import { useFetchAllWarga } from "@/hooks/useQueryHooks";
import { DataWargaResponseType } from "../page";

const EditWarga = () => {
	const [id, setId] = useState<string | null>(null);
	const [keyword, setKeyword] = useState<string | undefined | null>(undefined);
	const { data, isLoading: isLoadingQuery } = useFetchAllWarga(keyword);

	return (
		<div>
			<Heading
				as={"h4"}
				mb={"1rem"}
			>
				Edit Warga
			</Heading>

			{isLoadingQuery && <Heading>Loading ...</Heading>}
			{data &&
				((data as DataWargaResponseType[]).length === 0 ? (
					<Heading>Data warga kosong</Heading>
				) : (
					<DisplayUpdateWarga
						dataWarga={data}
						id={id}
						setId={setId}
						setKeyword={setKeyword}
						keyword={keyword}
					/>
				))}
		</div>
	);
};

export default EditWarga;
