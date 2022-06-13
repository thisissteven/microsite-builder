import {
	Box,
	IconButton,
	Container,
	Heading,
	HStack,
	Text,
	useColorModeValue,
	VStack,
	Button,
	Progress,
} from "@chakra-ui/react";
import type { NextPage } from "next";
import Layout from "../../components/elements/Layout";
import { useEffect, useState } from "react";
import { useUserContext } from "../../components/context/UserContext";
import { AnimatePresence, motion } from "framer-motion";

const progressTitle = ["1. Select Template", "2. Name Your Microsite", "3. Congratulations! Your Microsite is done!"];

const NewMicrosite: NextPage = () => {
	const { token } = useUserContext();
	const [value, setValue] = useState(0);
	const [progress, setProgress] = useState(1);
	const [title, setTitle] = useState("");

	const updateProgress = () => {
		const percentage = 33.3;
		setValue(progress * percentage);
		setTitle(progressTitle[progress - 1]);
	};

	useEffect(() => {
		updateProgress();
	}, [progress]);

	const MotionText = motion(Text);
	const progressBarColor = useColorModeValue("blackAlpha.300", "whiteAlpha.200");
	const contentBg = useColorModeValue("blackAlpha.200", "whiteAlpha.100");

	return (
		<Layout>
			<VStack minH="70vh" spacing={8} alignItems="flex-start" h="full" w="full" mb={4}>
				<Heading size={{ base: "lg", sm: "xl" }}>Create New Microsite</Heading>
				<AnimatePresence exitBeforeEnter initial={false}>
					<MotionText
						fontSize="lg"
						initial={{ x: -100, opacity: 0 }}
						animate={{ x: 0, opacity: 1, transition: { duration: 0.3 } }}
						key={title}
					>
						{title}
					</MotionText>
				</AnimatePresence>
				<Progress
					sx={{
						"& > div:first-of-type": {
							transitionProperty: "width",
						},
					}}
					value={value}
					size="xs"
					bg={progressBarColor}
					colorScheme={"green"}
					w="full"
					rounded="md"
				/>
				<VStack h="60vh" w="full" spacing={4} bg={progressBarColor} rounded="md" overflow="hidden" p={4}>
					<Box h="full" w="full" bg={contentBg} rounded="sm"></Box>
					{progress !== 3 ? (
						<HStack w="full" justifyContent="flex-end">
							{1 < progress && <Button onClick={() => setProgress(progress - 1)}>Back</Button>}
							<Button onClick={() => setProgress(progress + 1)}>Next</Button>
						</HStack>
					) : (
						<Button alignSelf="flex-end" isLoading={true}></Button>
					)}
				</VStack>
			</VStack>
		</Layout>
	);
};

export default NewMicrosite;
