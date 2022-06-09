import { Box, Button, Container, Heading, HStack, Tooltip, useColorModeValue, VStack } from "@chakra-ui/react";
import type { NextPage } from "next";
import { AiFillEye } from "react-icons/ai";
import { AnimatePresence, motion } from "framer-motion";
import { useUserContext } from "../components/context/UserContext";

const Home: NextPage = () => {
	const { user } = useUserContext();

	return (
		<HStack alignItems="center" h="full">
			<VStack spacing={8} alignItems={{ base: "flex-start", sm: "center" }}>
				<Heading>
					Create your own{" "}
					<AnimatePresence exitBeforeEnter>
						<Box
							as={motion.span}
							key={useColorModeValue("light", "dark")}
							initial={{ opacity: 0 }}
							animate={{ opacity: 1, transition: { duration: 1 } }}
							exit={{ opacity: 0 }}
							color={useColorModeValue("red.400", "red.300")}
						>
							Microsite
						</Box>
					</AnimatePresence>{" "}
					now!
				</Heading>

				<HStack spacing={{ base: 2, sm: 4 }}>
					<Button leftIcon={<AiFillEye />} fontSize="sm" fontWeight="light" variant="link">
						Preview Example
					</Button>
					<Tooltip
						shouldWrapChildren
						w="full"
						h="full"
						opacity={0}
						label={user === null ? "Please sign in before building :D" : ""}
						aria-label="A tooltip"
					>
						<Button variant="solid" fontSize="sm" disabled={user === null}>
							Start Building
						</Button>
					</Tooltip>
				</HStack>
			</VStack>
		</HStack>
	);
};

export default Home;
