import { Input, Textarea, useColorModeValue } from "@chakra-ui/react";
import React from "react";
import { UseFormRegister } from "react-hook-form";

interface TextAreaProps {
	register: UseFormRegister<any>;
	name: string;
	type?: "text" | "number";
	placeholder?: string;
	isInvalid?: boolean;
	maxLength?: number;
}

const TextArea: React.FC<TextAreaProps> = ({ register, name, type = "text", placeholder, isInvalid, maxLength }) => {
	const inputBorder = { border: `2px solid ${useColorModeValue("#616161", "#D9D9D9")}` };

	return (
		<Textarea
			{...register(name)}
			isInvalid={isInvalid}
			_active={inputBorder}
			_focus={inputBorder}
			maxLength={maxLength}
			p={1}
			placeholder={placeholder}
			variant="filled"
			rounded="none"
			size="sm"
			h={{ base: "110px", sm: "80px" }}
		/>
	);
};

export default TextArea;
