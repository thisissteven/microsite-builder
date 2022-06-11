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
	nameEditedSuccess: {
		id: "name-success",
		title: "Changes saved successfully.",
		status: "success",
		isClosable: true,
	},
	required: {
		id: "required",
		title: "Please fill out all fields.",
		status: "error",
		isClosable: true,
	},
	nameTaken: {
		id: "nameTaken",
		title: "Sorry, but that name is taken :(",
		status: "error",
		isClosable: true,
	},
};

export const displayToast = (toastType: string) => {
	return toastTypes[toastType];
};
