"use client";
import { AddIcon } from "@chakra-ui/icons";
import { Flex, Grid, GridItem, Heading, IconButton } from "@chakra-ui/react";
import React from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { StatusFormFilling } from "@/enums";
import CardForm from "./(components)/card-form";
import { useFetchAllForms } from "@/hooks/useQueryHooks";
export type DataFormResponseType = {
	id: string;
	titleForm: string;
	status: StatusFormFilling;
	createdAt: Date;
	contentForm: string;
};
const FormPage = () => {
	const router = useRouter();
	const {
		data: dataForm,
		isError,
		isLoading,
	} = useFetchAllForms() as {
		data: DataFormResponseType[];
		isError: boolean;
		isLoading: boolean;
	};
	return (
		<>
			{isLoading ? (
				<Heading>Loading ....</Heading>
			) : (
				<Grid
					templateColumns={{
						base: "repeat(1, 1fr)",
						md: "repeat(3, 1fr)",
						lg: "repeat(4, 1fr)",
					}}
					gap={6}
				>
					<GridItem
						w="100%"
						h="28"
					>
						<IconButton
							onClick={() => router.push("/form/list-form/create")}
							w={"100%"}
							h={"100%"}
							size={"lg"}
							aria-label="add more form"
							icon={<AddIcon />}
							colorScheme="linkedin"
						/>
					</GridItem>
					{dataForm && !isError
						? dataForm.map((el) => {
								return (
									<GridItem
										key={el.id}
										w="100%"
										h="28"
									>
										<CardForm
											createdAt={el.createdAt}
											status={el.status}
											title={el.titleForm}
											key={el.id}
											id={el.id}
										/>
									</GridItem>
								);
						  })
						: null}
				</Grid>
			)}
		</>
	);
};

export default FormPage;
