import { Box, Text, HStack, FormLabel, Button, VStack, useColorModeValue } from "@chakra-ui/react";
import React, { useEffect } from "react";
import UserInput from "../../elements/UserInput";
import { useMicrositeContext } from "../../context/MicrositeContext";
import { AnimatePresence, motion } from "framer-motion";

const AddLinks = () => {
	const { register, socialMedia, setSocialMedia, nonAddedSocials, setNonAddedSocials } = useMicrositeContext();

	const bg = useColorModeValue("red.100", "red.300");
	const color = useColorModeValue("red.300", "red.100");

	const addSocial = (name: string, label: string, icon: any) => {
		let social = { name, label, icon };
		let currentSocial = [...socialMedia];
		currentSocial.push(social);
		setSocialMedia(currentSocial);

		let currentNon = nonAddedSocials.filter((social) => {
			return social.name !== name;
		});
		setNonAddedSocials(currentNon);
	};

	const deleteSocial = (socialItem: any) => {
		let currentSocial = socialMedia.filter((social) => {
			return social.name !== socialItem?.name;
		});
		setSocialMedia(currentSocial);

		let currentNon = [...nonAddedSocials];
		currentNon.push(socialItem);
		setNonAddedSocials(currentNon);
	};

	const MotionBox = motion(Box);

	return (
		<Box pb={4} overflow="hidden">
			<VStack justifyContent="center" w="full" mb={2}>
				<Text fontSize="lg" fontWeight="medium">
					Add your socials
				</Text>
				<HStack className="socials" overflowX="auto" px={8}>
					<AnimatePresence>
						{nonAddedSocials.map((social) => {
							return (
								<MotionBox key={social.name} layout exit={{ opacity: 0 }}>
									<Button onClick={() => addSocial(social.name, social.label, social.icon)} leftIcon={social.icon}>
										+
									</Button>
								</MotionBox>
							);
						})}
					</AnimatePresence>
				</HStack>
			</VStack>
			<HStack flexWrap="wrap" spacing={0} gap={4} justifyContent="center">
				<AnimatePresence>
					{socialMedia.map((social) => {
						return (
							<MotionBox layout exit={{ opacity: 0 }} key={social.name} px={4} w="32rem">
								<HStack w="full" justifyContent="space-between">
									<HStack spacing={0} alignItems="center">
										{social.icon}
										<FormLabel htmlFor="" sx={{ mb: 0, pl: 2 }} fontSize={{ base: "sm", sm: "md" }}>
											{social.label}
										</FormLabel>
									</HStack>
									<Button
										size="xs"
										bg="transparent"
										_hover={{
											bg,
											color,
										}}
										_active={{
											bg,
											color,
										}}
										onClick={() => deleteSocial(social)}
									>
										-
									</Button>
								</HStack>
								<HStack
									mt={2}
									spacing={{ base: 0, sm: 4 }}
									gap={{ base: 4, sm: 0 }}
									flexDir={{ base: "column", sm: "row" }}
								>
									<UserInput placeholder="@username" register={register} name={social.name + "User"} maxLength={72} />
									<UserInput placeholder="Link" register={register} name={social.name + "Link"} maxLength={72} />
								</HStack>
							</MotionBox>
						);
					})}
				</AnimatePresence>
			</HStack>
		</Box>
	);
};

export default AddLinks;
