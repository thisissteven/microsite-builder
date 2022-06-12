import { Box, IconButton, Container, Heading, HStack, Tooltip, useColorModeValue, VStack } from "@chakra-ui/react";
import type { NextPage } from "next";
import Link from "next/link";
import { useUserContext } from "../../components/context/UserContext";
import Layout from "../../components/elements/Layout";
import { MdOutlineAdd } from "react-icons/md";

const Microsite: NextPage = () => {
	const { user } = useUserContext();

	return (
		<Layout>
			<VStack minH="70vh" spacing={8} alignItems={{ base: "flex-start", sm: "center" }} h="full" w="full">
				<Heading size={{ base: "lg", sm: "xl" }}>Microsites you generated</Heading>
				<Tooltip shouldWrapChildren placement="right" opacity={0} label="Create new" aria-label="A tooltip">
					<Link href="/microsite/new">
						<IconButton aria-label="add" sx={{ padding: "4px !important" }} icon={<MdOutlineAdd />}></IconButton>
					</Link>
				</Tooltip>
				<HStack justifyContent="center" w="full" maxW="1000px" flexWrap="wrap" spacing={0} gap={4}></HStack>
			</VStack>
		</Layout>
	);
};

export default Microsite;
