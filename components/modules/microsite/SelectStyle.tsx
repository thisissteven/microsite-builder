import { Box, Button, Text, Heading, HStack, useColorModeValue, VStack, IconButton } from "@chakra-ui/react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import PoweredByVercel from "powered-by-vercel";
import { AiOutlineGithub } from "react-icons/ai";
import { useMicrositeContext } from "../../context/MicrositeContext";

const SelectStyle = () => {
	const textColor = useColorModeValue("red.400", "red.300");

	const { background, getValues, size, setSize, selectedStyle, setSelectedStyle } = useMicrositeContext();
	const [title, setTitle] = useState(getValues().title);

	const sizes: any = {
		sm: "2rem",
		md: "3rem",
		lg: "4rem",
	};

	const gap: any = {
		sm: 4,
		md: 8,
		lg: 12,
	};

	const selectedBg = useColorModeValue("green.200", "green.500");

	return (
		<>
			<HStack justifyContent="center" w="full" mb={4}>
				<Button
					variant="solid"
					sx={{ backgroundColor: size === "sm" && selectedBg }}
					size="xs"
					onClick={() => setSize("sm")}
					_hover={{ opacity: 1 }}
					_active={{ opacity: 1 }}
				>
					small
				</Button>
				<Button
					variant="solid"
					sx={{ backgroundColor: size === "md" && selectedBg }}
					size="sm"
					onClick={() => setSize("md")}
					_hover={{ opacity: 1 }}
					_active={{ opacity: 1 }}
				>
					medium
				</Button>
				<Button
					variant="solid"
					sx={{ backgroundColor: size === "lg" && selectedBg }}
					size="md"
					onClick={() => setSize("lg")}
					_hover={{ opacity: 1 }}
					_active={{ opacity: 1 }}
				>
					large
				</Button>
			</HStack>
			<HStack justifyContent="center" p={4} rowGap={gap[size]} spacing={0} rounded="lg" w="full" flexWrap="wrap">
				<Button
					onClick={() => setSelectedStyle("full")}
					bg="transparent"
					_hover={{ bg: "transparent" }}
					_active={{ bg: "transparent" }}
				>
					<HStack
						sx={{ border: selectedStyle === "full" && "3px solid #c3c3c3" }}
						justifyContent="center"
						w="20rem"
						h={sizes[size]}
						rounded="full"
						bg={background}
					>
						<Text>Hello, {title}</Text>
					</HStack>
				</Button>

				<Button
					onClick={() => setSelectedStyle("2xl")}
					bg="transparent"
					_hover={{ bg: "transparent" }}
					_active={{ bg: "transparent" }}
				>
					<HStack
						sx={{ border: selectedStyle === "2xl" && "3px solid #c3c3c3" }}
						justifyContent="center"
						w="20rem"
						h={sizes[size]}
						rounded="2xl"
						bg={background}
					>
						<Text>Hello, {title}</Text>
					</HStack>
				</Button>

				<Button
					onClick={() => setSelectedStyle("xl")}
					bg="transparent"
					_hover={{ bg: "transparent" }}
					_active={{ bg: "transparent" }}
				>
					<HStack
						sx={{ border: selectedStyle === "xl" && "3px solid #c3c3c3" }}
						justifyContent="center"
						w="20rem"
						h={sizes[size]}
						rounded="xl"
						bg={background}
					>
						<Text>Hello, {title}</Text>
					</HStack>
				</Button>

				<Button
					onClick={() => setSelectedStyle("lg")}
					bg="transparent"
					_hover={{ bg: "transparent" }}
					_active={{ bg: "transparent" }}
				>
					<HStack
						sx={{ border: selectedStyle === "lg" && "3px solid #c3c3c3" }}
						justifyContent="center"
						w="20rem"
						h={sizes[size]}
						rounded="lg"
						bg={background}
					>
						<Text>Hello, {title}</Text>
					</HStack>
				</Button>

				<Button
					onClick={() => setSelectedStyle("md")}
					bg="transparent"
					_hover={{ bg: "transparent" }}
					_active={{ bg: "transparent" }}
				>
					<HStack
						sx={{ border: selectedStyle === "md" && "3px solid #c3c3c3" }}
						justifyContent="center"
						w="20rem"
						h={sizes[size]}
						rounded="md"
						bg={background}
					>
						<Text>Hello, {title}</Text>
					</HStack>
				</Button>

				<Button
					onClick={() => setSelectedStyle("sm")}
					bg="transparent"
					_hover={{ bg: "transparent" }}
					_active={{ bg: "transparent" }}
				>
					<HStack
						sx={{ border: selectedStyle === "sm" && "3px solid #c3c3c3" }}
						justifyContent="center"
						w="20rem"
						h={sizes[size]}
						rounded="sm"
						bg={background}
					>
						<Text>Hello, {title}</Text>
					</HStack>
				</Button>
			</HStack>
		</>
	);
};

export default SelectStyle;
