"use client";
import { useFetchOneForm } from "@/hooks/useQueryHooks";
import { Heading } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { DataFormResponseType } from "../../page";
import { DynamicFormType } from "@/types";
import FormGenerator from "../../(components)/form-generator";
const isUpdate = true;
const EditForm = ({ params }: { params: { id: string } }) => {
	const [parseData, setParseData] = useState<DynamicFormType[] | undefined>(
		undefined
	);
	const { id } = params;
	const {
		data: dataForm,
		isLoading,
		isError,
	} = useFetchOneForm(id) as {
		data: DataFormResponseType;
		isLoading: boolean;
		isError: boolean;
	};
	useEffect(() => {
		if (dataForm) {
			setParseData(JSON.parse(dataForm.contentForm));
		}
	}, [dataForm]);

	return (
		<>
			{isLoading && <Heading>Loading ...</Heading>}
			{dataForm && !isError && parseData && (
				<FormGenerator
					isUpdate={isUpdate}
					titleKuisioner={dataForm.titleForm}
					dataResponse={parseData}
					id={id}
				/>
			)}
		</>
	);
};

export default EditForm;
