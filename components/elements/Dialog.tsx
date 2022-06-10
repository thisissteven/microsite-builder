import {
	AlertDialog,
	AlertDialogOverlay,
	AlertDialogContent,
	AlertDialogBody,
	AlertDialogCloseButton,
	AlertDialogHeader,
	Text,
	useColorModeValue,
	IconButton,
	HStack,
	Button,
	Box,
} from "@chakra-ui/react";
import { AnimatePresence, motion } from "framer-motion";
import { MutableRefObject, useRef, useState } from "react";
import { RiFileCopyLine } from "react-icons/ri";

interface DialogProps {
	isOpen: boolean;
	setIsOpen: React.Dispatch<any>;
	shortenedLink: string;
}

const Dialog: React.FC<DialogProps> = ({ isOpen, setIsOpen, shortenedLink }) => {
	const cancelRef = useRef() as MutableRefObject<HTMLInputElement>;
	const dialogBg = useColorModeValue("#F1F1F1", "#696969");
	const textColor = useColorModeValue("#28A228", "#77DD77");

	const [copied, setCopied] = useState(false);

	const copyUrl = async () => {
		await navigator.clipboard.writeText(`${process.env.NEXT_PUBLIC_SITE_URL}${shortenedLink}`);
		setCopied(true);
	};

	const MotionText = motion(Text);

	return (
		<AlertDialog
			motionPreset="slideInBottom"
			leastDestructiveRef={cancelRef}
			onClose={() => {
				setIsOpen(false);
				setCopied(false);
			}}
			isOpen={isOpen}
			isCentered
		>
			<AlertDialogOverlay />

			<AlertDialogContent bg={dialogBg}>
				<AlertDialogHeader>
					<AnimatePresence exitBeforeEnter>
						{copied ? (
							<MotionText key="1" initial={{ color: dialogBg }} animate={{ color: textColor }} exit={{ opacity: 0 }}>
								Copied successfully!
							</MotionText>
						) : (
							<MotionText key="2" exit={{ opacity: 0 }}>
								Your link is ready!
							</MotionText>
						)}
					</AnimatePresence>
				</AlertDialogHeader>
				<AlertDialogCloseButton m={{ base: 2, sm: 0 }} />
				<AlertDialogBody mb={4}>
					<HStack spacing={2} justifyContent="space-between">
						<Text fontSize={{ base: "xl", sm: "3xl" }} noOfLines={1}>
							{process.env.NEXT_PUBLIC_SITE_URL}
							{shortenedLink}
						</Text>
						<IconButton
							sx={{ padding: "6px !important" }}
							onClick={copyUrl}
							aria-label="copy"
							icon={<RiFileCopyLine />}
						></IconButton>
					</HStack>
				</AlertDialogBody>
			</AlertDialogContent>
		</AlertDialog>
	);
};

export default Dialog;
