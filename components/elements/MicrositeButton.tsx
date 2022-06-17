import { Button, useColorModeValue, useToast } from "@chakra-ui/react";
import axios from "axios";
import React, { MouseEventHandler, useEffect, useState } from "react";
import { useMicrositeContext } from "../context/MicrositeContext";
import { useUserContext } from "../context/UserContext";
import { displayToast } from "../functions/displayToast";
import { isValidUrl } from "../functions/isValidUrl";

interface MicrositeButtonProps {
	children: string;
	progress: number;
	setProgress: React.Dispatch<any>;
}

const MicrositeButton: React.FC<MicrositeButtonProps> = ({ children, progress, setProgress }) => {
	const { getValues, background, selectedStyle, size, formData } = useMicrositeContext();
	const toast = useToast();

	const [isLoading, setIsLoading] = useState(false);

	const { user, token } = useUserContext();

	const checkUrl = async () => {
		const unallowedUrl = ["", "shorten", "profile", "links", "microsite", "microsite/new", "microsite/example"];

		const { shortUrl } = getValues();
		setIsLoading(true);
		const { data: linkData } = await axios(
			`${process.env.NEXT_PUBLIC_API_URL}/links?filters[shortUrl][$eq]=${shortUrl}`
		);

		const { data: micrositeData } = await axios(
			`${process.env.NEXT_PUBLIC_API_URL}/microsites?filters[shortUrl][$eq]=${shortUrl}`
		);

		if (linkData?.data?.length === 0 && micrositeData?.data?.length === 0 && !unallowedUrl.includes(shortUrl)) {
			return true;
		}

		if (!toast.isActive("error")) {
			toast(displayToast("taken"));
		}

		setIsLoading(false);
		return false;
	};

	const checkLinks = () => {
		const values = getValues();

		for (const key in values) {
			const isLink = key.slice(key.length - 4, key.length) === "Link";
			const isUser = key.slice(key.length - 4, key.length) === "User";

			if (key == "description" || key == "shortUrl" || key == "title") continue;
			if (values[key] === "" && isUser) {
				!toast.isActive("required") && toast(displayToast("required"));
				return false;
			}
			if (values[key] === "" && isLink) {
				!toast.isActive("required") && toast(displayToast("required"));
				return false;
			}
			if (!isValidUrl(values[key]) && isLink) {
				!toast.isActive("invalid-url") && toast(displayToast("invalid-url"));
				return false;
			}
		}
		return true;
	};

	return (
		<>
			{1 < progress && <Button onClick={() => setProgress(progress - 1)}>Back</Button>}
			<Button
				isLoading={isLoading}
				onClick={async () => {
					if (progress === 3) {
						const res = checkLinks();
						if (!res) {
							return;
						}
					} else if (progress === 4) {
						const res = await checkUrl();
						if (!res) {
							return;
						}

						// post image to cloudinary
						let imageUrl = "";
						if (formData) {
							const { data } = await axios.post(
								`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUD_NAME}/image/upload`,
								formData
							);

							imageUrl = data?.secure_url;
						}

						// post data to strapi
						const values = { ...getValues(), background, selectedStyle, size, imageUrl, user: user?.id };
						await axios.post(
							`${process.env.NEXT_PUBLIC_API_URL}/microsites`,
							{
								data: {
									...values,
								},
							},
							{
								headers: {
									Authorization: `Bearer ${token}`,
								},
							}
						);

						setIsLoading(false);
					}
					setProgress(progress + 1);
				}}
			>
				{progress === 4 ? "Finish" : "Next"}
			</Button>
		</>
	);
};

export default MicrositeButton;
