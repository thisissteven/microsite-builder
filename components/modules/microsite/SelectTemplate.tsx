import {
	Box,
	Button,
	Text,
	Heading,
	HStack,
	useColorModeValue,
	VStack,
	IconButton,
	FormControl,
	FormLabel,
	Input,
	Flex,
	Image,
	Icon,
	Tooltip,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { SwatchesPicker } from "react-color";
import UserInput from "../../elements/UserInput";
import { AiOutlineEdit } from "react-icons/ai";
import { useMicrositeContext } from "../../context/MicrositeContext";

const SelectTemplate = () => {
	const textColor = useColorModeValue("red.400", "red.300");

	const { register, handleSubmit, reset, getValues, isSubmitting, setBackground, background } = useMicrositeContext();

	const displayColor = useColorModeValue("blackAlpha.200", "whiteAlpha.200");

	const handleChangeComplete = (color: any, event: any) => {
		setBackground(color.hex);
	};

	const onSubmit = async (data: any) => {
		console.log(data);
		console.log(background);
	};

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
				<SwatchesPicker color={background} onChangeComplete={handleChangeComplete} />
			</VStack>
			<VStack alignItems="flex-start" p={{ base: 2, sm: 4 }} spacing={4}>
				<Box
					as="form"
					display="flex"
					alignItems="flex-end"
					gap={{ base: 0, sm: 2 }}
					flexDir={{ base: "column", sm: "row" }}
					onSubmit={handleSubmit(onSubmit)}
				>
					<FormControl minW={{ base: "240px", sm: "280px" }} px={{ base: 8, sm: 4, md: 0 }}>
						<VStack spacing={4} alignItems="flex-start">
							<Box w={{ base: "auto", sm: "full" }}>
								<FormLabel htmlFor="" mb={2} fontSize={{ base: "sm", sm: "md" }}>
									Title
								</FormLabel>
								<UserInput
									placeholder="Microsite Title"
									isInvalid={getValues().title === ""}
									register={register}
									name="displayName"
									maxLength={18}
								/>
							</Box>
							<Box w={{ base: "auto", sm: "full" }}>
								<FormLabel htmlFor="" mb={2} fontSize={{ base: "sm", sm: "md" }}>
									Description
								</FormLabel>
								<UserInput placeholder="Description" register={register} name="description" maxLength={72} />
							</Box>
							<Box w={{ base: "auto", sm: "full" }} pt={4}>
								<HStack>
									<VStack alignItems="flex-start" w="full">
										<FormLabel htmlFor="" mb={{ base: 0, sm: 2 }} fontSize={{ base: "sm", sm: "md" }}>
											Display Picture
										</FormLabel>
										<Text fontSize="sm">No Image Uploaded.</Text>
									</VStack>
									<VStack alignItems="flex-end">
										<Box
											position="relative"
											bg={displayColor}
											w={{ base: 12, sm: 16 }}
											h={{ base: 12, sm: 16 }}
											rounded="lg"
										>
											<Tooltip label="Upload Image" aria-label="upload">
												<IconButton
													type="submit"
													position="absolute"
													aria-label="edit profile"
													icon={<AiOutlineEdit />}
													top="50%"
													left="50%"
													transform="auto"
													translateX="-50%"
													translateY="-50%"
													bg="transparent"
													_hover={{ bg: "transparent", opacity: 0.8 }}
													_active={{ bg: "transparent" }}
												/>
											</Tooltip>
										</Box>
									</VStack>
								</HStack>
							</Box>
						</VStack>
					</FormControl>
				</Box>
			</VStack>
		</HStack>
	);
};

export default SelectTemplate;
