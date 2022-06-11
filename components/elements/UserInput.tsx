import { Input, useColorModeValue } from "@chakra-ui/react";
import React from "react";
import { UseFormRegister } from "react-hook-form";

interface UserInputProps {
	register: UseFormRegister<any>;
	name: string;
	type?: "text" | "number";
	placeholder?: string;
	isInvalid?: boolean;
	maxLength?: number;
}

const UserInput: React.FC<UserInputProps> = ({ register, name, type = "text", placeholder, isInvalid, maxLength }) => {
	const inputBorder = { border: `2px solid ${useColorModeValue("#616161", "#D9D9D9")}` };

	return (
		<Input
			{...register(name)}
			autoComplete="off"
			isInvalid={isInvalid}
			errorBorderColor="red.300"
			_active={inputBorder}
			_focus={inputBorder}
			maxLength={maxLength}
			p={1}
			placeholder={placeholder}
			variant="filled"
			size="sm"
			type={type}
		/>
	);
};

export default UserInput;
