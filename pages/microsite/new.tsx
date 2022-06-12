import { Box, IconButton, Container, Heading, HStack, Tooltip, useColorModeValue, VStack } from "@chakra-ui/react";
import type { NextPage } from "next";
import Link from "next/link";
import { useUserContext } from "../../components/context/UserContext";
import Layout from "../../components/elements/Layout";
import { MdOutlineAdd } from "react-icons/md";

const NewMicrosite: NextPage = () => {
	const { user } = useUserContext();

	return (
		<Layout>
			<VStack minH="70vh" spacing={8} alignItems={{ base: "flex-start", sm: "center" }} h="full" w="full">
				<Heading size={{ base: "lg", sm: "xl" }}>Welcome</Heading>
			</VStack>
		</Layout>
	);
};

export default NewMicrosite;
