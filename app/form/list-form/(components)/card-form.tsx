import { axiosMainServerCredentials } from "@/config/axios.config";
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
import axios from "axios";
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
	const downloadFile = async (id : string) => {
		try {
			const response = await axios({
				method: "GET",
				url: `${process.env.NEXT_PUBLIC_MAIN_SERVER_URL}/admin/download-form?id=${id}`,
				responseType: "blob", // This is important for downloading binary files
				withCredentials: true, // Set this if you are sending credentials
			});

			// Create a link element and trigger a click to download the file

			const contentDisposition = response.headers['content-disposition'];
			const filenameMatch = contentDisposition && contentDisposition.match(/filename="(.+)"$/);
		
			console.log(contentDisposition)
			// Use the extracted filename or a default if not found
			const filename = filenameMatch ? filenameMatch[1] : 'output.xlsx';

			console.log(filenameMatch)

			const url = window.URL.createObjectURL(new Blob([response.data]));
			const link = document.createElement("a");
			link.href = url;
			link.setAttribute("download", filename);
			document.body.appendChild(link);
			link.click();
			document.body.removeChild(link);
		} catch (error) {
			console.error("Error downloading file:", error);
			// Handle error, show a message, etc.
		}
	};
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
						onClick={() => {
							downloadFile(id);
						}}
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
