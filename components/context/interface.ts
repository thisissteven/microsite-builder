import { ReactNode } from "react";

export interface ContextProviderProps {
	children: ReactNode;
}

export interface UserContextValue {
	user: any;
	token: string;
	setUser: React.Dispatch<any>;
	signIn: () => void;
	logout: () => void;
}
