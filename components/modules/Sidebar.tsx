import {
	Box,
	Button,
	Flex,
	Heading,
	HStack,
	Menu,
	MenuButton,
	MenuItem,
	MenuList,
	Text,
	Tooltip,
	useColorModeValue,
	VStack,
} from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { MouseEventHandler } from "react";
import { useUserContext } from "../context/UserContext";
import LoginButton from "../elements/Button";
import ToggleButton from "../elements/ThemeToggle";
import { FiSettings } from "react-icons/fi";
import { AnimatePresence, motion } from "framer-motion";

const DashboardSidebar = () => {
	const { user, loading, signIn, logout } = useUserContext();

	const { pathname } = useRouter();

	const listBg = useColorModeValue("#E0E0E0", "#424242");
	const buttonColor = useColorModeValue("#323232", "#EEEEEE");
	const MotionFlex = motion(Flex);

	return (
		<VStack bg="whiteAlpha.200" rounded="xl" p={4} spacing={4} h="full" justifySelf="flex-start">
			<Heading size="lg">This is sidebar</Heading>
		</VStack>
	);
};

export default DashboardSidebar;
