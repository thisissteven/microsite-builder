import React, { ReactNode } from "react";
import { HStack } from "@chakra-ui/react";

type Props = {
	children: ReactNode;
};

const OuterLayout = ({ children }: Props): JSX.Element => (
	<HStack position="relative" h="full" w="full">
		{children}
	</HStack>
);

export default OuterLayout;
