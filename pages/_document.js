// pages/_document.js
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
	return (
		<Html>
			<Head></Head>
			<body className="scrollbar">
				<Main />
				<NextScript />
			</body>
		</Html>
	);
}
