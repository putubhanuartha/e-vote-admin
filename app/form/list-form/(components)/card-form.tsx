import { StatusFormFilling } from "@/enums";
import deleteForm from "@/helper/deleteForm";
import editStatusForm from "@/helper/editStatusForm";
import { DeleteIcon, DownloadIcon, EditIcon } from "@chakra-ui/icons";
import {
	ButtonGroup,
	Icon,
	IconButton,
	Select,
	Stack,
	Text,
} from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "react-toastify";

export type CardFormProps = {
	title: string;
	createdAt: Date;
	status: StatusFormFilling;
	id: string;
};
const readyStatus = [StatusFormFilling.ready, StatusFormFilling.active];
const activeStatus = [StatusFormFilling.active, StatusFormFilling.done];
const doneStatus = [StatusFormFilling.done];
const CardForm: React.FC<CardFormProps> = ({
	createdAt,
	status,
	title,
	id,
}) => {
	const router = useRouter();
	const queryClient = useQueryClient();
	const { mutateAsync: changeStatusAsync } = useMutation({
		mutationFn: editStatusForm,
		onSuccess: () => queryClient.invalidateQueries({ queryKey: ["form"] }),
	});
	const { mutateAsync: deleteFormAsync } = useMutation({
		mutationFn: deleteForm,
		onSuccess: () => queryClient.invalidateQueries({ queryKey: ["form"] }),
	});
	return (
		<Stack
			p={"0.5rem"}
			rounded={"lg"}
			shadow={"md"}
			w={"100%"}
			h={"100%"}
			direction={"column"}
			spacing={"2"}
		>
			<Select
				onChange={async (el) => {
					try {
						const response = await changeStatusAsync({
							id,
							status: el.currentTarget.value as StatusFormFilling,
						});
						console.log(response);
						toast.success("status berhasil diubah");
					} catch (err) {
						console.error(err);
						toast.error("error updating data");
					}
				}}
				size={"sm"}
			>
				{status === StatusFormFilling.ready &&
					readyStatus.map((el) => (
						<option
							key={el}
							value={el}
						>
							{el}
						</option>
					))}
				{status === StatusFormFilling.active &&
					activeStatus.map((el) => (
						<option
							key={el}
							value={el}
						>
							{el}
						</option>
					))}
				{status === StatusFormFilling.done &&
					doneStatus.map((el) => (
						<option
							key={el}
							value={el}
						>
							{el}
						</option>
					))}
			</Select>
			<Stack
				direction={"row"}
				justifyContent={"space-between"}
			>
				<Text
					fontSize={"sm"}
					fontWeight={"semibold"}
					maxH={"2.5rem"}
					overflowY={"clip"}
				>
					{title}
				</Text>
				{status === StatusFormFilling.ready && (
					<ButtonGroup>
						<IconButton
							onClick={() => router.push(`/form/list-form/edit/${id}`)}
							size={"xs"}
							aria-label="edit"
							icon={<EditIcon />}
						/>
						<IconButton
							onClick={() => {
								deleteFormAsync(id);
							}}
							size={"xs"}
							aria-label="delete"
							icon={<DeleteIcon />}
						/>
					</ButtonGroup>
				)}
				{status === StatusFormFilling.done && (
					<IconButton
						size={"xs"}
						aria-label="download"
						icon={<DownloadIcon />}
					/>
				)}
			</Stack>
			<Text fontSize={"xs"}>{new Date(createdAt).toLocaleString()}</Text>
		</Stack>
	);
};

export default CardForm;
