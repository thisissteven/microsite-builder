import { Box, Button, IconButton, useBreakpointValue, useColorMode, useColorModeValue } from "@chakra-ui/react";
import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import { MdOutlineLightMode, MdDarkMode } from "react-icons/md";

const ToggleButton = () => {
	const { toggleColorMode } = useColorMode();
	const size = useBreakpointValue({ base: "sm", sm: "md" });

	return (
		<Button onClick={toggleColorMode} variant="ghost" borderRadius="lg" transitionDuration="200ms" size={size} p={0}>
			<AnimatePresence exitBeforeEnter>
				<IconButton
					as={motion.div}
					key={useColorModeValue("light", "dark")}
					initial={{ y: -20, opacity: 0 }}
					animate={{ y: 0, opacity: 1, transition: { duration: 0.2 } }}
					exit={{ y: 20, opacity: 0 }}
					aria-label="Toggle theme"
					size={size}
					icon={useColorModeValue(<MdDarkMode />, <MdOutlineLightMode />)}
					onClick={toggleColorMode}
				></IconButton>
			</AnimatePresence>
		</Button>
	);
};

export default ToggleButton;
