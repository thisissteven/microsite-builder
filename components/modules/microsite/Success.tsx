import { Box, Button, Text, Heading, HStack, useColorModeValue, VStack, IconButton, FormLabel } from "@chakra-ui/react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Image } from "@chakra-ui/react";
import { useMicrositeContext } from "../../context/MicrositeContext";

const Success = () => {
	const { register, background, selectedStyle, size, getValues } = useMicrositeContext();

	const bg = useColorModeValue("", "#E9E9E9");

	useEffect(() => {
		const data = {
			background,
			selectedStyle,
			size,
			...getValues(),
		};

		console.log(data);
	}, []);

	return (
		<VStack pb={4}>
			<HStack justifyContent="center" w="full" mb={2}>
				<Text fontSize="lg" fontWeight="medium">
					Your site is finished!
				</Text>
			</HStack>
			<Box bg={bg} rounded="lg" p={4}>
				<Image src="/images/well-done.svg" w={48} h={48} />
			</Box>
		</VStack>
	);
};

export default Success;
