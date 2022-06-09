import type { AppProps } from "next/app";
import { ChakraProvider, Container, VStack } from "@chakra-ui/react";
import theme from "../theme";
import "../theme/styles.css";
import { UserContextProvider } from "../components/context/UserContext";
import Navbar from "../components/elements/Navbar";
import { AnimatePresence } from "framer-motion";

function MyApp({ Component, pageProps, router }: AppProps) {
	return (
		<ChakraProvider theme={theme}>
			<UserContextProvider>
				<Container h="100vh" maxW="container.xl">
					<VStack p={{ base: 2, sm: 8 }} pt={8} spacing={8} h="full">
						<Navbar />
						<AnimatePresence exitBeforeEnter>
							<Component {...pageProps} key={router.route} />
						</AnimatePresence>
					</VStack>
				</Container>
			</UserContextProvider>
		</ChakraProvider>
	);
}

export default MyApp;
