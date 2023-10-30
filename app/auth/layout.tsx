import { Box } from "@chakra-ui/react";
import React from "react";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
	return <Box backgroundColor={['gray.100']} minH={"100vh"} display={'flex'} alignItems={'center'} justifyContent={'center'}>{children}</Box>;
};

export default AuthLayout;
