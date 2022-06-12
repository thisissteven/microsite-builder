import {
	AlertDialog,
	AlertDialogOverlay,
	AlertDialogContent,
	AlertDialogBody,
	AlertDialogHeader,
	Text,
	useColorModeValue,
	IconButton,
	HStack,
	Button,
	Box,
	AlertDialogFooter,
} from "@chakra-ui/react";
import { AnimatePresence, motion } from "framer-motion";
import { MutableRefObject, useRef, useState } from "react";
import { RiFileCopyLine } from "react-icons/ri";

interface AlertDialogProps {
	isOpen: boolean;
	setIsOpen: React.Dispatch<any>;
	onClick: any;
}

const DeleteDialog: React.FC<AlertDialogProps> = ({ isOpen, setIsOpen, onClick }) => {
	const cancelRef = useRef() as MutableRefObject<HTMLInputElement>;
	const dialogBg = useColorModeValue("#F1F1F1", "#696969");
	const deleteColor = useColorModeValue("red.200", "red.500");
	const deleteHover = useColorModeValue("red.300", "red.400");
	const deleteActive = useColorModeValue("red.400", "red.300");

	return (
		<AlertDialog isCentered isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={() => setIsOpen(false)}>
			<AlertDialogOverlay>
				<AlertDialogContent bg={dialogBg}>
					<AlertDialogHeader fontSize="lg" fontWeight="bold">
						Delete Link
					</AlertDialogHeader>

					<AlertDialogBody>Are you sure? You can&apos;t undo this action afterwards.</AlertDialogBody>

					<AlertDialogFooter>
						<Button onClick={() => setIsOpen(false)}>Cancel</Button>
						<Button
							bg={deleteColor}
							_hover={{ bg: deleteHover }}
							_active={{ bg: deleteActive }}
							onClick={() => {
								onClick();
								setIsOpen(false);
							}}
							ml={3}
						>
							Delete
						</Button>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialogOverlay>
		</AlertDialog>
	);
};

export default DeleteDialog;
