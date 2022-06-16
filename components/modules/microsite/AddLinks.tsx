import { Box, Text, HStack, FormLabel, Button } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import UserInput from "../../elements/UserInput";
import { useMicrositeContext } from "../../context/MicrositeContext";
import { AiOutlineInstagram, AiOutlineYoutube } from "react-icons/ai";
import { FaTiktok, FaFacebookSquare } from "react-icons/fa";

const AddLinks = () => {
	const { register } = useMicrositeContext();

	const [socialMedia, setSocialMedia] = useState([
		{ name: "instagram", label: "Instagram", icon: <AiOutlineInstagram /> },
		{ name: "tiktok", label: "Tiktok", icon: <FaTiktok /> },
		{ name: "facebook", label: "Facebook", icon: <FaFacebookSquare /> },
		{ name: "youtube", label: "YouTube", icon: <AiOutlineYoutube /> },
	]);

	const addSocial = (name: string, label: string, icon: any) => {
		let social = { name, label, icon };
		let currentSocial = [...socialMedia];
		currentSocial.push(social);
		setSocialMedia(currentSocial);
	};

	useEffect(() => {
		console.log(socialMedia);
	}, [socialMedia]);

	const deleteSocial = (name: string) => {
		let currentSocial = socialMedia.filter((social) => {
			return social.name !== name;
		});
		setSocialMedia(currentSocial);
	};

	return (
		<Box pb={4}>
			<HStack justifyContent="center" w="full" mb={2}>
				<Text fontSize="lg" fontWeight="medium">
					Add some links
				</Text>
				<Button onClick={() => addSocial("linkedIn", "LinkedIn", <FaTiktok />)}>Add</Button>
			</HStack>
			<HStack flexWrap="wrap" spacing={0} gap={4} justifyContent="center">
				{socialMedia.map((social) => {
					return (
						<Box key={social.name} px={4} w="32rem">
							<HStack spacing={0} alignItems="center">
								{social.icon}
								<FormLabel htmlFor="" sx={{ mb: 0, pl: 2 }} fontSize={{ base: "sm", sm: "md" }}>
									{social.label}
								</FormLabel>
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
						</Box>
					);
				})}
			</HStack>
		</Box>
	);
};

export default AddLinks;
