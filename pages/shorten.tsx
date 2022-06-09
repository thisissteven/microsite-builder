import {
	Box,
	Button,
	Container,
	FormControl,
	FormLabel,
	Heading,
	HStack,
	Input,
	Tooltip,
	useColorModeValue,
	VStack,
} from "@chakra-ui/react";
import type { NextPage } from "next";
import Navbar from "../components/elements/Navbar";
import { AiFillEye } from "react-icons/ai";
import { AnimatePresence, motion } from "framer-motion";
import { useUserContext } from "../components/context/UserContext";

const Shorten: NextPage = () => {
	const { user } = useUserContext();

	return (
		<HStack alignItems="center" h="full">
			<VStack spacing={8} alignItems={{ base: "flex-start", sm: "center" }}>
				<Heading>
					Shorten any{" "}
					<AnimatePresence exitBeforeEnter>
						<Box
							as={motion.span}
							key={useColorModeValue("light", "dark")}
							initial={{ opacity: 0 }}
							animate={{ opacity: 1, transition: { duration: 1 } }}
							exit={{ opacity: 0 }}
							color={useColorModeValue("red.400", "red.300")}
						>
							URL
						</Box>
					</AnimatePresence>{" "}
					instantly!
				</Heading>

				<FormControl>
					<VStack spacing={4} px={4}>
						<Input
							_active={{ border: `2px solid ${useColorModeValue("#616161", "#D9D9D9")}` }}
							_focus={{ border: `2px solid ${useColorModeValue("#616161", "#D9D9D9")}` }}
							p={1}
							placeholder="Enter your long URL"
							variant="filled"
							id="shortUrl"
							size="sm"
						/>
						<HStack spacing={2} alignItems="center" w="full">
							<FormLabel m="0" htmlFor="shortUrl">
								stevenn.tech/
							</FormLabel>
							<Input
								_active={{ border: `2px solid ${useColorModeValue("#616161", "#D9D9D9")}` }}
								_focus={{ border: `2px solid ${useColorModeValue("#616161", "#D9D9D9")}` }}
								p={1}
								placeholder="Enter your short URL"
								variant="filled"
								id="shortUrl"
								size="sm"
							/>
						</HStack>
						<Button alignSelf="flex-end" size="sm" variant="solid">
							Shorten URL
						</Button>
					</VStack>
				</FormControl>
			</VStack>
		</HStack>
	);
};

export default Shorten;
