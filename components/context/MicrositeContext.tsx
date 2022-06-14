import React, { useContext, useEffect, useState } from "react";
import { createContext } from "react";
import { ContextProviderProps, MicrositeContextValue } from "./interface";
import { useForm } from "react-hook-form";

export const MicrositeContext = createContext({} as MicrositeContextValue);
export const useMicrositeContext = () => useContext(MicrositeContext);

export const MicrositeContextProvider: React.FC<ContextProviderProps> = ({ children }) => {
	const {
		register,
		handleSubmit,
		reset,
		getValues,
		formState: { isSubmitting },
	} = useForm<any>();

	const [background, setBackground] = useState("#fff");

	const contextValue: MicrositeContextValue = {
		register,
		handleSubmit,
		reset,
		getValues,
		isSubmitting,
		background,
		setBackground,
	};

	return <MicrositeContext.Provider value={contextValue}>{children}</MicrositeContext.Provider>;
};
