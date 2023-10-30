"use client";
import { CacheProvider } from "@chakra-ui/next-js";
import { ChakraProvider } from "@chakra-ui/react";
import { extendTheme } from "@chakra-ui/react";
import { ToastContainer } from "react-toastify";
const breakpoints = {
	base: "0px",
	sm: "320px",
	md: "768px",
	lg: "960px",
	xl: "1200px",
	"2xl": "1536px",
};

const theme = extendTheme({ breakpoints });

export function Providers({ children }: { children: React.ReactNode }) {
	return (
		<CacheProvider>
			<ChakraProvider theme={theme}>
				<ToastContainer
					position="top-center"
					autoClose={1000}
					hideProgressBar={false}
					newestOnTop={false}
					closeOnClick
					rtl={false}
					pauseOnFocusLoss
					draggable
					pauseOnHover
					theme="light"
				/>
				{children}
			</ChakraProvider>
		</CacheProvider>
	);
}
