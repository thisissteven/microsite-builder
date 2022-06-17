import { Box, Button, Container, Heading, HStack, Tooltip, useColorModeValue, VStack } from "@chakra-ui/react";
import type { NextPage } from "next";
import { AiFillEye } from "react-icons/ai";
import { AnimatePresence, motion } from "framer-motion";
import { useUserContext } from "../components/context/UserContext";
import Layout from "../components/elements/Layout";
import Link from "next/link";

const Home: NextPage = () => {
	const { user } = useUserContext();

	return (
		<Layout>
			<VStack w="full" spacing={8} alignItems={{ base: "flex-start", sm: "center" }}>
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
					<Link href="/example">
						<Button leftIcon={<AiFillEye />} fontSize="sm" fontWeight="light" variant="link">
							Preview Example
						</Button>
					</Link>

					{user === null ? (
						<Tooltip
							shouldWrapChildren
							w="full"
							h="full"
							opacity={0}
							label={user === null ? "Please sign in before building :D" : ""}
							aria-label="A tooltip"
						>
							<Button variant="solid" fontSize="sm" disabled={true}>
								Start Building
							</Button>
						</Tooltip>
					) : (
						<Link href="/microsite/new">
							<Button variant="solid" fontSize="sm">
								Start Building
							</Button>
						</Link>
					)}
				</HStack>
			</VStack>
		</Layout>
	);
};

export default Home;
