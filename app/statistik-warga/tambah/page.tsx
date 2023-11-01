"use client";
import React from "react";
import { toast } from "react-toastify";
import { DataWargaType } from "@/data/data";
import { SubmitHandler, useForm } from "react-hook-form";
import {
	Button,
	FormControl,
	FormErrorMessage,
	FormLabel,
	Heading,
	Input,
} from "@chakra-ui/react";
const TambahWarga = () => {
	const {
		handleSubmit,
		register,
		formState: { errors, isSubmitting },
	} = useForm<DataWargaType>();
	const onSubmit: SubmitHandler<DataWargaType> = (data) => {
		toast.success("Sukses menambahkan warga");
		console.log(data);
	};
	return (
		<div>
			<Heading as={'h4'} mb={'1rem'}>Tambah Warga</Heading>
			<form onSubmit={handleSubmit(onSubmit)}>
				<FormControl isInvalid={Boolean(errors.nama)}>
					<FormLabel htmlFor="nama">Nama Lengkap Warga</FormLabel>
					<Input
						{...register("nama", {
							required: "Harap masukkan nama lengkap warga",
						})}
					/>
					<FormErrorMessage>
						{errors.nama && errors.nama.message}
					</FormErrorMessage>
				</FormControl>
				<FormControl
					isInvalid={Boolean(errors.nik)}
					my={3}
				>
					<FormLabel htmlFor="nik">NIK</FormLabel>
					<Input
						{...register("nik", {
							required: "Harap masukkan NIK warga",
							maxLength: 16,
							minLength: 16,
						})}
					/>
					<FormErrorMessage>
						{errors.nik &&
							errors.nik.type === "maxLength" &&
							"Masukkan NIK sejumlah 16 karakter"}
						{errors.nik && errors.nik.type === "required" && errors.nik.message}
						{errors.nik &&
							errors.nik.type === "minLength" &&
							"Masukkan NIK sejumlah 16 karakter"}
					</FormErrorMessage>
				</FormControl>
				<FormControl
					isInvalid={Boolean(errors.email)}
					my={3}
				>
					<FormLabel htmlFor="email">Email</FormLabel>
					<Input
						{...register("email", {
							required: "Harap masukkan email warga",
							pattern: {
								value:
									/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
								message: "Alamat email tidak sesuai",
							},
						})}
					/>
					<FormErrorMessage>
						{errors.email && errors.email.message}
					</FormErrorMessage>
				</FormControl>
				<Button
					mt={4}
					colorScheme="teal"
					isLoading={isSubmitting}
					type="submit"
				>
					Submit
				</Button>
			</form>
		</div>
	);
};

export default TambahWarga;
