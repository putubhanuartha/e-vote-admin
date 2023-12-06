"use client"
import { InputFormType } from "@/enums";
import { DynamicFormType } from "@/types";
import { AddIcon, DeleteIcon } from "@chakra-ui/icons";
import {
	Button,
	Flex,
	IconButton,
	Select,
	Spacer,
	Textarea,
} from "@chakra-ui/react";
import { FormControl, Input, Stack } from "@chakra-ui/react";
import React from "react";

export type DynamicFormProps = DynamicFormType & {
	index: number;
	removeFormField: (index: number) => void;
	handleReplaceFormField: (type: InputFormType, index: number) => void;
	handleChangeFormField: (newobj: DynamicFormType, index: number) => void;
	length: number;
};
const DynamicForm: React.FC<DynamicFormProps> = ({
	title,
	type,
	option,
	index,
	id,
	removeFormField,
	handleReplaceFormField,
	handleChangeFormField,
	length,
}) => {
	const handleMoreOption = () => {
		if (option) {
			const newOption = [...option];
			newOption.push(`Opsi ${option.length + 1}`);
			handleChangeFormField(
				{
					id,
					title,
					type,
					option: newOption,
				},
				index
			);
		}
	};
	const handleChangeValueOption = (indexOption: number, newValue: string) => {
		if (option) {
			const newOption = [...option];
			newOption[indexOption] = newValue;
			handleChangeFormField(
				{
					id,
					title,
					type,
					option: newOption,
				},
				index
			);
		}
	};
	const handleDeleteOption = (indexOption: number) => {
		if (option) {
			const newOption = [...option];
			newOption.splice(indexOption, 1);
			handleChangeFormField(
				{
					id,
					title,
					type,
					option: newOption,
				},
				index
			);
		}
	};
	return (
		<Stack>
			<FormControl
				display={"flex"}
				flexDirection={"column"}
				rowGap={2}
			>
				<Stack
					direction={"row"}
					flexWrap={"wrap"}
				>
					<Input
						flex={1}
						id={title}
						name={title}
						defaultValue={title}
						onChange={(el) => {
							handleChangeFormField(
								{
									type,
									title: el.currentTarget.value,
									id,
									option: option,
								},
								index
							);
						}}
					/>
					<Select
						flex={1}
						placeholder="Pilih jenis field"
						defaultValue={type}
						onChange={(el) =>
							handleReplaceFormField(
								el.currentTarget.value as InputFormType,
								index
							)
						}
					>
						{Object.keys(InputFormType).map((el) => {
							return (
								<option
									key={el}
									value={el}
									defaultChecked={type === el}
								>
									{InputFormType[el as InputFormType]}
								</option>
							);
						})}
					</Select>
					{length > 1 && (
						<IconButton
							onClick={() => removeFormField(index)}
							flex={0}
							aria-label="delete field"
							icon={<DeleteIcon />}
						/>
					)}
				</Stack>
				{type === InputFormType.text && <Input />}
				{type === InputFormType.textarea && <Textarea />}
				{type === InputFormType.checkbox && option && (
					<Flex
						flexDir={"column"}
						rowGap={1}
					>
						<Stack direction={["column"]}>
							{option.map((el, indexOption) => (
								<Stack
									direction={"row"}
									key={el}
									columnGap={5}
								>
									<Input
										flex={1}
										onBlur={(el) => {
											handleChangeValueOption(
												indexOption,
												el.currentTarget.value
											);
										}}
										defaultValue={el}
									/>
									{option.length > 1 && (
										<IconButton
											onClick={() => handleDeleteOption(indexOption)}
											flex={0}
											size={"md"}
											aria-label="delete option"
											icon={<DeleteIcon />}
										/>
									)}
									<Spacer flex={2} />
								</Stack>
							))}
						</Stack>
						<Button
							onClick={handleMoreOption}
							size={"sm"}
							aria-label="add option"
							leftIcon={<AddIcon />}
							w={"fit-content"}
						>
							More option
						</Button>
					</Flex>
				)}
				{type === InputFormType.radio && option && (
					<Flex
						flexDir={"column"}
						rowGap={1}
					>
						<Stack direction="column">
							{option.map((el, indexOption) => {
								return (
									<Stack
										direction={"row"}
										key={el}
										columnGap={5}
									>
										<Input
											flex={1}
											defaultValue={el}
											onBlur={(el) => {
												handleChangeValueOption(
													indexOption,
													el.currentTarget.value
												);
											}}
										/>
										{option.length > 1 && (
											<IconButton
												onClick={() => handleDeleteOption(indexOption)}
												flex={0}
												size={"md"}
												aria-label="delete option"
												icon={<DeleteIcon />}
											/>
										)}
										<Spacer flex={2} />
									</Stack>
								);
							})}
						</Stack>
						<Button
							onClick={handleMoreOption}
							size={"sm"}
							aria-label="add option"
							leftIcon={<AddIcon />}
							w={"fit-content"}
						>
							More option
						</Button>
					</Flex>
				)}
			</FormControl>
		</Stack>
	);
};

export default DynamicForm;
