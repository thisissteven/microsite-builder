import { Box, Button, Text, Heading, HStack, useColorModeValue, VStack, IconButton } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { SwatchesPicker } from "react-color";

const SelectTemplate = () => {
	const textColor = useColorModeValue("red.400", "red.300");

	const [background, setBackground] = useState("#fff");

	const handleChangeComplete = (color: any, event: any) => {
		setBackground(color.hex);
	};

	return (
		<HStack justifyContent="center" gap={2} spacing={0} rounded="lg" w="full" flexWrap="wrap">
			<VStack alignItems="flex-start" h="full" p={{ base: 2, sm: 4 }} spacing={4}>
				<Text fontSize="lg" fontWeight="medium" w="full">
					Pick your theme
				</Text>
				<SwatchesPicker color={background} onChangeComplete={handleChangeComplete} />
			</VStack>
			<VStack alignItems="flex-start" h="full" p={{ base: 2, sm: 4 }} spacing={4}>
				<Text fontSize="lg" fontWeight="medium" w="full">
					Some description
				</Text>
				<SwatchesPicker color={background} onChangeComplete={handleChangeComplete} />
			</VStack>
			<VStack alignItems="flex-start" h="full" p={{ base: 2, sm: 4 }} spacing={4}>
				<Text fontSize="lg" fontWeight="medium" w="full">
					Social media links
				</Text>
				<SwatchesPicker color={background} onChangeComplete={handleChangeComplete} />
			</VStack>
		</HStack>
	);
};

export default SelectTemplate;
