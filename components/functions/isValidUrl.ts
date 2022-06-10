export const isValidUrl = (longUrl: string) => {
	let url;

	try {
		url = new URL(longUrl);
	} catch (_) {
		return false;
	}

	return url.protocol === "http:" || url.protocol === "https:";
};
