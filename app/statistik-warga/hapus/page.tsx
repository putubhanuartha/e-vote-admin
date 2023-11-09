"use client";
import DisplayDeleteWarga from "@/components/display-delete-warga";
import React, { useState } from "react";
import { Heading } from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import deleteWarga from "@/helper/deleteWarga";
import { toast } from "react-toastify";
import { DataWargaResponseType } from "../page";
import { useFetchAllWarga } from "@/hooks/useQueryHooks";
const HapusWarga = () => {
	const queryClient = useQueryClient();
	const [id, setId] = useState<string | null>(null);
	const [keyword, setKeyword] = useState<string | undefined | null>(undefined);
	const { data, isLoading: isLoadingQuery } = useFetchAllWarga(keyword);
	const { mutateAsync } = useMutation({
		mutationFn: deleteWarga,
		onSuccess: () => {
			return queryClient.invalidateQueries({
				queryKey: ["statswarga", keyword],
			});
		},
	});
	const handleDelete = async () => {
		try {
			const res = await mutateAsync(id as string);
			toast.success("Data warga terhapus");
			console.log(res);
		} catch (error) {
			console.error(error);
		}
	};
	return (
		<div>
			<Heading
				as={"h4"}
				mb={"1rem"}
			>
				Hapus Warga
			</Heading>
			{isLoadingQuery && <Heading>Loading ...</Heading>}
			{data &&
				((data as DataWargaResponseType[]).length === 0 ? (
					<Heading>Data warga kosong</Heading>
				) : (
					<DisplayDeleteWarga
						dataWarga={data}
						id={id}
						setId={setId}
						handleDelete={handleDelete}
						setKeyword={setKeyword}
					/>
				))}
		</div>
	);
};

export default HapusWarga;
