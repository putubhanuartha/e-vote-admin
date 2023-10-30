"use client";
import {
	FormControl,
	FormLabel,
} from "@chakra-ui/form-control";
import {
	Button,
	FormErrorMessage,
	Heading,
} from "@chakra-ui/react";
import { Input } from "@chakra-ui/input";
import { Box } from "@chakra-ui/layout";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
interface IFormInput {
	username: string;
	password: string;
}
const LoginPage = () => {
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<IFormInput>();
	const onSubmit: SubmitHandler<IFormInput> = (data) => console.log(data);
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
				textAlign={'center'}
				marginBottom={'1.5rem'}
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
