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
import { BiTime } from "react-icons/bi";
import { CgTrash } from "react-icons/cg";
import DeleteDialog from "./DeleteDialog";
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
			rel="noreferrer"
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
	linkDatas: LinkProps[];
	setLinkDatas: React.Dispatch<any>;
}

const LinkCard: React.FC<LinkCardProps> = ({
	linkId,
	shortUrl,
	longUrl,
	updatedAt,
	isEditing,
	linkDatas,
	setIsEditing,
	setLinkDatas,
}) => {
	const bgColor = useColorModeValue("#E0E0E0", "#424242");

	const [updatedUrl, setUpdatedUrl] = useState(shortUrl);
	const [currentUrl, setCurrentUrl] = useState(shortUrl);

	const inputBorder = { border: `2px solid ${useColorModeValue("#616161", "#D9D9D9")}` };
	const inputRef = useRef() as MutableRefObject<HTMLInputElement>;

	const { token } = useUserContext();
	const toast = useToast();
	const [isOpen, setIsOpen] = useState(false);

	const copyUrl = async () => {
		await navigator.clipboard.writeText(`${process.env.NEXT_PUBLIC_SITE_URL}${currentUrl}`);
		!toast.isActive("copied") && toast(displayToast("copied"));
	};

	const deleteUrl = async (linkId: string, token: string) => {
		await axios
			.delete(`${process.env.NEXT_PUBLIC_API_URL}/links/${linkId}`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			.then(() => {
				let currentLinkDatas = linkDatas.filter((data: LinkProps) => {
					return data.linkId !== linkId;
				});
				setLinkDatas(currentLinkDatas);
				!toast.isActive("deleteSuccess") && toast(displayToast("deleteSuccess"));
			});
	};

	const formatDate = (value: string) => {
		let date = new Date(value).toUTCString();
		date = date.replace(" GMT", "");
		date = date.slice(0, date.length - 3);
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

	const MotionVStack = motion(VStack);

	return (
		<MotionVStack
			key={linkId}
			layout
			exit={{ opacity: 0 }}
			p={{ base: 2, sm: 4 }}
			w="full"
			rounded="md"
			maxW="sm"
			bg={bgColor}
			spacing={2}
		>
			<HStack w="full" justifyContent="space-between">
				<HStack spacing={0} w="full">
					<Text
						_hover={{ textDecoration: "underline", cursor: "pointer" }}
						fontSize={{ base: "sm", sm: "md" }}
						noOfLines={1}
						minW="110px"
						w="auto"
					>
						{process.env.NEXT_PUBLIC_SITE_URL}
						{isEditing !== linkId && (
							<a href={`http://${process.env.NEXT_PUBLIC_SITE_URL}` + currentUrl} target="_blank" rel="noreferrer">
								{currentUrl}
							</a>
						)}
					</Text>
					{isEditing === linkId && (
						<Input
							ref={inputRef}
							w="full"
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
					)}
				</HStack>
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
						<>
							<IconButton size="sm" onClick={copyUrl} icon={<RiFileCopyLine />} aria-label="copy"></IconButton>
							<IconButton size="sm" onClick={() => setIsOpen(true)} icon={<CgTrash />} aria-label="delete"></IconButton>
						</>
					)}
				</HStack>
			</HStack>
			<LinkText>{longUrl}</LinkText>
			<Divider />
			<HStack justifyContent="flex-end" w="full" alignItems="center" spacing={1}>
				<BiTime />
				<Text pt={0.5} fontSize={{ base: "xs", sm: "sm" }}>
					{formatDate(updatedAt)}
				</Text>
			</HStack>
			<DeleteDialog isOpen={isOpen} setIsOpen={setIsOpen} onClick={() => deleteUrl(linkId, token)} />
		</MotionVStack>
	);
};

export default LinkCard;
