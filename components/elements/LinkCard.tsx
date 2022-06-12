import React, { ChangeEvent, MutableRefObject, ReactNode, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
	HStack,
	VStack,
	Text,
	IconButton,
	Divider,
	useColorModeValue,
	WrapItem,
	Input,
	useToast,
} from "@chakra-ui/react";
import { AiOutlineEdit } from "react-icons/ai";
import { RiFileCopyLine } from "react-icons/ri";
import { ImCross, ImCheckmark } from "react-icons/im";
import axios from "axios";
import { useUserContext } from "../context/UserContext";
import { displayToast } from "../functions/displayToast";

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

export interface LinkCardProps {
	longUrl: string;
	shortUrl: string;
	linkId: string;
	updatedAt: string;
	isEditing: string;
	setIsEditing: React.Dispatch<any>;
}

const LinkCard: React.FC<LinkCardProps> = ({ linkId, shortUrl, longUrl, updatedAt, isEditing, setIsEditing }) => {
	const bgColor = useColorModeValue("#E0E0E0", "#424242");

	const [updatedUrl, setUpdatedUrl] = useState(shortUrl);
	const [currentUrl, setCurrentUrl] = useState(shortUrl);

	const inputBorder = { border: `2px solid ${useColorModeValue("#616161", "#D9D9D9")}` };
	const inputRef = useRef() as MutableRefObject<HTMLInputElement>;

	const { token } = useUserContext();
	const toast = useToast();

	const copyUrl = async () => {
		await navigator.clipboard.writeText(`${process.env.NEXT_PUBLIC_SITE_URL}${currentUrl}`);
		!toast.isActive("copied") && toast(displayToast("copied"));
	};

	const formatDate = (value: string) => {
		let date = new Date(updatedAt).toUTCString();
		date = date.replace(" GMT", "");
		return date;
	};

	const updateLink = async (linkId: string) => {
		await axios
			.put(
				`${process.env.NEXT_PUBLIC_API_URL}/links/${linkId}`,
				{
					data: {
						shortUrl: updatedUrl,
					},
				},
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			)
			.then(() => {
				setCurrentUrl(updatedUrl);
				!toast.isActive("linkUpdated") && toast(displayToast("linkUpdated"));
			})
			.catch(() => {
				setUpdatedUrl(currentUrl);
				!toast.isActive("taken") && toast(displayToast("taken"));
			});
	};

	useEffect(() => {
		isEditing === linkId && inputRef.current.focus();
	}, [isEditing]);

	return (
		<VStack p={{ base: 2, sm: 4 }} w="full" rounded="md" maxW="sm" bg={bgColor} spacing={2}>
			<HStack w="full" justifyContent="space-between">
				<Text
					_hover={{ textDecoration: "underline", cursor: "pointer" }}
					fontSize={{ base: "sm", sm: "md" }}
					noOfLines={1}
					w="auto"
				>
					{isEditing === linkId ? (
						<>
							{process.env.NEXT_PUBLIC_SITE_URL}
							<Input
								ref={inputRef}
								w="150px"
								autoComplete="off"
								_active={inputBorder}
								_focus={inputBorder}
								p={1}
								value={updatedUrl}
								onChange={(e: ChangeEvent<HTMLInputElement>) => setUpdatedUrl(e.target.value)}
								placeholder="Your Short URL"
								variant="filled"
								size="sm"
							/>
						</>
					) : (
						<a href={`http://${process.env.NEXT_PUBLIC_SITE_URL}` + currentUrl} target="_blank">
							{`${process.env.NEXT_PUBLIC_SITE_URL}` + currentUrl}
						</a>
					)}
				</Text>
				<HStack spacing={0}>
					{isEditing === linkId ? (
						<>
							<IconButton
								size="sm"
								icon={<ImCheckmark />}
								onClick={() => {
									setIsEditing("");
									updateLink(linkId);
								}}
								aria-label="update"
							></IconButton>
							<IconButton
								size="sm"
								icon={<ImCross />}
								onClick={() => {
									setIsEditing("");
								}}
								aria-label="cancel"
							></IconButton>
						</>
					) : (
						<IconButton
							size="sm"
							icon={<AiOutlineEdit />}
							onClick={() => {
								setUpdatedUrl(currentUrl);
								setIsEditing(linkId);
							}}
							aria-label="edit"
						></IconButton>
					)}

					{isEditing !== linkId && (
						<IconButton size="sm" onClick={copyUrl} icon={<RiFileCopyLine />} aria-label="copy"></IconButton>
					)}
				</HStack>
			</HStack>
			<LinkText>{longUrl}</LinkText>
			<Divider my={2} />
			<HStack justifyContent="flex-end" w="full">
				<Text fontSize={{ base: "xs", sm: "sm" }}>{formatDate(updatedAt)}</Text>
			</HStack>
		</VStack>
	);
};

export default LinkCard;
