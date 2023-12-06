"use client";
import {
	Box,
	Button,
	FormControl,
	FormErrorMessage,
	FormLabel,
	Input,
	Stack,
} from "@chakra-ui/react";
import { v4 as uuidv4 } from "uuid";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { AddIcon } from "@chakra-ui/icons";
import DynamicForm from "./dynamic-form";
import { DynamicFormType } from "@/types";
import {
	defaultText,
	defaultCheckbox,
	defaultTextarea,
} from "../../(data)/dataForm";
import { InputFormType } from "@/enums";
import { defaultSelect } from "../../(data)/dataForm";
import { toast } from "react-toastify";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import addNewForm from "@/helper/addNewForm";
import { useRouter } from "next/navigation";
import editForm from "@/helper/editForm";
export type FormGeneratorType = {
	titleKuisioner?: string;
};

const dummyData: DynamicFormType[] = [
	{ ...defaultText, id: defaultText.id + uuidv4().toString() },
];

export type FormGeneratorPropsType = FormGeneratorType & {
	isUpdate: boolean;
	id?: string;
	dataResponse?: DynamicFormType[];
};
const FormGenerator: React.FC<FormGeneratorPropsType> = ({
	isUpdate,
	id,
	dataResponse,
	titleKuisioner,
}) => {
	const [data, setData] = useState(dataResponse ? dataResponse : dummyData);
	const queryClient = useQueryClient();
	const router = useRouter();

	const handleChangeFormField = (newObj: DynamicFormType, index: number) => {
		const newData = [...data];
		newData[index] = newObj;
		setData(newData);
	};
	const handlePushNewField = () => {
		const newData = [...data];
		newData.push({ ...defaultText, id: defaultText.id + uuidv4().toString() });
		setData(newData);
	};

	const removeFormField = (index: number) => {
		const newData = [...data];
		newData.splice(index, 1);
		setData(newData);
	};

	const handleReplaceFormField = (type: InputFormType, index: number) => {
		const newData = [...data];
		switch (type) {
			case InputFormType.checkbox:
				newData[index] = {
					...defaultCheckbox,
					title: newData[index].title,
					option: newData[index].option
						? newData[index].option
						: defaultCheckbox.option,
					id: defaultCheckbox.id + uuidv4().toString(),
				};
				break;
			case InputFormType.textarea:
				newData[index] = {
					...defaultTextarea,
					title: newData[index].title,
					id: defaultTextarea.id + uuidv4().toString(),
				};
				break;
			case InputFormType.radio:
				newData[index] = {
					...defaultSelect,
					title: newData[index].title,
					id: defaultSelect.id + uuidv4().toString(),
					option: newData[index].option
						? newData[index].option
						: defaultSelect.option,
				};
				break;
			default:
				newData[index] = {
					...defaultText,
					title: newData[index].title,
					id: defaultText.id + uuidv4().toString(),
				};
				break;
		}
		setData(newData);
	};

	const { mutateAsync: postFormAsync } = useMutation({
		mutationFn: addNewForm,
		onSuccess: () => queryClient.invalidateQueries({ queryKey: ["form"] }),
	});

	const { mutateAsync: editFormAsync } = useMutation({
		mutationFn: editForm,
		onSuccess: () => queryClient.invalidateQueries({ queryKey: ["form"] }),
	});
	const {
		register,
		handleSubmit,
		reset,
		formState: { isLoading, errors },
	} = useForm<FormGeneratorType>();
	const onSubmit: SubmitHandler<FormGeneratorType> = async (dataForm) => {
		if (data.length > 0) {
			try {
				if (isUpdate) {
					const resUpdate = await editFormAsync({
						id: id as string,
						titleForm: dataForm.titleKuisioner as string,
						contentForm: JSON.stringify(data),
					});
					console.log(resUpdate);
					toast.success("Field form berhasil diupdate");
					reset();
				} else {
					const res = await postFormAsync({
						contentForm: JSON.stringify(data),
						titleForm: dataForm.titleKuisioner as string,
					});
					console.log(res);
					reset();
					toast.success("Field berhasil disimpan");
				}
				router.back();
			} catch (err) {
				console.error(err);
				toast.error("Failed data mutation");
			}
		} else {
			toast.error("Field form tidak boleh kosong");
		}
	};

	return (
		<Box>
			<form onSubmit={handleSubmit(onSubmit)}>
				<FormControl isInvalid={Boolean(errors.titleKuisioner)}>
					<FormLabel htmlFor="titleKuisioner">
						Masukkan judul kuisioner / form
					</FormLabel>
					<Input
						defaultValue={titleKuisioner}
						id="titleKuisioner"
						{...register("titleKuisioner", { required: "Isi judul kuisioner" })}
						placeholder="Judul kuisioner"
					/>
					<FormErrorMessage>
						{errors.titleKuisioner && errors.titleKuisioner.message}
					</FormErrorMessage>
				</FormControl>
				<Stack
					mt={"1.5rem"}
					direction={"column"}
					spacing={"16"}
				>
					{data.map((el, index) => {
						return (
							<DynamicForm
								handleChangeFormField={handleChangeFormField}
								length={data.length}
								handleReplaceFormField={handleReplaceFormField}
								removeFormField={removeFormField}
								id={el.id}
								index={index}
								title={el.title}
								type={el.type}
								key={el.id}
								option={el.option}
							/>
						);
					})}
				</Stack>
				<Stack
					direction={{ base: "column", md: "row" }}
					mt={"1rem"}
				>
					<Button
						onClick={handlePushNewField}
						leftIcon={<AddIcon />}
						colorScheme="linkedin"
					>
						Tambah Field
					</Button>
					<Button
						colorScheme="linkedin"
						type="submit"
					>
						Simpan Form
					</Button>
				</Stack>
			</form>
		</Box>
	);
};

export default FormGenerator;
