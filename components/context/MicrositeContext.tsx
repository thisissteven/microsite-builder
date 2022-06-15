import React, { useContext, useEffect, useState } from "react";
import { createContext } from "react";
import { ContextProviderProps, MicrositeContextValue } from "./interface";
import { useForm } from "react-hook-form";
import { useUserContext } from "./UserContext";

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
	};

	return <MicrositeContext.Provider value={contextValue}>{children}</MicrositeContext.Provider>;
};
