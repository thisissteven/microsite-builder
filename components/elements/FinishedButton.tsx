import { Button, useColorModeValue, useToast } from "@chakra-ui/react";
import axios from "axios";
import React, { MouseEventHandler, useEffect, useState } from "react";
import { useMicrositeContext } from "../context/MicrositeContext";
import { useUserContext } from "../context/UserContext";
import { displayToast } from "../functions/displayToast";

const FinishedButton = () => {
	const { getValues } = useMicrositeContext();

	const { shortUrl } = getValues();

	return (
		<Button
			alignSelf="flex-end"
			as="a"
			href={`https://${process.env.NEXT_PUBLIC_SITE_URL}${shortUrl}`}
			target="_blank"
			rel="noreferrer"
		>
			View Site
		</Button>
	);
};

export default FinishedButton;
