import { Box, Button, Flex, Heading, HStack, useColorModeValue, VStack } from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { MouseEventHandler } from "react";
import { useUserContext } from "../context/UserContext";
import { AnimatePresence, motion } from "framer-motion";

const BottomNavbar = () => {
	const { user } = useUserContext();

	const { pathname } = useRouter();

	const listBg = useColorModeValue("#E0E0E0", "#424242");
	const buttonColor = useColorModeValue("#323232", "#EEEEEE");
	const MotionFlex = motion(Flex);

	if (user === null) return <></>;

	return (
		<HStack position="absolute" bottom={0} right={0} py={2} px={4} rounded="lg" spacing={4}>
			<Button variant="link">
				<Link href="/microsite">
					<a>Microsite</a>
				</Link>
			</Button>

			<Button variant="link">
				<Link href="/links">
					<a>Your links</a>
				</Link>
			</Button>
		</HStack>
	);
};

export default BottomNavbar;
