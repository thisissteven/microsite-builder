import { extendTheme, theme as base } from "@chakra-ui/react";
import { mode, StyleFunctionProps } from "@chakra-ui/theme-tools";

const theme = extendTheme({
	fonts: {
		heading: `Poppins, ${base.fonts?.heading}`,
		body: `Poppins, ${base.fonts?.body}`,
	},
	styles: {
		global: (props: StyleFunctionProps) => ({
			body: {
				bg: mode("#EEEEEE", "#323232")(props),
			},
		}),
	},
});

export default theme;
