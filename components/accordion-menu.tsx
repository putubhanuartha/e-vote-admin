import React from "react";
import Link from "next/link";
import {
	Accordion,
	AccordionButton,
	AccordionIcon,
	AccordionItem,
	AccordionPanel,
	Box,
	Button,
	Heading,
	Stack,
} from "@chakra-ui/react";
const AccordionMenu = () => {
	return (
		<Accordion
			height={"100%"}
			display={"flex"}
			rowGap={"1rem"}
			paddingTop={"3rem"}
			flexDirection={"column"}
			allowToggle
		>
			<AccordionItem>
				<Link href={"/statistik-warga"}>
					<h2>
						<AccordionButton>
							<Box
								as="span"
								flex="1"
								textAlign="left"
							>
								Statistik Warga
							</Box>
							<AccordionIcon />
						</AccordionButton>
					</h2>
				</Link>
				<AccordionPanel
					pb={4}
					mt={3}
				>
					<Stack
						direction={"column"}
						spacing={4}
					>
						<Button
							colorScheme="teal"
							variant="solid"
						>
							<Link
								href={"/statistik-warga/tambah"}
								className="w-full"
							>
								Tambah Warga
							</Link>
						</Button>
						<Button
							colorScheme="red"
							variant="solid"
						>
							<Link
								href={"/statistik-warga/hapus"}
								className="w-full"
							>
								Hapus Warga
							</Link>
						</Button>
						<Button
							colorScheme="twitter"
							variant="ghost"
						>
							<Link
								href={"/statistik-warga/edit"}
								className="w-full"
							>
								Edit Warga
							</Link>
						</Button>
					</Stack>
				</AccordionPanel>
			</AccordionItem>

			<AccordionItem>
				<h2>
					<AccordionButton>
						<Box
							as="span"
							flex="1"
							textAlign="left"
						>
							Form Kuisioner
						</Box>
						<AccordionIcon />
					</AccordionButton>
				</h2>
				<AccordionPanel pb={4}>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
					eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
					minim veniam, quis nostrud exercitation ullamco laboris nisi ut
					aliquip ex ea commodo consequat.
				</AccordionPanel>
			</AccordionItem>
			<AccordionItem>
				<h2>
					<AccordionButton>
						<Box
							as="span"
							flex="1"
							textAlign="left"
						>
							Vote RT/RW
						</Box>
						<AccordionIcon />
					</AccordionButton>
				</h2>
				<AccordionPanel pb={4}>
					<Stack
						direction={"column"}
						spacing={4}
						mt={3}
					>
						<Button
							colorScheme="purple"
							variant="solid"
							color={"white"}
						>
							<Link
								href={"/voting-warga/voting"}
								className="w-full"
							>
								Voting
							</Link>
						</Button>
						<Button
							colorScheme="teal"
							variant="solid"
						>
							<Link
								href={"/voting-warga/hasil-voting"}
								className="w-full"
							>
								Hasil Voting
							</Link>
						</Button>
					</Stack>
				</AccordionPanel>
			</AccordionItem>
		</Accordion>
	);
};

export default AccordionMenu;
