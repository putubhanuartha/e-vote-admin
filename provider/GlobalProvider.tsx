"use client";
import React from "react";
import { ThemeProvider } from "@material-tailwind/react";
const GlobalProvider = ({ children }: { children: React.ReactNode }) => {
	return <ThemeProvider>{children}</ThemeProvider>;
};

export default GlobalProvider;
