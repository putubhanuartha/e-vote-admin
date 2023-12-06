"use client";

import { JenisPilihan } from "@/enums";
import { useFetchOneAdministrative } from "@/hooks/useQueryHooks";
import LayoutProvider from "@/provider/layout-provider";
import { AdministrativeType } from "@/types";
import { Card, CardBody, Heading, Stack, Text } from "@chakra-ui/react";
export default function Home() {
	const { data, isLoading } = useFetchOneAdministrative() as {
		data: AdministrativeType;
		isLoading: boolean;
	};

	return (
		<LayoutProvider>
			{isLoading && <Heading>Loading ...</Heading>}
			{data && (
				<>
					<Heading>
						Selamat Datang Admin{" "}
						<span className="uppercase">{data.jenisPilihan}</span>
					</Heading>
					<Stack
						direction={"row"}
						flexWrap={"wrap"}
						spacing={"1rem"}
					>
						<Card>
							{data.jenisPilihan === JenisPilihan.rt ? (
								<CardBody
									display={"flex"}
									flexDirection={"column"}
									alignItems={"center"}
								>
									<Heading size={"lg"}>RT</Heading>
									<Text
										fontWeight={"semibold"}
										size={"2xl"}
									>
										{data.rt}
									</Text>
								</CardBody>
							) : null}
						</Card>
						<Card>
							<CardBody>
								<Heading size={"lg"}>RW</Heading>
								<Text
									fontWeight={"semibold"}
									size={"2xl"}
								>
									{data.rw}
								</Text>
							</CardBody>
						</Card>
						<Card>
							<CardBody>
								<Heading size={"lg"}>Kecamatan</Heading>
								<Text
									fontWeight={"semibold"}
									size={"2xl"}
								>
									{data.kecamatan}
								</Text>
							</CardBody>
						</Card>
						<Card>
							<CardBody>
								<Heading size={"lg"}>Kelurahan</Heading>
								<Text
									fontWeight={"semibold"}
									size={"2xl"}
								>
									{data.kelurahan}
								</Text>
							</CardBody>
						</Card>
					</Stack>
				</>
			)}
		</LayoutProvider>
	);
}
