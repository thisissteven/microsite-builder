import type { AppProps } from "next/app";
import { ChakraProvider, Container, VStack } from "@chakra-ui/react";
import theme from "../theme";
import "../theme/styles.css";
import { UserContextProvider } from "../components/context/UserContext";
import Navbar from "../components/modules/Navbar";
import { AnimatePresence } from "framer-motion";
import Head from "next/head";
import BottomNavbar from "../components/modules/BottomNavbar";
import OuterLayout from "../components/elements/OuterLayout";

function MyApp({ Component, pageProps, router }: AppProps) {
	return (
		<>
			<Head>
				<title>stevenn.tech/</title>
				<meta name="viewport" content="initial-scale=1.0, width=device-width" />
			</Head>
			<ChakraProvider theme={theme}>
				<UserContextProvider>
					<Container h="100vh" maxW="container.xl">
						<VStack p={{ base: 2, sm: 8 }} pt={8} h="full">
							<Navbar />
							<OuterLayout>
								<AnimatePresence exitBeforeEnter>
									<Component {...pageProps} key={router.route} />
								</AnimatePresence>
							</OuterLayout>
							<BottomNavbar />
						</VStack>
					</Container>
				</UserContextProvider>
			</ChakraProvider>
		</>
	);
}

export default MyApp;
