import { Box, Button, Container, Heading, HStack, Tooltip, useColorModeValue, VStack } from "@chakra-ui/react";
import type { NextPage } from "next";
import { useUserContext } from "../components/context/UserContext";
import Layout from "../components/elements/Layout";

const Links: NextPage = () => {
	const { user } = useUserContext();

	return (
		<Layout>
			<VStack spacing={8} alignItems={{ base: "flex-start", sm: "center" }}>
				<Heading>This is links</Heading>
			</VStack>
		</Layout>
	);
};

export default Links;
