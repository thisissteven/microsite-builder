import { Box } from "@chakra-ui/react";
import { ReactNode } from "react";

interface ContainerProps {
	animationDuration: number;
	isFinished: boolean;
	children: ReactNode;
}

const Container = ({ animationDuration, isFinished, children }: ContainerProps) => {
	return (
		<Box
			as="div"
			pointerEvents="none"
			style={{
				opacity: isFinished ? 0 : 1,
				transition: `opacity ${animationDuration}ms linear`,
			}}
		>
			{children}
		</Box>
	);
};

export default Container;
