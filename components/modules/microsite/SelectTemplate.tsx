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
import { FiUpload } from "react-icons/fi";
import { useMicrositeContext } from "../../context/MicrositeContext";
import TextArea from "../../elements/TextArea";

const SelectTemplate = () => {
	const textColor = useColorModeValue("red.400", "red.300");

	const { register, imageSrc, setImageSrc, getValues, setBackground, background } = useMicrositeContext();

	const displayColor = useColorModeValue("blackAlpha.200", "whiteAlpha.200");

	const handleChangeComplete = (color: any, event: any) => {
		setBackground(color.hex);
	};

	const [imgName, setImgName] = useState(null);

	const handleOnChange = (changeEvent: any) => {
		const reader = new FileReader();

		if (changeEvent?.target?.files[0]?.name) setImgName(changeEvent.target.files[0].name);

		reader.onload = (onLoadEvent: any) => {
			setImageSrc(onLoadEvent.target.result);
		};

		reader.readAsDataURL(changeEvent.target.files[0]);
	};

	return (
		<HStack
			justifyContent={{ base: "flex-start", sm: "center" }}
			overflow="hidden"
			gap={2}
			spacing={0}
			rounded="lg"
			w="full"
			minH="20rem"
			px={{ base: 4, sm: 0 }}
			flexWrap={{ base: "wrap", md: "nowrap" }}
		>
			<VStack alignItems="flex-start" p={{ base: 2, sm: 4 }} spacing={4}>
				<Text fontSize="lg" fontWeight="medium" w="full">
					Pick your theme
				</Text>
				<SwatchesPicker color={background} onChangeComplete={handleChangeComplete} />
			</VStack>
			<VStack alignItems="flex-start" p={{ base: 2, sm: 4 }} spacing={4} w="full" maxW="300px">
				<Box
					display="flex"
					alignItems="flex-end"
					gap={{ base: 0, sm: 2 }}
					flexDir={{ base: "column", sm: "row" }}
					w="full"
				>
					<VStack spacing={4} alignItems="flex-start" w="full">
						<Box w="full">
							<FormLabel htmlFor="" mb={2} fontSize={{ base: "sm", sm: "md" }}>
								Display Name
							</FormLabel>
							<UserInput
								placeholder="Enter a name"
								isInvalid={getValues().displayName === ""}
								register={register}
								name="displayName"
								maxLength={18}
							/>
						</Box>
						<Box w="full">
							<FormLabel htmlFor="" mb={2} fontSize={{ base: "sm", sm: "md" }}>
								Description
							</FormLabel>
							<TextArea placeholder="Write some description" register={register} name="description" maxLength={72} />
						</Box>
						<Box w="full">
							<HStack>
								<VStack alignItems="flex-start" w="full">
									<FormLabel htmlFor="" mb={{ base: 0, sm: 2 }} fontSize={{ base: "sm", sm: "md" }}>
										Display Picture
									</FormLabel>
									<Text fontSize={{ base: "xs", sm: "sm" }} noOfLines={1} maxW="225px">
										{imgName ? imgName : "No Image Uploaded."}
									</Text>
								</VStack>
								<VStack>
									<Box
										as="form"
										onChange={handleOnChange}
										position="relative"
										bg={displayColor}
										w={{ base: 12, sm: 16 }}
										h={{ base: 12, sm: 16 }}
										rounded="lg"
										_hover={{ opacity: 0.8 }}
										overflow="hidden"
									>
										{imageSrc && (
											<Image
												position="absolute"
												src={imageSrc}
												boxSize={{ base: 12, sm: 16 }}
												objectFit="cover"
												objectPosition="center"
											/>
										)}

										<IconButton
											position="absolute"
											aria-label="edit profile"
											icon={<FiUpload />}
											top="50%"
											left="50%"
											transform="auto"
											translateX="-50%"
											translateY="-50%"
											bg="transparent"
											_hover={{ bg: "transparent", opacity: 0.8 }}
											_active={{ bg: "transparent" }}
										/>
										<Tooltip label="Upload Image" aria-label="upload">
											<Input name="image" type="file" id="image" accept="image/*" w="full" h="full" opacity={0} />
										</Tooltip>
									</Box>
								</VStack>
							</HStack>
						</Box>
					</VStack>
				</Box>
			</VStack>
		</HStack>
	);
};

export default SelectTemplate;
