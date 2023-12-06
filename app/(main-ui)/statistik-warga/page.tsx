"use client";
import DisplayWarga from "@/components/display-warga";
import React, { useState } from "react";
import { Button, Heading, Input, Stack } from "@chakra-ui/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useFetchAllWarga } from "@/hooks/useQueryHooks";
import { DataWargaResponseType } from "./statistik.type";

const StatistikWarga = () => {
	const { register, handleSubmit } = useForm<{ keywords: string }>();
	const [keyword, setKeyword] = useState<string | undefined>(undefined);
	const { data, isLoading: isLoadingQuery } = useFetchAllWarga(keyword);
	const onSubmit: SubmitHandler<{ keywords: string }> = (data) => {
		setKeyword(data.keywords);
	};
	return (
		<div>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Stack direction={"row"}>
					<Input
						{...register("keywords")}
						type="text"
						placeholder="Cari warga"
						mb={3}
					/>
					<Button
						disabled={isLoadingQuery}
						type="submit"
						variant={"solid"}
						colorScheme="blue"
					>
						Cari
					</Button>
				</Stack>
			</form>
			{isLoadingQuery && <Heading>Loading data ...</Heading>}
			{data &&
				((data as DataWargaResponseType[]).length === 0 ? (
					<Heading>Data warga kosong</Heading>
				) : (
					<DisplayWarga dataWarga={data as DataWargaResponseType[]} />
				))}
		</div>
	);
};

export default StatistikWarga;
