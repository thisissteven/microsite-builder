import React, { ReactNode } from "react";
import { motion } from "framer-motion";
import { HStack } from "@chakra-ui/react";

type Props = {
	children: ReactNode;
};

const variants = {
	hidden: { opacity: 0, x: -200, y: 0 },
	enter: { opacity: 1, x: 0, y: 0 },
	exit: { opacity: 0, x: 0, y: -100 },
};

const MotionHStack = motion(HStack);

const Layout = ({ children }: Props): JSX.Element => (
	<MotionHStack
		initial="hidden"
		animate="enter"
		exit="exit"
		variants={variants}
		transition={{ type: "linear" }}
		h="full"
		w="full"
	>
		{children}
	</MotionHStack>
);

export default Layout;
