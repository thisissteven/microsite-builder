import type { GetServerSidePropsContext, NextPage } from "next";
import React from "react";
import axios from "axios";
import { ParsedUrlQuery } from "querystring";
import Head from "next/head";
import { Box, Button, Heading, HStack, Icon, Text, VStack } from "@chakra-ui/react";
import { whiteOrBlack } from "../components/functions/whiteOrBlack";
import { FaFacebookSquare, FaTiktok } from "react-icons/fa";
import { AiOutlineInstagram, AiOutlineYoutube } from "react-icons/ai";

interface Params extends ParsedUrlQuery {
	shortUrl: string;
}

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
	const { shortUrl } = ctx.params as Params;

	let { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/links/?filters[shortUrl][$eq]=${shortUrl}`);

	const url = data?.data[0];

	if (url) {
		return {
			redirect: {
				destination: url.attributes.longUrl,
			},
		};
	} else {
		let { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/microsites/?filters[shortUrl][$eq]=${shortUrl}`);

		const microsite = data?.data[0]?.attributes;
		return {
			props: {
				...microsite,
			},
		};
	}
};

interface MicrositeDataProps {
	displayName: string;
	background: string;
	description: string | null;
	facebookLink: string | null;
	facebookUser: string | null;
	instagramLink: string | null;
	instagramUser: string | null;
	tiktokLink: string | null;
	tiktokUser: string | null;
	youtubeLink: string | null;
	youtubeUser: string | null;
	size: "sm" | "md" | "lg";
	selectedStyle: "full" | "2xl" | "xl" | "lg" | "md" | "sm";
	createdAt: string;
	updatedAt: string;
	publishedAt: string;
	shortUrl: string;
}

const ShortURL: React.FC<MicrositeDataProps> = ({
	displayName,
	background,
	description,
	facebookLink,
	facebookUser,
	instagramLink,
	instagramUser,
	tiktokLink,
	tiktokUser,
	youtubeLink,
	youtubeUser,
	size,
	selectedStyle,
}) => {
	const socials = [
		{
			name: facebookUser,
			link: facebookLink,
			icon: FaFacebookSquare,
		},
		{
			name: instagramUser,
			link: instagramLink,
			icon: AiOutlineInstagram,
		},
		{
			name: tiktokUser,
			link: tiktokLink,
			icon: FaTiktok,
		},
		{
			name: youtubeUser,
			link: youtubeLink,
			icon: AiOutlineYoutube,
		},
	];

	return (
		<>
			<Head>
				<title>{displayName} - Microsite</title>
			</Head>
			<VStack w="full" h="70vh" justifyContent="center">
				<VStack pb={8} spacing={4}>
					<Box
						position="relative"
						bg="whiteAlpha.400"
						w={{ base: 12, sm: 16 }}
						h={{ base: 12, sm: 16 }}
						rounded="lg"
					></Box>
					<Heading size="md" fontWeight="medium">
						{displayName}
					</Heading>
					<Text>{description}</Text>
				</VStack>
				<VStack spacing={4}>
					{socials.map((social, index) => {
						if (social.name === null || social.link === null) {
							return;
						}
						return (
							<HStack as="a" href={social.link} target="_blank" rel="noreferrer" key={index} w="full">
								<Button
									flex={1}
									rounded={selectedStyle}
									bg={background}
									_hover={{ bg: background, opacity: 0.9 }}
									_active={{ bg: background, opacity: 0.8 }}
									size={size}
									p={4}
									color={whiteOrBlack(background)}
									overflow="hidden"
									position="relative"
									justifyContent="flex-start"
									alignItems="center"
									pl={16}
									pr={8}
								>
									<Icon position="absolute" left={4} as={social.icon} w={6} h={6} />@{social.name}
								</Button>
							</HStack>
						);
					})}
				</VStack>
			</VStack>
		</>
	);
};

export default ShortURL;
