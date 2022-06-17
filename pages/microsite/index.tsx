import { IconButton, Heading, HStack, Tooltip, VStack } from "@chakra-ui/react";
import type { GetServerSidePropsContext } from "next";
import Link from "next/link";
import Layout from "../../components/elements/Layout";
import { MdOutlineAdd } from "react-icons/md";
import axios from "axios";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import MicrositeCard from "../../components/elements/MicrositeCard";

export interface MicrositeProps {
	displayName: string;
	shortUrl: string;
	micrositeId: string;
	updatedAt: string;
}

interface MicrositeDataProps {
	micrositeData: MicrositeProps[];
}

const Microsite: React.FC<MicrositeDataProps> = ({ micrositeData }) => {
	const [isEditing, setIsEditing] = useState("");
	const [micrositeDatas, setMicrositeDatas] = useState(micrositeData);

	return (
		<Layout>
			<VStack minH="70vh" spacing={8} alignItems={{ base: "flex-start", sm: "center" }} h="full" w="full">
				<Heading size={{ base: "lg", sm: "xl" }}>Microsites you generated</Heading>
				<Tooltip shouldWrapChildren placement="right" opacity={0} label="Create New" aria-label="A tooltip">
					<Link href="/microsite/new">
						<IconButton aria-label="add" sx={{ padding: "4px !important" }} icon={<MdOutlineAdd />}></IconButton>
					</Link>
				</Tooltip>
				<HStack justifyContent="center" w="full" maxW="1000px" flexWrap="wrap" spacing={0} gap={4}>
					<AnimatePresence>
						{micrositeDatas.map((data) => {
							return (
								<MicrositeCard
									key={data.micrositeId}
									{...data}
									micrositeDatas={micrositeDatas}
									setMicrositeDatas={setMicrositeDatas}
									isEditing={isEditing}
									setIsEditing={setIsEditing}
								/>
							);
						})}
					</AnimatePresence>
				</HStack>
			</VStack>
		</Layout>
	);
};

export default Microsite;

const GetMicrosites = async (ctx: GetServerSidePropsContext) => {
	const { token } = ctx.req.cookies;
	const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/microsites`, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});

	const micrositeData = data.map((item: any) => {
		return {
			micrositeId: item.id,
			displayName: item.displayName,
			shortUrl: item.shortUrl,
			updatedAt: item.updatedAt,
		};
	});

	return {
		props: {
			micrositeData,
		},
	};
};

export const getServerSideProps = GetMicrosites;
