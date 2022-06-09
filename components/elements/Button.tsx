import { Button, useColorModeValue } from "@chakra-ui/react";
import React, { MouseEventHandler } from "react";

interface LoginButtonProps {
	children: string;
	variant: "login" | "signup";
	onClick: MouseEventHandler<HTMLButtonElement>;
}

const LoginButton: React.FC<LoginButtonProps> = ({ children, variant, onClick }) => {
	const bgColor = useColorModeValue("blackAlpha.800", "whiteAlpha.800");
	const buttonColor = useColorModeValue("white", "black");
	const buttonVariants = {
		login: "ghost",
		signup: "solid",
	};
	return (
		<Button
			variant={buttonVariants[variant]}
			_hover={{ opacity: 1 }}
			_active={{ opacity: 0.8 }}
			size={{ base: "sm", sm: "md" }}
			bg={bgColor}
			color={buttonColor}
			borderRadius="lg"
			onClick={onClick}
		>
			{children}
		</Button>
	);
};

export default LoginButton;
