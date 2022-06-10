import { Box, Button, Container, Heading, HStack, Tooltip, useColorModeValue, VStack } from "@chakra-ui/react";
import type { NextPage } from "next";
import { AiFillEye } from "react-icons/ai";
import { AnimatePresence, motion } from "framer-motion";
import { useUserContext } from "../components/context/UserContext";
import Layout from "../components/elements/Layout";
import Sidebar from "../components/modules/Sidebar";

const Profile: NextPage = () => {
	const { user } = useUserContext();

	return (
		<Layout>
			<HStack spacing={8} h="full">
				<Sidebar />
				<VStack spacing={8} alignItems={{ base: "flex-start", sm: "center" }}>
					<Heading>This is profile.</Heading>
				</VStack>
			</HStack>
		</Layout>
	);
};

export default Profile;
