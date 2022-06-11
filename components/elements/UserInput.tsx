import { Button, Input, useColorModeValue } from "@chakra-ui/react";
import React, { MouseEventHandler } from "react";
import { UseFormRegister } from "react-hook-form";

interface UserInputProps {
	register: UseFormRegister<any>;
	name: string;
	type?: "text" | "number";
	placeholder?: string;
	errorType?: string;
}

const UserInput: React.FC<UserInputProps> = ({ register, name, type = "text", placeholder, errorType }) => {
	const inputBorder = { border: `2px solid ${useColorModeValue("#616161", "#D9D9D9")}` };
	return (
		<Input
			{...register(name, {
				required: "This is required",
				minLength: { value: 1, message: "Minimum length should be 1" },
			})}
			autoComplete="off"
			isInvalid={errorType === "required"}
			errorBorderColor="red.300"
			_active={inputBorder}
			_focus={inputBorder}
			p={1}
			placeholder={placeholder}
			variant="filled"
			size="sm"
			type={type}
		/>
	);
};

export default UserInput;
