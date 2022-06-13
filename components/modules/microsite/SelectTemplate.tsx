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
		<HStack spacing={6} rounded="lg" w="full">
			<VStack justifyContent="center" h="full" p={{ base: 2, sm: 4 }} spacing={4}>
				<Text fontSize="lg" fontWeight="medium" w="full">
					Pick your theme
				</Text>
				<SwatchesPicker color={background} onChangeComplete={handleChangeComplete} />
			</VStack>
		</HStack>
	);
};

export default SelectTemplate;
