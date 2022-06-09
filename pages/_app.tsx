import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "../theme";
import "../theme/styles.css";
import { UserContextProvider } from "../components/context/UserContext";

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<ChakraProvider theme={theme}>
			<UserContextProvider>
				<Component {...pageProps} />
			</UserContextProvider>
		</ChakraProvider>
	);
}

export default MyApp;
