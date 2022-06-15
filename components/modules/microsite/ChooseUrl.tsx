import { Box, Text, HStack, FormLabel, Input, useColorModeValue, VStack, useBreakpointValue } from "@chakra-ui/react";
import React from "react";
import { useMicrositeContext } from "../../context/MicrositeContext";

const ChooseUrl = () => {
	const { register } = useMicrositeContext();
	const inputBorder = { border: `2px solid ${useColorModeValue("#616161", "#D9D9D9")}` };

	const text = useBreakpointValue({ base: "Custom URL", sm: "Give your site a custom URL" });

	return (
		<Box pb={2}>
			<VStack alignItems={{ base: "flex-start", sm: "center" }} w="full" mb={2} px={4}>
				<Text fontSize="lg" fontWeight="medium">
					{text}
				</Text>
				<HStack
					spacing={{ base: 0, sm: 2 }}
					gap={{ base: 2, sm: 0 }}
					flexWrap={{ base: "wrap", sm: "nowrap" }}
					alignItems={{ base: "flex-start", sm: "center" }}
					maxW="22rem"
				>
					<FormLabel m="0" htmlFor="shortUrl">
						{process.env.NEXT_PUBLIC_SITE_URL}
					</FormLabel>
					<Input
						{...register("shortUrl")}
						autoComplete="off"
						// isInvalid={errors === "shortUrl"}
						errorBorderColor="red.300"
						_active={inputBorder}
						_focus={inputBorder}
						p={1}
						placeholder="Enter your short URL"
						variant="filled"
						size="sm"
						id="shortUrl"
					/>
				</HStack>
			</VStack>
		</Box>
	);
};

export default ChooseUrl;
