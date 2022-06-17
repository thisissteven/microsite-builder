import type { AppProps } from "next/app";
import { Box, Button, ChakraProvider, Container, VStack, Text, HStack } from "@chakra-ui/react";
import theme from "../theme";
import "../theme/styles.css";
import { UserContextProvider } from "../components/context/UserContext";
import Navbar from "../components/modules/Navbar";
import { AnimatePresence } from "framer-motion";
import Head from "next/head";
import BottomNavbar from "../components/modules/BottomNavbar";
import OuterLayout from "../components/elements/OuterLayout";
import ToggleButton from "../components/elements/ThemeToggle";
import Link from "next/link";

function MyApp({ Component, pageProps, router }: AppProps) {
	const internalPaths = ["/", "/shorten", "/links", "/profile", "/microsite/new", "/microsite", "/microsite/example"];

	const { pathname } = router;

	return (
		<>
			<Head>
				<title>stevenn.tech/</title>
				<meta name="viewport" content="initial-scale=1.0, width=device-width" />
			</Head>
			{internalPaths.includes(pathname) && (
				<ChakraProvider theme={theme}>
					<UserContextProvider>
						<Container maxW="container.xl">
							<VStack p={{ base: 2, sm: 8 }} pt={8}>
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
			)}
			{!internalPaths.includes(pathname) && (
				<ChakraProvider theme={theme}>
					<Container minH="100vh" maxW="container.xl" p={8}>
						<Box position="absolute" top={4} right={4}>
							<ToggleButton />
						</Box>
						<VStack p={{ base: 2, sm: 8 }}>
							<OuterLayout>
								<AnimatePresence exitBeforeEnter>
									<Component {...pageProps} key={router.route} />
								</AnimatePresence>
							</OuterLayout>
						</VStack>
						<HStack position="absolute" bottom={4} right={4}>
							<Text fontSize="xs" fontWeight="medium">
								Made using
							</Text>
							<Button
								as="a"
								href={`https://${process.env.NEXT_PUBLIC_SITE_URL}microsite/new`}
								target="_blank"
								rel="noreferrer"
								size="sm"
								px={0}
								sx={{ marginLeft: "4px !important" }}
								bg="transparent"
								_active={{ bg: "transparent", textDecoration: "underline" }}
								_hover={{ textDecoration: "underline" }}
								w="auto"
								cursor="pointer"
							>
								{process.env.NEXT_PUBLIC_SITE_URL}
							</Button>
						</HStack>
					</Container>
				</ChakraProvider>
			)}
		</>
	);
}

export default MyApp;
