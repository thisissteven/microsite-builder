import type { GetServerSidePropsContext, NextPage } from "next";
import React from "react";
import axios from "axios";
import { ParsedUrlQuery } from "querystring";

interface Params extends ParsedUrlQuery {
	shortUrl: string;
}

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
	const { shortUrl } = ctx.params as Params;

	const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/links/?filters[shortUrl][$eq]=${shortUrl}`);

	const url = data?.data[0];

	if (url) {
		return {
			redirect: {
				destination: url.attributes.longUrl,
			},
		};
	} else {
		return {
			redirect: {
				destination: "/",
			},
		};
	}
};

const ShortURL: NextPage = () => {
	return <div></div>;
};

export default ShortURL;
