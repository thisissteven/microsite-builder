import {
	Button,
	Flex,
	Heading,
	HStack,
	IconButton,
	Tooltip,
	useBreakpointValue,
	VStack,
	Wrap,
	WrapItem,
} from "@chakra-ui/react";
import axios from "axios";
import type { GetServerSidePropsContext, NextPage } from "next";
import { useState } from "react";
import { useUserContext } from "../components/context/UserContext";
import Layout from "../components/elements/Layout";
import Link from "next/link";
import LinkCard from "../components/elements/LinkCard";
import { MdOutlineAdd } from "react-icons/md";

interface LinkProps {
	longUrl: string;
	shortUrl: string;
	linkId: string;
	updatedAt: string;
}

interface LinkDataProps {
	linkData: LinkProps[];
}

const Links: React.FC<LinkDataProps> = ({ linkData }) => {
	const [isEditing, setIsEditing] = useState("");
	return (
		<Layout>
			<VStack spacing={8} alignItems={{ base: "flex-start", sm: "center" }} h="full" w="full">
				<Heading size={{ base: "lg", sm: "xl" }}>Links you generated</Heading>
				<Tooltip shouldWrapChildren placement="right" opacity={0} label="Add more links" aria-label="A tooltip">
					<Link href="/shorten">
						<IconButton aria-label="add" sx={{ padding: "4px !important" }} icon={<MdOutlineAdd />}></IconButton>
					</Link>
				</Tooltip>
				<HStack justifyContent="center" w="full" maxW="1000px" flexWrap="wrap" spacing={0} gap={4}>
					{linkData.map((data) => {
						return <LinkCard key={data.linkId} {...data} isEditing={isEditing} setIsEditing={setIsEditing} />;
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
