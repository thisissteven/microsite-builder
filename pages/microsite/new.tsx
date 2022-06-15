import { Heading, VStack } from "@chakra-ui/react";
import type { NextPage } from "next";
import { MicrositeContextProvider } from "../../components/context/MicrositeContext";
import Microsite from "../../components/modules/microsite/Microsite";

const NewMicrosite: NextPage = () => {
	return (
		<MicrositeContextProvider>
			<VStack minH="70vh" spacing={8} alignItems="flex-start" h="full" w="full" mb={4}>
				<Heading size={{ base: "lg", sm: "xl" }}>Create New Microsite</Heading>
				<Microsite />
			</VStack>
		</MicrositeContextProvider>
	);
};

export default NewMicrosite;
