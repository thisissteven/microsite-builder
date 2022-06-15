import { Box, Button, Text, Heading, HStack, useColorModeValue, VStack, IconButton } from "@chakra-ui/react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import PoweredByVercel from "powered-by-vercel";
import { AiOutlineGithub } from "react-icons/ai";
import { useMicrositeContext } from "../../context/MicrositeContext";

const SelectStyle = () => {
	const textColor = useColorModeValue("red.400", "red.300");

	const { background, getValues, size, setSize, selectedStyle, setSelectedStyle } = useMicrositeContext();
	const [displayName, setDisplayName] = useState(getValues().displayName);

	const sizes: any = {
		sm: "2rem",
		md: "3rem",
		lg: "4rem",
	};

	const gap: any = {
		sm: 6,
		md: 6,
		lg: 6,
	};

	const borderTypes = ["full", "2xl", "xl", "lg", "md", "sm"];

	const selectedBg = useColorModeValue("green.200", "green.500");

	return (
		<>
			<HStack justifyContent="center" w="full" mb={2}>
				<Text fontSize="lg" fontWeight="medium">
					Pick a style
				</Text>
			</HStack>
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
			<HStack
				justifyContent="center"
				p={4}
				columnGap={gap[size]}
				rowGap={gap[size]}
				spacing={0}
				rounded="lg"
				w="full"
				flexWrap="wrap"
			>
				{borderTypes.map((type, index) => {
					return (
						<HStack
							rounded={type}
							overflow="hidden"
							sx={{ outline: selectedStyle === type && "3px solid #c3c3c3" }}
							key={index}
						>
							<Button
								onClick={() => setSelectedStyle(type)}
								bg={background}
								_hover={{ bg: background }}
								_active={{ bg: background }}
								size={size}
								p={4}
								w="20rem"
							>
								Hello, {displayName}
							</Button>
						</HStack>
					);
				})}
			</HStack>
		</>
	);
};

export default SelectStyle;
