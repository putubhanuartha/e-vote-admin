import React from "react";
import {
	Drawer,
	DrawerBody,
	DrawerFooter,
	DrawerHeader,
	DrawerOverlay,
	DrawerContent,
	DrawerCloseButton,
	Button,
} from "@chakra-ui/react";
import AccordionMenu from "./accordion-menu";
export type DrawerMenuType = {
	isOpen: boolean;
	onClose: () => void;
};
const DrawerMenu: React.FC<DrawerMenuType> = ({ isOpen, onClose }) => {
	const btnRef = React.useRef(null);
	return (
		<Drawer
			isOpen={isOpen}
			placement="right"
			onClose={onClose}
			finalFocusRef={btnRef}
		>
			<DrawerOverlay />
			<DrawerContent>
				<DrawerCloseButton />
				<DrawerHeader>E-Vote</DrawerHeader>

				<DrawerBody>
					<AccordionMenu />
				</DrawerBody>
			</DrawerContent>
		</Drawer>
	);
};

export default DrawerMenu;
