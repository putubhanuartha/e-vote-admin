import React from "react";
import LayoutProvider from "@/provider/layout-provider";
const StatistikWargaLayout = ({ children }: { children: React.ReactNode }) => {
	return <LayoutProvider>{children}</LayoutProvider>;
};

export default StatistikWargaLayout;
