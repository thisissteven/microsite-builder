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
import SelectTemplate from "../../components/modules/microsite/SelectTemplate";
import { MicrositeContextProvider } from "../../components/context/MicrositeContext";

const progressTitle = [
	"1. Select Template",
	"2. Pick a Style",
	"3. Name Your Microsite",
	"4. Congratulations! Your Microsite is done!",
];

const NewMicrosite: NextPage = () => {
	const { token } = useUserContext();
	const [value, setValue] = useState(0);
	const [progress, setProgress] = useState(1);
	const [title, setTitle] = useState("");

	const updateProgress = () => {
		const percentage = 25;
		setValue(progress * percentage);
		setTitle(progressTitle[progress - 1]);
	};

	useEffect(() => {
		updateProgress();
	}, [progress]);

	const MotionText = motion(Text);
	const progressBarColor = useColorModeValue("blackAlpha.200", "whiteAlpha.200");
	const contentBg = useColorModeValue("#EEEEEE", "#323232");

	return (
		<MicrositeContextProvider>
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
					<VStack
						h="full"
						w="full"
						spacing={{ base: 2, sm: 4 }}
						bg={progressBarColor}
						rounded="md"
						overflow="hidden"
						py={{ base: 2, sm: 4 }}
						px={{ base: 2, sm: 4 }}
					>
						<Box h="full" w="full" bg={contentBg} rounded="sm" className="scrollbar" py={4}>
							<SelectTemplate />
						</Box>
						{progress !== 4 ? (
							<HStack w="full" justifyContent="flex-end">
								{1 < progress && <Button onClick={() => setProgress(progress - 1)}>Back</Button>}
								<Button onClick={() => setProgress(progress + 1)}>{progress !== 3 ? "Next" : "Finish"}</Button>
							</HStack>
						) : (
							<Button alignSelf="flex-end" isLoading={true}></Button>
						)}
					</VStack>
				</VStack>
			</Layout>
		</MicrositeContextProvider>
	);
};

export default NewMicrosite;
