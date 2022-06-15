import { Box, Heading, HStack, Text, useColorModeValue, VStack, Button, Progress } from "@chakra-ui/react";
import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { useUserContext } from "../../components/context/UserContext";
import { AnimatePresence, motion } from "framer-motion";
import SelectTemplate from "../../components/modules/microsite/SelectTemplate";
import { MicrositeContextProvider } from "../../components/context/MicrositeContext";
import SelectStyle from "../../components/modules/microsite/SelectStyle";
import Success from "../../components/modules/microsite/Success";
import AddLinks from "../../components/modules/microsite/AddLinks";
import ChooseUrl from "../../components/modules/microsite/ChooseUrl";

const NewMicrosite: NextPage = () => {
	const [value, setValue] = useState(0);
	const [progress, setProgress] = useState(1);

	const updateProgress = () => {
		const percentage = 20;
		setValue(progress * percentage);
	};

	useEffect(() => {
		updateProgress();
	}, [progress]);

	const MotionText = motion(Text);
	const MotionBox = motion(Box);
	const progressBarColor = useColorModeValue("blackAlpha.200", "whiteAlpha.200");
	const contentBg = useColorModeValue("#EEEEEE", "#323232");

	return (
		<MicrositeContextProvider>
			<VStack minH="70vh" spacing={8} alignItems="flex-start" h="full" w="full" mb={4}>
				<Heading size={{ base: "lg", sm: "xl" }}>Create New Microsite</Heading>
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
					<Box h="full" w="full" bg={contentBg} rounded="sm" py={4}>
						<AnimatePresence exitBeforeEnter>
							{progress === 1 ? (
								<MotionBox key="1" exit={{ opacity: 0 }} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
									<SelectTemplate />
								</MotionBox>
							) : progress === 2 ? (
								<MotionBox key="2" exit={{ opacity: 0 }} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
									<SelectStyle />
								</MotionBox>
							) : progress === 3 ? (
								<MotionBox key="3" exit={{ opacity: 0 }} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
									<AddLinks />
								</MotionBox>
							) : progress === 4 ? (
								<MotionBox key="5" exit={{ opacity: 0 }} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
									<ChooseUrl />
								</MotionBox>
							) : (
								<MotionBox key="4" exit={{ opacity: 0 }} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
									<Success />
								</MotionBox>
							)}
						</AnimatePresence>
					</Box>
					{progress !== 5 ? (
						<HStack w="full" justifyContent="flex-end">
							{1 < progress && <Button onClick={() => setProgress(progress - 1)}>Back</Button>}
							<Button onClick={() => setProgress(progress + 1)}>{progress !== 4 ? "Next" : "Finish"}</Button>
						</HStack>
					) : (
						<HStack w="full" justifyContent="flex-end">
							<Button alignSelf="flex-end" isLoading={true}></Button>
						</HStack>
					)}
				</VStack>
			</VStack>
		</MicrositeContextProvider>
	);
};

export default NewMicrosite;
