import { Box, Progress, HStack, Button, useColorModeValue, VStack } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useMicrositeContext } from "../../context/MicrositeContext";
import SelectStyle from "./SelectStyle";
import Success from "./Success";
import AddLinks from "./AddLinks";
import ChooseUrl from "./ChooseUrl";
import { AnimatePresence, motion } from "framer-motion";
import SelectTemplate from "./SelectTemplate";
import MicrositeButton from "../../elements/MicrositeButton";
import FinishedButton from "../../elements/FinishedButton";

const Microsite = () => {
	const [value, setValue] = useState(0);
	const [progress, setProgress] = useState(1);

	const MotionBox = motion(Box);
	const progressBarColor = useColorModeValue("blackAlpha.200", "whiteAlpha.200");
	const contentBg = useColorModeValue("#EEEEEE", "#323232");

	const updateProgress = () => {
		const percentage = 20;
		setValue(progress * percentage);
	};

	useEffect(() => {
		updateProgress();
	}, [progress]);

	return (
		<>
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
							<MotionBox key="4" exit={{ opacity: 0 }} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
								<ChooseUrl />
							</MotionBox>
						) : (
							<MotionBox key="5" exit={{ opacity: 0 }} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
								<Success />
							</MotionBox>
						)}
					</AnimatePresence>
				</Box>
				{progress !== 5 ? (
					<HStack w="full" justifyContent="flex-end">
						<MicrositeButton setProgress={setProgress} progress={progress}>
							{progress !== 4 ? "Next" : "Finish"}
						</MicrositeButton>
					</HStack>
				) : (
					<HStack w="full" justifyContent="flex-end">
						<FinishedButton />
					</HStack>
				)}
			</VStack>
		</>
	);
};

export default Microsite;
