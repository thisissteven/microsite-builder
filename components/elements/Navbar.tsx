import { Button, Flex, Heading, HStack, Tooltip, useColorModeValue } from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { MouseEventHandler } from "react";
import { useUserContext } from "../context/UserContext";
import LoginButton from "./Button";
import ToggleButton from "./ThemeToggle";

const Navbar = () => {
	const { user, signIn, logout } = useUserContext();

	const { pathname } = useRouter();

	return (
		<HStack justifyContent="space-between" w="full" flexDir={{ base: "column-reverse", sm: "row" }}>
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
							stevenn.tech/
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
				<LoginButton variant="signup" onClick={signIn}>
					Sign In
				</LoginButton>
			</HStack>
		</HStack>
	);
};

export default Navbar;
