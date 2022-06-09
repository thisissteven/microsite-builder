import { Container, Heading, HStack, VStack } from "@chakra-ui/react";
import type { NextPage } from "next";
import { useUserContext } from "../components/context/UserContext";
import LoginButton from "../components/elements/Button";
import ToggleButton from "../components/elements/ThemeToggle";

const Home: NextPage = () => {
	const { user, signIn, logout } = useUserContext();
	console.log(user, signIn, logout);

	return (
		<Container h="100vh" maxW="container.xl">
			<VStack p={{ base: 2, sm: 8 }} pt={8} spacing={8}>
				<HStack justifyContent="space-between" w="full" flexDir={{ base: "column-reverse", sm: "row" }}>
					<Heading
						size="md"
						_hover={{ opacity: 0.5 }}
						pt={{ base: 4, sm: 0 }}
						textAlign="start"
						w="full"
						transitionDuration="300ms"
						cursor="pointer"
					>
						stevenn.tech
					</Heading>
					<HStack
						sx={{ margin: "0px !important" }}
						spacing={4}
						alignItems="center"
						justifyContent="space-between"
						w={{ base: "full", sm: "auto" }}
					>
						<ToggleButton />
						<LoginButton variant="signup" onClick={signIn}>
							Log In
						</LoginButton>
					</HStack>
				</HStack>
			</VStack>
		</Container>
	);
};

export default Home;
