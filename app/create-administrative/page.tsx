"use client";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Button, FormErrorMessage, Heading, Select } from "@chakra-ui/react";
import { Input } from "@chakra-ui/input";
import { Box } from "@chakra-ui/layout";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import addAdmin from "@/helper/addAdmin";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { JenisPilihan } from "@/enums";
import addAdministrativeData from "@/helper/addAdministrativeData";
interface IFormInput {
	kecamatan: string;
	kelurahan: string;
	rt?: number;
	rw: number;
	jenisPilihan: JenisPilihan;
}
const SignupPage = () => {
	const router = useRouter();
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
		watch,
	} = useForm<IFormInput>({ defaultValues: { jenisPilihan: JenisPilihan.rw } });
	const { mutateAsync: addAsyncAdministrativeData } = useMutation({
		mutationFn: addAdministrativeData,
	});
	const onSubmit: SubmitHandler<IFormInput> = async (data) => {
		try {
			const response = await addAsyncAdministrativeData({
				jenisPilihan: data.jenisPilihan,
				kecamatan: data.kecamatan,
				kelurahan: data.kelurahan,
				rw: data.rw,
				rt: data.rt,
			});
			console.log(response);
			toast.success("sukses menambahkan data wilayah");
			router.replace("/");
		} catch (err) {
			console.error(err);
			toast.error("Gagal mengisi data administrasi");
		}
	};
	const jenisPilihan = watch("jenisPilihan");
	return (
		<Box
			width={"100%"}
			maxW={"2xl"}
			paddingX={["1rem"]}
			paddingY={"1.5rem"}
			backgroundColor={"#fff"}
			rounded={"lg"}
		>
			<Heading
				as={"h4"}
				size={["lg", "xl"]}
				textAlign={"center"}
				marginBottom={"1.5rem"}
			>
				Pengisian Wilayah Administratif
			</Heading>

			<form
				className="flex flex-col gap-y-4 mt-4"
				onSubmit={handleSubmit(onSubmit)}
			>
				<FormControl>
					<FormLabel htmlFor="jenisPilihan">Jenis Wilayah (RT/RW)</FormLabel>
					<Select
						className="uppercase"
						id="jenisPilihan"
						{...register("jenisPilihan", { required: "Pilih jenis wilayah" })}
					>
						{Object.values(JenisPilihan).map((el) => {
							return (
								<option
									key={el}
									value={el}
									className="uppercase"
								>
									{el}
								</option>
							);
						})}
					</Select>
				</FormControl>
				<FormControl isInvalid={Boolean(errors.kecamatan)}>
					<FormLabel htmlFor="kecamatan">Kecamatan</FormLabel>
					<Input
						id="kecamatan"
						{...register("kecamatan", { required: "Isi kecamatan anda" })}
						type="text"
					/>
					{errors.kecamatan && (
						<FormErrorMessage>{errors.kecamatan.message}</FormErrorMessage>
					)}
				</FormControl>
				<FormControl isInvalid={Boolean(errors.kelurahan)}>
					<FormLabel htmlFor="kelurahan">Kelurahan</FormLabel>
					<Input
						id="kelurahan"
						{...register("kelurahan", { required: "Isi kelurahan anda" })}
						type="text"
					/>
					{errors.kelurahan && (
						<FormErrorMessage>{errors.kelurahan.message}</FormErrorMessage>
					)}
				</FormControl>
				<FormControl isInvalid={Boolean(errors.rw)}>
					<FormLabel htmlFor="rw">RW</FormLabel>
					<Input
						id="rw"
						{...register("rw", { required: "Isi rw anda" })}
						type="number"
					/>
					{errors.rw && (
						<FormErrorMessage>{errors.rw.message}</FormErrorMessage>
					)}
				</FormControl>
				{jenisPilihan === JenisPilihan.rt && (
					<FormControl isInvalid={Boolean(errors.rt)}>
						<FormLabel htmlFor="rt">RT</FormLabel>
						<Input
							id="rt"
							{...register("rt", { required: "Isi rt anda" })}
							type="number"
						/>
						{errors.rt && (
							<FormErrorMessage>{errors.rt.message}</FormErrorMessage>
						)}
					</FormControl>
				)}

				<Button
					mt={4}
					colorScheme="teal"
					isLoading={isSubmitting}
					type="submit"
					variant={"solid"}
				>
					Buat Wilayah
				</Button>
			</form>
		</Box>
	);
};

export default SignupPage;
