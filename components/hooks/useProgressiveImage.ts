import * as React from "react";

const useProgressiveImage = (lowSrc: string, highSrc: string): [src: string, blur: boolean] => {
	const [src, setSrc] = React.useState(lowSrc);

	React.useEffect(() => {
		setSrc(lowSrc);

		const img = new Image();
		img.src = highSrc;

		img.onload = () => {
			setSrc(highSrc);
		};
	}, [lowSrc, highSrc]);

	return [src, src === lowSrc];
};

export default useProgressiveImage;
