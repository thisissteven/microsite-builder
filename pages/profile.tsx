import { Box, Button, Container, Heading, HStack, Tooltip, useColorModeValue, VStack } from "@chakra-ui/react";
import type { NextPage } from "next";
import { AiFillEye } from "react-icons/ai";
import { AnimatePresence, motion } from "framer-motion";
import { useUserContext } from "../components/context/UserContext";
import Layout from "../components/elements/Layout";

const Profile: NextPage = () => {
	const { user } = useUserContext();

	return (
		<Layout>
			<VStack spacing={8} alignItems={{ base: "flex-start", sm: "center" }}>
				<Heading>This is profile.</Heading>
			</VStack>
		</Layout>
	);
};

export default Profile;
