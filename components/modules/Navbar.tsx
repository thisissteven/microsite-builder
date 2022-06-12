import {
	Box,
	Button,
	Divider,
	Flex,
	Heading,
	HStack,
	Menu,
	MenuButton,
	MenuItem,
	MenuList,
	Spinner,
	Text,
	Tooltip,
	useColorModeValue,
} from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { MouseEventHandler } from "react";
import { useUserContext } from "../context/UserContext";
import LoginButton from "../elements/Button";
import ToggleButton from "../elements/ThemeToggle";
import { FiSettings } from "react-icons/fi";
import { AnimatePresence, motion } from "framer-motion";

interface ItemProps {
	children: string;
	onClick?: () => void;
	url?: string;
}

const Item: React.FC<ItemProps> = ({ children, onClick, url }) => {
	const itemActive = useColorModeValue("#E8E8E8", "#525252");
	const itemHover = useColorModeValue("#D8D8D8", "#606060");
	return (
		<MenuItem
			fontSize={{ base: "xs", sm: "sm" }}
			onClick={onClick}
			_focus={{ bg: itemHover }}
			_hover={{ bg: itemHover }}
			_active={{ bg: itemActive }}
			w="full"
		>
			{url !== undefined ? (
				<Link href={url}>
					<Box w="full">{children}</Box>
				</Link>
			) : (
				children
			)}
		</MenuItem>
	);
};

const Navbar = () => {
	const { user, loading, signIn, logout } = useUserContext();

	const { pathname } = useRouter();

	const listBg = useColorModeValue("#E0E0E0", "#424242");
	const buttonColor = useColorModeValue("#323232", "#EEEEEE");
	const MotionFlex = motion(Flex);

	return (
		<HStack mb={8} justifyContent="space-between" w="full" flexDir={{ base: "column-reverse", sm: "row" }}>
			<Flex w="full">
				<Tooltip
					shouldWrapChildren
					placement="bottom-start"
					opacity={0}
					label={pathname === "/" ? "Shorten URL here :D" : "Home"}
					aria-label="A tooltip"
				>
					<Link href={pathname === "/" ? "/shorten" : "/"}>
						<Button
							size="lg"
							px={0}
							bg="transparent"
							_active={{ bg: "transparent", opacity: 0.5 }}
							_hover={{ opacity: 0.8 }}
							pt={{ base: 4, sm: 0 }}
							w="auto"
							transitionDuration="300ms"
							cursor="pointer"
						>
							{process.env.NEXT_PUBLIC_SITE_URL}
						</Button>
					</Link>
				</Tooltip>
			</Flex>
			<HStack
				sx={{ margin: "0px !important" }}
				spacing={4}
				alignItems="center"
				justifyContent="space-between"
				w={{ base: "full", sm: "auto" }}
			>
				<ToggleButton />
				<Flex>
					{loading ? (
						<Spinner size="sm" ml={4}></Spinner>
					) : (
						<AnimatePresence exitBeforeEnter>
							{user ? (
								<MotionFlex
									key="menu"
									animate={{ opacity: 1, transition: { duration: 0.5 } }}
									exit={{ opacity: 0, transition: { duration: 0.5 } }}
								>
									<Menu>
										<MenuButton
											color={buttonColor}
											_active={{ opacity: 0.6 }}
											_hover={{ opacity: 0.8 }}
											variant="link"
											as={Button}
											rightIcon={<FiSettings />}
										>
											{user?.displayName}
										</MenuButton>
										<MenuList bg={listBg}>
											<Item url="/profile">Profile</Item>
											<Item url="/links">Links</Item>
											<Item url="/microsite">Microsites</Item>
											<Divider my={1} />
											<Item onClick={logout}>Sign Out</Item>
										</MenuList>
									</Menu>
								</MotionFlex>
							) : (
								<MotionFlex
									key="signup"
									animate={{ opacity: 1, transition: { duration: 0.5 } }}
									exit={{ opacity: 0, transition: { duration: 0.5 } }}
								>
									<LoginButton variant="signup" onClick={signIn}>
										Sign In
									</LoginButton>
								</MotionFlex>
							)}
						</AnimatePresence>
					)}
				</Flex>
			</HStack>
		</HStack>
	);
};

export default Navbar;
