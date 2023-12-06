import LayoutProvider from "@/provider/layout-provider";
import React from "react";

const VotingLayout = ({ children }: { children: React.ReactNode }) => {
	return <LayoutProvider>{children}</LayoutProvider>;
};

export default VotingLayout;
