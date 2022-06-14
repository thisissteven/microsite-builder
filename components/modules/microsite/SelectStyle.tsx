import { Box, Button, Text, Heading, HStack, useColorModeValue, VStack, IconButton } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";
import PoweredByVercel from "powered-by-vercel";
import { AiOutlineGithub } from "react-icons/ai";

const SelectStyle = () => {
	const textColor = useColorModeValue("red.400", "red.300");

	return <HStack spacing={6} rounded="lg" w="full" justifyContent="flex-end"></HStack>;
};

export default SelectStyle;
