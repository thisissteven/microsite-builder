import { Box, Button, Text, Heading, HStack, useColorModeValue, VStack, IconButton } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";
import PoweredByVercel from "powered-by-vercel";
import { AiOutlineGithub } from "react-icons/ai";

const SelectStyle = () => {
	const textColor = useColorModeValue("red.400", "red.300");

	return (
		<HStack
			justifyContent="center"
			overflow="hidden"
			gap={2}
			spacing={0}
			rounded="lg"
			w="full"
			flexWrap={{ base: "wrap", md: "nowrap" }}
		>
			<VStack alignItems="flex-start" p={{ base: 2, sm: 4 }} spacing={4}>
				<Text fontSize="lg" fontWeight="medium" w="full">
					Pick your theme
				</Text>
				{/* <SwatchesPicker color={background} onChangeComplete={handleChangeComplete} /> */}
			</VStack>
		</HStack>
	);
};

export default SelectStyle;
