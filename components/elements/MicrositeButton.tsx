import { Button, useColorModeValue } from "@chakra-ui/react";
import React, { MouseEventHandler } from "react";
import { useMicrositeContext } from "../context/MicrositeContext";

interface MicrositeButtonProps {
	children: string;
	progress: number;
	setProgress: React.Dispatch<any>;
}

const MicrositeButton: React.FC<MicrositeButtonProps> = ({ children, progress, setProgress }) => {
	const { getValues } = useMicrositeContext();

	const checkUrl = () => {
		console.log(getValues());
	};

	return (
		<Button
			onClick={() => {
				if (progress === 4) {
					checkUrl();
					// if fail, return
				}
				setProgress(progress + 1);
			}}
		>
			{progress !== 4 ? "Next" : "Finish"}
		</Button>
	);
};

export default MicrositeButton;
