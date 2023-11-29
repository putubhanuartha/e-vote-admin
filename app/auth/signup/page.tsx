"use client";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Button, FormErrorMessage, Heading } from "@chakra-ui/react";
import { Input } from "@chakra-ui/input";
import { Box } from "@chakra-ui/layout";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import addAdmin from "@/helper/addAdmin";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
interface IFormInput {
	username: string;
	password: string;
	confirmPassword: string;
}
const SignupPage = () => {
	const router = useRouter();
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
		watch,
	} = useForm<IFormInput>();
	const { mutateAsync: signUpAsync } = useMutation({ mutationFn: addAdmin });
	const onSubmit: SubmitHandler<IFormInput> = async (data) => {
		try {
			const response = await signUpAsync({
				password: data.password,
				username: data.username,
			});
			console.log(response);
			toast.success("Admin sukses terdaftar");
			router.push("/auth/login");
		} catch (err) {
			console.error(err);
			toast.error("Error signing up");
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
				Signup Admin
			</Heading>

			<form
				className="flex flex-col gap-y-4"
				onSubmit={handleSubmit(onSubmit)}
			>
				<FormControl isInvalid={Boolean(errors.username)}>
					<FormLabel htmlFor="username">Admin Username</FormLabel>
					<Input
						id="username"
						{...register("username", { required: "Username is required" })}
						type="text"
					/>
					{errors.username && (
						<FormErrorMessage>{errors.username.message}</FormErrorMessage>
					)}
				</FormControl>
				<FormControl isInvalid={Boolean(errors.password)}>
					<FormLabel htmlFor="password">Password</FormLabel>
					<Input
						id="password"
						{...register("password", { required: "Password is required" })}
						type="password"
					/>
					{errors.password && (
						<FormErrorMessage>{errors.password.message}</FormErrorMessage>
					)}
				</FormControl>
				<FormControl isInvalid={Boolean(errors.confirmPassword)}>
					<FormLabel htmlFor="confirmPassword">Re-type Password</FormLabel>
					<Input
						id="confirmPassword"
						{...register("confirmPassword", {
							required: "Re-type your password",
							validate: (val: string) => {
								if (watch("password") !== val) {
									return "Your password is mismatch";
								}
							},
						})}
						type="password"
					/>
					{errors.confirmPassword && (
						<FormErrorMessage>
							{errors.confirmPassword.message}
						</FormErrorMessage>
					)}
				</FormControl>
				<Button
					mt={4}
					colorScheme="teal"
					isLoading={isSubmitting}
					type="submit"
					variant={"solid"}
				>
					Signup
				</Button>
			</form>
		</Box>
	);
};

export default SignupPage;
