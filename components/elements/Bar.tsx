import { Box } from "@chakra-ui/react";

interface BarProps {
	animationDuration: number;
	progress: number;
}

const Bar = ({ animationDuration, progress }: BarProps) => {
	return (
		<Box
			as="div"
			w="full"
			bg="purple.400"
			h={1}
			position="fixed"
			left={0}
			top={0}
			zIndex={50}
			style={{
				marginLeft: `${(-1 + progress) * 10}%`,
				transition: `margin-left ${animationDuration}ms linear`,
			}}
		></Box>
	);
};

export default Bar;
