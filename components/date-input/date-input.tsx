import React, { useEffect, useState } from "react";
import { Stack, Text } from "@chakra-ui/react";
import styles from "./date_input.module.css";
import {
	NumberInput,
	NumberInputField,
	NumberInputStepper,
	NumberIncrementStepper,
	NumberDecrementStepper,
} from "@chakra-ui/react";
import { timeDigitConverter } from "@/helper/timeConverters";
type DateInputProps = {
	time: string;
	setTime: React.Dispatch<React.SetStateAction<string>>;
	defaultFirstDigit: null | number | undefined;
	defaultSecondDigit: null | number | undefined;
};
const DateInput: React.FC<DateInputProps> = ({
	setTime,
	time,
	defaultFirstDigit,
	defaultSecondDigit,
}) => {
	const [firstDigit, setFirstdigit] = useState<number>(
		defaultFirstDigit ? defaultFirstDigit : 0
	);
	const [secondDigit, setSecondDigit] = useState<number>(
		defaultSecondDigit ? defaultSecondDigit : 0
	);
	useEffect(() => {
		setTime(timeDigitConverter(firstDigit, secondDigit));
	}, [firstDigit, secondDigit, setTime]);
	return (
		<Stack
			id={styles.date_input}
			direction={"row"}
		>
			<Text>hh:</Text>
			<NumberInput
				onChange={(el) => {
					setFirstdigit(Number(el));
				}}
				allowMouseWheel
				size="xs"
				maxW={16}
				defaultValue={firstDigit}
				min={0}
				max={23}
			>
				<NumberInputField />
				<NumberInputStepper>
					<NumberIncrementStepper />
					<NumberDecrementStepper />
				</NumberInputStepper>
			</NumberInput>
			<Text>MM:</Text>
			<NumberInput
				allowMouseWheel
				onChange={(el) => {
					setSecondDigit(Number(el));
				}}
				onKeyDown={(e) => e.preventDefault()}
				size="xs"
				maxW={16}
				defaultValue={secondDigit}
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
