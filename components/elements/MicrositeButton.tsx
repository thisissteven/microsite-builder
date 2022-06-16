import { Button, useColorModeValue, useToast } from "@chakra-ui/react";
import axios from "axios";
import React, { MouseEventHandler, useEffect, useState } from "react";
import { useMicrositeContext } from "../context/MicrositeContext";
import { displayToast } from "../functions/displayToast";

interface MicrositeButtonProps {
	children: string;
	progress: number;
	setProgress: React.Dispatch<any>;
}

const MicrositeButton: React.FC<MicrositeButtonProps> = ({ children, progress, setProgress }) => {
	const { getValues } = useMicrositeContext();
	const toast = useToast();

	const [isLoading, setIsLoading] = useState(false);

	const checkUrl = async () => {
		const { shortUrl } = getValues();
		setIsLoading(true);
		const { data } = await axios(`${process.env.NEXT_PUBLIC_API_URL}/microsites?filters[shortUrl][$eq]=${shortUrl}`);

		if (data?.data?.length > 0) {
			!toast.isActive("taken") && toast(displayToast("taken"));
			setIsLoading(false);
			return false;
		}

		setIsLoading(false);
		return true;
	};

	const checkLinks = () => {
		const values = getValues();
		for (const key in values) {
			if (key == "description" || key == "shortUrl" || key == "title") continue;
			if (values[key] === "") {
				!toast.isActive("required") && toast(displayToast("required"));
				return false;
			}
		}
		return true;
	};

	return (
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
					// post data to strapi
				}
				setProgress(progress + 1);
			}}
		>
			{progress === 4 ? "Finish" : "Next"}
		</Button>
	);
};

export default MicrositeButton;
