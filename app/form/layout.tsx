import React from "react";
import LayoutProvider from "@/provider/layout-provider";
const FormLayout = ({ children }: { children: React.ReactNode }) => {
	return <LayoutProvider>{children}</LayoutProvider>;
};

export default FormLayout;
