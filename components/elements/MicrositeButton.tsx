import { Button, useColorModeValue, useToast } from "@chakra-ui/react";
import React, { MouseEventHandler } from "react";
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

	const checkUrl = () => {
		console.log(getValues());
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
			onClick={() => {
				if (progress === 3) {
					const res = checkLinks();
					if (!res) return;
					// if fail, return
				}
				if (progress === 4) {
					const res = checkUrl();
					// if (!res) return;
				}
				setProgress(progress + 1);
			}}
		>
			{progress !== 4 ? "Next" : "Finish"}
		</Button>
	);
};

export default MicrositeButton;
