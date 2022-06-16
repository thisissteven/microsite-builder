import React, { useContext, useEffect, useState } from "react";
import { createContext } from "react";
import { ContextProviderProps, MicrositeContextValue } from "./interface";
import { useForm } from "react-hook-form";
import { useUserContext } from "./UserContext";
import { AiFillLinkedin, AiOutlineInstagram, AiOutlineTwitter, AiOutlineYoutube } from "react-icons/ai";
import { FaFacebookSquare, FaTiktok } from "react-icons/fa";

export const MicrositeContext = createContext({} as MicrositeContextValue);
export const useMicrositeContext = () => useContext(MicrositeContext);

export const MicrositeContextProvider: React.FC<ContextProviderProps> = ({ children }) => {
	const {
		register,
		handleSubmit,
		reset,
		getValues,
		formState: { isSubmitting, errors },
	} = useForm<any>();

	const { user } = useUserContext();

	useEffect(() => {
		reset({ displayName: user?.displayName });
	}, [user]);

	const [background, setBackground] = useState("#000");
	const [size, setSize] = useState("md");
	const [selectedStyle, setSelectedStyle] = useState("full");
	const [imageSrc, setImageSrc] = useState("");
	const [imgName, setImgName] = useState(null);

	const [nonAddedSocials, setNonAddedSocials] = useState([
		{ name: "instagram", label: "Instagram", icon: <AiOutlineInstagram /> },
		{ name: "tiktok", label: "Tiktok", icon: <FaTiktok /> },
		{ name: "facebook", label: "Facebook", icon: <FaFacebookSquare /> },
		{ name: "youtube", label: "YouTube", icon: <AiOutlineYoutube /> },
		{ name: "twitter", label: "Twitter", icon: <AiOutlineTwitter /> },
		{
			name: "linkedIn",
			label: "LinkedIn",
			icon: <AiFillLinkedin />,
		},
	]);

	const [socialMedia, setSocialMedia] = useState([]);

	useEffect(() => {
		let temp = [...nonAddedSocials];
		const values = { ...getValues() };
		temp.map((item) => {
			const user = item.name + "User";
			const link = item.name + "Link";
			delete values[user];
			delete values[link];
		});
		reset({ ...values });
		console.log({ ...values });
	}, [nonAddedSocials]);

	const contextValue: MicrositeContextValue = {
		register,
		handleSubmit,
		reset,
		getValues,
		isSubmitting,
		errors,
		background,
		setBackground,
		size,
		setSize,
		selectedStyle,
		setSelectedStyle,
		imageSrc,
		setImageSrc,
		imgName,
		setImgName,
		socialMedia,
		setSocialMedia,
		nonAddedSocials,
		setNonAddedSocials,
	};

	return <MicrositeContext.Provider value={contextValue}>{children}</MicrositeContext.Provider>;
};
