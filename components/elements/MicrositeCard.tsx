import React, { ChangeEvent, MutableRefObject, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { HStack, VStack, Text, IconButton, Divider, useColorModeValue, Input, useToast, Tag } from "@chakra-ui/react";
import { AiOutlineEdit } from "react-icons/ai";
import { RiFileCopyLine } from "react-icons/ri";
import { ImCross, ImCheckmark } from "react-icons/im";
import axios from "axios";
import { useUserContext } from "../context/UserContext";
import { displayToast } from "../functions/displayToast";
import { BiTime } from "react-icons/bi";
import { CgTrash } from "react-icons/cg";
import DeleteDialog from "./DeleteDialog";
import { MicrositeProps } from "../../pages/microsite";

interface LinkTextProps {
	children: string;
}

const LinkText: React.FC<LinkTextProps> = ({ children }) => {
	return (
		<Text fontSize={{ base: "sm", sm: "md" }} fontWeight="medium" noOfLines={1} maxW="full" alignSelf="flex-start">
			{children}
		</Text>
	);
};

export interface MicrositeCardProps {
	displayName: string;
	shortUrl: string;
	micrositeId: string;
	updatedAt: string;
	isEditing: string;
	setIsEditing: React.Dispatch<any>;
	micrositeDatas: MicrositeProps[];
	setMicrositeDatas: React.Dispatch<any>;
}

interface InputFieldProps {
	inputRef: MutableRefObject<HTMLInputElement>;
	updatedUrl: string;
	micrositeId: string;
	updateLink: (micrositeId: string, url: string) => Promise<void>;
}

const InputField: React.FC<InputFieldProps> = ({ inputRef, updatedUrl, micrositeId, updateLink }) => {
	const inputBorder = { border: `2px solid ${useColorModeValue("#616161", "#D9D9D9")}` };

	const [url, setUrl] = useState(updatedUrl);
	const [updating, setUpdating] = useState(false);

	useEffect(() => {
		const update = async () => {
			await updateLink(micrositeId, url);
			setUpdating(false);
		};

		updating && update();
	}, [updating]);

	return (
		<HStack justifyContent="space-between">
			<Input
				ref={inputRef}
				w="full"
				autoComplete="off"
				_active={inputBorder}
				_focus={inputBorder}
				border="2px"
				borderColor={inputBorder}
				p={1}
				value={url}
				onChange={(e: ChangeEvent<HTMLInputElement>) => setUrl(e.target.value)}
				placeholder="Your Short URL"
				variant="filled"
				size="sm"
			/>
			<IconButton
				size="sm"
				icon={<ImCheckmark />}
				onClick={() => {
					setUpdating(true);
				}}
				aria-label="update"
				isLoading={updating}
			/>
		</HStack>
	);
};

const LinkCard: React.FC<MicrositeCardProps> = ({
	micrositeId,
	shortUrl,
	displayName,
	updatedAt,
	isEditing,
	micrositeDatas,
	setIsEditing,
	setMicrositeDatas,
}) => {
	const bgColor = useColorModeValue("#E0E0E0", "#424242");

	const [updatedUrl, setUpdatedUrl] = useState(shortUrl);
	const [currentUrl, setCurrentUrl] = useState(shortUrl);

	const inputRef = useRef() as MutableRefObject<HTMLInputElement>;

	const { token } = useUserContext();
	const toast = useToast();
	const [isOpen, setIsOpen] = useState(false);

	const copyUrl = async () => {
		await navigator.clipboard.writeText(`${process.env.NEXT_PUBLIC_SITE_URL}${currentUrl}`);
		!toast.isActive("copied") && toast(displayToast("copied"));
	};

	const deleteUrl = async (micrositeId: string, token: string) => {
		await axios
			.delete(`${process.env.NEXT_PUBLIC_API_URL}/microsites/${micrositeId}`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			.then(() => {
				let currentLinkDatas = micrositeDatas.filter((data: MicrositeProps) => {
					return data.micrositeId !== micrositeId;
				});
				setMicrositeDatas(currentLinkDatas);
				!toast.isActive("deleteSuccess") && toast(displayToast("deleteSuccess"));
			});
	};

	const formatDate = (value: string) => {
		let updatedTime = new Date(value).toLocaleTimeString();
		updatedTime = updatedTime.slice(0, updatedTime.length - 6);

		let date = new Date(value).toUTCString();
		date = date.slice(0, date.length - 13);
		return date + " " + updatedTime;
	};

	const updateLink = async (micrositeId: string, url: string) => {
		// check if link with the same url exists
		const { data: linkData } = await axios(`${process.env.NEXT_PUBLIC_API_URL}/links?filters[shortUrl][$eq]=${url}`);

		if (linkData?.data?.length > 0) {
			!toast.isActive("error") && toast(displayToast("taken"));
			setIsEditing("");
			return;
		}

		await axios
			.put(
				`${process.env.NEXT_PUBLIC_API_URL}/microsites/${micrositeId}`,
				{
					data: {
						shortUrl: url,
					},
				},
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			)
			.then(() => {
				setCurrentUrl(url);
				setUpdatedUrl(url);
				!toast.isActive("linkUpdated") && toast(displayToast("linkUpdated"));
			})
			.catch(() => {
				setUpdatedUrl(currentUrl);
				!toast.isActive("taken") && toast(displayToast("taken"));
			})
			.finally(() => {
				setIsEditing("");
			});
	};

	useEffect(() => {
		isEditing === micrositeId && inputRef.current.focus();
	}, [isEditing]);

	const MotionVStack = motion(VStack);

	return (
		<MotionVStack
			key={micrositeId}
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
						_hover={{
							textDecoration: isEditing !== micrositeId && "underline",
							cursor: isEditing !== micrositeId && "pointer",
						}}
						fontSize={{ base: "sm", sm: "md" }}
						noOfLines={1}
						minW={{ base: "100px", sm: "115px" }}
						w="auto"
					>
						{isEditing === micrositeId && process.env.NEXT_PUBLIC_SITE_URL}
						{isEditing !== micrositeId && (
							<a href={`http://${process.env.NEXT_PUBLIC_SITE_URL}` + currentUrl} target="_blank" rel="noreferrer">
								{process.env.NEXT_PUBLIC_SITE_URL}
								{currentUrl}
							</a>
						)}
					</Text>
					{isEditing === micrositeId && (
						<InputField micrositeId={micrositeId} updateLink={updateLink} inputRef={inputRef} updatedUrl={updatedUrl} />
					)}
				</HStack>
				<HStack spacing={0} margin={0}>
					{isEditing === micrositeId ? (
						<IconButton
							size="sm"
							icon={<ImCross />}
							onClick={() => {
								setIsEditing("");
							}}
							aria-label="cancel"
						></IconButton>
					) : (
						<IconButton
							size="sm"
							icon={<AiOutlineEdit />}
							onClick={() => {
								setUpdatedUrl(currentUrl);
								setIsEditing(micrositeId);
							}}
							aria-label="edit"
						></IconButton>
					)}

					{isEditing !== micrositeId && (
						<>
							<IconButton size="sm" onClick={copyUrl} icon={<RiFileCopyLine />} aria-label="copy"></IconButton>
							<IconButton size="sm" onClick={() => setIsOpen(true)} icon={<CgTrash />} aria-label="delete"></IconButton>
						</>
					)}
				</HStack>
			</HStack>
			<LinkText>{displayName}</LinkText>
			<Divider />
			<HStack justifyContent="space-between" w="full" pt={{ base: 0, sm: 2 }}>
				<Tag size="sm">Microsite</Tag>
				<HStack justifyContent="flex-end" alignItems="center" spacing={1}>
					<BiTime />
					<Text pt={0.5} fontSize={{ base: "xs", sm: "sm" }}>
						{formatDate(updatedAt)}
					</Text>
				</HStack>
			</HStack>
			<DeleteDialog isOpen={isOpen} setIsOpen={setIsOpen} onClick={() => deleteUrl(micrositeId, token)} />
		</MotionVStack>
	);
};

export default LinkCard;
