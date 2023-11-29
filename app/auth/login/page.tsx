"use client";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Button, FormErrorMessage, Heading } from "@chakra-ui/react";
import { Input } from "@chakra-ui/input";
import { Box } from "@chakra-ui/layout";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import loginAdmin from "@/helper/loginAdmin";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
interface IFormInput {
	username: string;
	password: string;
}
const LoginPage = () => {
	const router = useRouter();
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<IFormInput>();
	const { mutateAsync: loginAsync } = useMutation({ mutationFn: loginAdmin });
	const onSubmit: SubmitHandler<IFormInput> = async (data) => {
		try {
			const response = await loginAsync({
				password: data.password,
				username: data.username,
			});
			console.log(response);
			toast.success("Anda berhasil login");
			router.push("/");
		} catch (err) {
			console.error(err);
			toast.error("Error login");
		}
	};
	return (
		<Box
			width={"100%"}
			maxW={["28rem"]}
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
				Login Admin
			</Heading>

			<form
				className="flex flex-col gap-y-4"
				onSubmit={handleSubmit(onSubmit)}
			>
				<FormControl isInvalid={Boolean(errors.username)}>
					<FormLabel>Admin Username</FormLabel>
					<Input
						{...register("username", { required: "This field is required" })}
						type="text"
					/>
					{errors.username && (
						<FormErrorMessage>{errors.username.message}</FormErrorMessage>
					)}
				</FormControl>
				<FormControl isInvalid={Boolean(errors.password)}>
					<FormLabel>Password</FormLabel>
					<Input
						{...register("password", { required: "Password is required" })}
						type="password"
					/>
					{errors.password && (
						<FormErrorMessage>{errors.password.message}</FormErrorMessage>
					)}
				</FormControl>
				<Button
					mt={4}
					colorScheme="teal"
					isLoading={isSubmitting}
					type="submit"
					variant={"solid"}
				>
					Login
				</Button>
			</form>
		</Box>
	);
};

export default LoginPage;
