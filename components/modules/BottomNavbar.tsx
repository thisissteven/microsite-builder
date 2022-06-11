import { Box, Button, Flex, Heading, HStack, useColorModeValue, VStack } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";
import { useUserContext } from "../context/UserContext";

const BottomNavbar = () => {
	const { user } = useUserContext();

	const buttonColor = useColorModeValue("#323232", "#EEEEEE");

	if (user === null) return <></>;

	return (
		<HStack position="absolute" bottom={{ base: 8, sm: 0 }} right={0} py={2} px={4} rounded="lg">
			<Button
				variant="link"
				color={buttonColor}
				_active={{ opacity: 0.6 }}
				_hover={{ textDecoration: "underline", opacity: 0.8 }}
			>
				<Link href="/microsite">
					<a>Microsite</a>
				</Link>
			</Button>

			<Button
				variant="link"
				color={buttonColor}
				_active={{ opacity: 0.6 }}
				_hover={{ textDecoration: "underline", opacity: 0.8 }}
			>
				<Link href="/links">
					<a>Your links</a>
				</Link>
			</Button>
		</HStack>
	);
};

export default BottomNavbar;
