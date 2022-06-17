import React, { ReactNode } from "react";
import { UseFormGetValues, UseFormHandleSubmit, UseFormRegister, UseFormReset } from "react-hook-form";

export interface ContextProviderProps {
	children: ReactNode;
}

export interface MicrositeContextValue {
	register: UseFormRegister<any>;
	handleSubmit: UseFormHandleSubmit<any>;
	reset: UseFormReset<any>;
	getValues: UseFormGetValues<any>;
	isSubmitting: boolean;
	errors: any;
	background: string;
	setBackground: React.Dispatch<any>;
	size: string;
	setSize: React.Dispatch<any>;
	selectedStyle: string;
	setSelectedStyle: React.Dispatch<any>;
	imageSrc: string;
	setImageSrc: React.Dispatch<any>;
	imgName: string | null;
	setImgName: React.Dispatch<any>;
	socialMedia: { name: string; label: string; icon: JSX.Element }[];
	setSocialMedia: React.Dispatch<any>;
	nonAddedSocials: { name: string; label: string; icon: JSX.Element }[];
	setNonAddedSocials: React.Dispatch<any>;
	formData: any | null;
	setFormData: React.Dispatch<any>;
}

export interface UserContextValue {
	user: any;
	token: string;
	loading: boolean;
	userId: number;
	refetchName: (token: string) => void;
	setUser: React.Dispatch<any>;
	signIn: () => void;
	logout: () => void;
}
