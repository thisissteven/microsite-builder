const hex2rgb = (hex: string) => {
	const r = parseInt(hex.slice(1, 3), 16);
	const g = parseInt(hex.slice(3, 5), 16);
	const b = parseInt(hex.slice(5, 7), 16);
	// return {r, g, b} // return an object
	return [r, g, b];
};

// source: https://codepen.io/WebSeed/pen/pvgqEq?editors=1010

export const whiteOrBlack = (hex: string) => {
	const [r, g, b] = hex2rgb(hex);
	// Counting the perceptive luminance
	// human eye favors green color...
	let a = 1 - (0.299 * r + 0.587 * g + 0.114 * b) / 255;
	return a < 0.5 ? "black" : "white";
};

export const invertColor = (col: string) => {
	col = col.toLowerCase();
	const colors = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f"];
	let inverseColor = "#";
	col
		.replace("#", "")
		.split("")
		.forEach((i) => {
			const index = colors.indexOf(i);
			inverseColor += colors.reverse()[index];
		});
	return inverseColor;
};
