import { ReactNode } from "react";

export interface ContextProviderProps {
	children: ReactNode;
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
