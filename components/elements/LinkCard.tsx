import React, { ReactNode } from "react";
import { motion } from "framer-motion";
import { HStack, VStack, Text, IconButton, Divider, useColorModeValue, WrapItem } from "@chakra-ui/react";
import { AiOutlineEdit } from "react-icons/ai";
import { RiFileCopyLine } from "react-icons/ri";
import { LinkProps } from "../../pages/links";

type Props = {
	children: ReactNode;
};

const variants = {
	hidden: { opacity: 0, x: -200, y: 0 },
	enter: { opacity: 1, x: 0, y: 0 },
	exit: { opacity: 0, x: 0, y: -100 },
};

const MotionHStack = motion(HStack);

interface LinkTextProps {
	children: string;
}

const LinkText: React.FC<LinkTextProps> = ({ children }) => {
	return (
		<Text
			as="a"
			_hover={{ textDecoration: "underline", cursor: "pointer" }}
			fontSize={{ base: "sm", sm: "md" }}
			noOfLines={1}
			maxW="full"
			target="_blank"
			alignSelf="flex-start"
			href={children}
		>
			{children}
		</Text>
	);
};

const LinkCard: React.FC<LinkProps> = ({ linkId, shortUrl, longUrl, updatedAt }) => {
	const bgColor = useColorModeValue("#E0E0E0", "#424242");
	return (
		<VStack p={{ base: 2, sm: 4 }} w="full" rounded="md" maxW="sm" bg={bgColor} spacing={2}>
			<HStack w="full" justifyContent="space-between">
				<Text
					_hover={{ textDecoration: "underline", cursor: "pointer" }}
					fontSize={{ base: "sm", sm: "md" }}
					noOfLines={1}
					w="auto"
				>
					<a href={`http://${process.env.NEXT_PUBLIC_SITE_URL}` + shortUrl} target="_blank">
						{`https://${process.env.NEXT_PUBLIC_SITE_URL}` + shortUrl}
					</a>
				</Text>
				<HStack spacing={0}>
					<IconButton size="sm" icon={<AiOutlineEdit />} aria-label="edit"></IconButton>
					<IconButton size="sm" icon={<RiFileCopyLine />} aria-label="copy"></IconButton>
				</HStack>
			</HStack>
			<LinkText>{longUrl}</LinkText>
			<Divider my={2} />
			<HStack justifyContent="flex-end" w="full">
				<Text fontSize={{ base: "xs", sm: "sm" }}>{updatedAt}</Text>
			</HStack>
		</VStack>
	);
};

export default LinkCard;
