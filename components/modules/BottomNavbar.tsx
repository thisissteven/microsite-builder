import { Box, Button, Text, Heading, HStack, useColorModeValue, VStack, IconButton } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";
import { useUserContext } from "../context/UserContext";
import PoweredByVercel from "powered-by-vercel";
import { AiOutlineGithub } from "react-icons/ai";

const BottomNavbar = () => {
	const { user } = useUserContext();

	const textColor = useColorModeValue("red.400", "red.300");

	return (
		<HStack spacing={6} rounded="lg" w="full" justifyContent="flex-end">
			<Text fontSize="sm">
				Inspired by{" "}
				<Box as="span" _hover={{ textDecoration: "underline" }} color={textColor}>
					<a href="https://s.id" target="_blank" rel="noreferrer">
						s.id
					</a>
				</Box>
			</Text>
			<Box _hover={{ opacity: 0.8 }} transitionDuration="200ms">
				<a href="https://github.com/steven2801/microsite-maker" target="_blank" rel="noreferrer">
					<AiOutlineGithub size="24px" />
				</a>
			</Box>
		</HStack>
	);
};

export default BottomNavbar;
