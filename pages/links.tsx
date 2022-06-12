import { Flex, Heading, HStack, useBreakpointValue, VStack, Wrap, WrapItem } from "@chakra-ui/react";
import axios from "axios";
import type { GetServerSidePropsContext, NextPage } from "next";
import { useUserContext } from "../components/context/UserContext";
import Layout from "../components/elements/Layout";
import LinkCard from "../components/elements/LinkCard";

export interface LinkProps {
	longUrl: string;
	shortUrl: string;
	linkId: string;
	updatedAt: string;
}

interface LinkDataProps {
	linkData: LinkProps[];
}

const Links: React.FC<LinkDataProps> = ({ linkData }) => {
	return (
		<Layout>
			<VStack spacing={8} alignItems={{ base: "flex-start", sm: "center" }} h="full" w="full">
				<Heading size={{ base: "lg", sm: "xl" }}>Links you generated</Heading>
				<HStack justifyContent="center" w="full" maxW="1000px" flexWrap="wrap" spacing={0} gap={4}>
					{linkData.map((data) => {
						return <LinkCard key={data.linkId} {...data} />;
					})}
				</HStack>
			</VStack>
		</Layout>
	);
};

export default Links;

const GetLinks = async (ctx: GetServerSidePropsContext) => {
	const { token } = ctx.req.cookies;
	const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/links`, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});

	const linkData = data.map((item: any) => {
		return {
			linkId: item.id,
			longUrl: item.longUrl,
			shortUrl: item.shortUrl,
			updatedAt: item.updatedAt,
		};
	});

	return {
		props: {
			linkData,
		},
	};
};

export const getServerSideProps = GetLinks;
