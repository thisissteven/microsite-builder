import { Box, Button, Text, Heading, HStack, useColorModeValue, VStack, IconButton, FormLabel } from "@chakra-ui/react";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { Image } from "@chakra-ui/react";
import { useMicrositeContext } from "../../context/MicrositeContext";
import Confetti from "react-confetti";

const Success = () => {
	const { register, background, selectedStyle, size, getValues } = useMicrositeContext();

	const bg = useColorModeValue("", "#E9E9E9");

	const ref = useRef() as any;

	return (
		<VStack pb={4}>
			<HStack justifyContent="center" w="full" mb={2}>
				<Text fontSize="lg" fontWeight="medium">
					Your site is ready!
				</Text>
			</HStack>
			<Box position="relative" overflow="hidden" bg={bg} ref={ref} rounded="lg" p={4}>
				<Confetti className="confetti" />
				<Image src="/images/well-done.svg" w={48} h={48} />
			</Box>
		</VStack>
	);
};

export default Success;
