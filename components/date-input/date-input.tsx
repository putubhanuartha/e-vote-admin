import React from "react";
import { Stack , Text} from "@chakra-ui/react";
import styles from "./date_input.module.css";
import {
	NumberInput,
	NumberInputField,
	NumberInputStepper,
	NumberIncrementStepper,
	NumberDecrementStepper,

} from "@chakra-ui/react";
const DateInput = () => {
	return (
		<Stack
			id={styles.date_input}
			direction={"row"}
		>
			<Text>hh:</Text>
			<NumberInput allowMouseWheel 
				size="xs"
				maxW={16}
				defaultValue={0}
				min={0}
				max={24}
			>
				<NumberInputField />
				<NumberInputStepper>
					<NumberIncrementStepper />
					<NumberDecrementStepper />
				</NumberInputStepper>
			</NumberInput>
			<Text>MM:</Text>
			<NumberInput allowMouseWheel
				onKeyDown={(e) => e.preventDefault()}
				size="xs"
				maxW={16}
				defaultValue={0}
				min={0}
				max={59}
			>
				<NumberInputField />
				<NumberInputStepper>
					<NumberIncrementStepper />
					<NumberDecrementStepper />
				</NumberInputStepper>
			</NumberInput>
		</Stack>
	);
};

export default DateInput;
