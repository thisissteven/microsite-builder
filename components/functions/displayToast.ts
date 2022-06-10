const toastTypes: any = {
	"invalid-url": {
		id: "invalid-url",
		title: "URL is invalid. Please enter valid URL.",
		status: "error",
		isClosable: true,
	},
	success: {
		id: "success",
		title: "Url Shortened Successfully!",
		status: "success",
		isClosable: true,
	},
	taken: {
		id: "error",
		title: "Sorry, but that short URL is taken :(",
		status: "error",
		isClosable: true,
	},
};

export const displayToast = (toastType: string) => {
	return toastTypes[toastType];
};
