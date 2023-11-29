import { useCheckAuth } from "@/hooks/useQueryHooks";
import { Heading } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const SecurityProvider = ({ children }: { children: React.ReactNode }) => {
	const router = useRouter();
	const { data, isError, error, isLoading } = useCheckAuth();
	useEffect(() => {
		if (isError) {
			router.replace("/auth/login");
		}
	}, [isError, router, isLoading]);
	return (
		<>{isLoading || isError ? <Heading>Loading ...</Heading> : children}</>
	);
};

export default SecurityProvider;
