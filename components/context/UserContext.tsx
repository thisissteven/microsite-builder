import React, { useContext, useEffect, useState } from "react";
import { createContext } from "react";
import { auth } from "../config/Firebase";
import axios from "axios";
import { ContextProviderProps, UserContextValue } from "./interface";
import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";
import { useToast } from "@chakra-ui/react";

export const UserContext = createContext({} as UserContextValue);
export const useUserContext = () => useContext(UserContext);

export const UserContextProvider: React.FC<ContextProviderProps> = ({ children }) => {
	const [user, setUser] = useState(null);
	const [token, setToken] = useState("");

	const toast = useToast();

	const signIn = () => {
		const provider = new GoogleAuthProvider();
		signInWithPopup(auth, provider)
			.then(() => {
				toast({
					title: "Welcome aboard.",
					description: "You can now create your own microsites!",
					position: "bottom-right",
					status: "success",
					duration: 9000,
					isClosable: true,
				});
			})
			.catch((err) => console.log(err));
	};

	const logout = () => {
		signOut(auth).then(() => {
			indexedDB.deleteDatabase("firebaseLocalStorageDb");
			setUser(null);
			toast({
				title: "See you another time.",
				description: "Signed out successfully",
				position: "bottom-right",
				status: "success",
				duration: 9000,
				isClosable: true,
			});
		});
	};

	useEffect(() => {
		const authenticate = async (token: string) => {
			const res = await axios
				.post(`${process.env.NEXT_PUBLIC_API_URL}/firebase/auth`, {
					token,
				})
				.catch((err) => console.log(err));

			return res?.data;
		};

		const unsubscribe = onAuthStateChanged(auth, async (res: any) => {
			if (res) {
				try {
					const { accessToken } = res;
					const { jwt, user } = await authenticate(accessToken);
					setUser(user);
					setToken(jwt);
				} catch (error: any) {
					console.log(error);
				}
			}
		});
		return unsubscribe;
	}, []);

	const contextValue: UserContextValue = {
		user,
		token,
		setUser,
		signIn,
		logout,
	};

	return <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>;
};
