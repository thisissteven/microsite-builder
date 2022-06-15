import React, { useContext, useEffect, useState } from "react";
import { createContext } from "react";
import { auth } from "../config/Firebase";
import axios from "axios";
import { ContextProviderProps, UserContextValue } from "./interface";
import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";
import { useToast } from "@chakra-ui/react";
import { destroyCookie, setCookie } from "nookies";
import { useRouter } from "next/router";

export const UserContext = createContext({} as UserContextValue);
export const useUserContext = () => useContext(UserContext);

export const UserContextProvider: React.FC<ContextProviderProps> = ({ children }) => {
	const [user, setUser] = useState(null);
	const [token, setToken] = useState("");
	const [loading, setLoading] = useState(true);
	const [userId, setUserId] = useState(0);

	const toast = useToast();
	const router = useRouter();

	const refetchName = async (token: string) => {
		setLoading(true);
		await axios
			.get(`${process.env.NEXT_PUBLIC_API_URL}/users/me`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			.then((res) => {
				setUser(res.data);
				setLoading(false);
			});
	};

	const signIn = () => {
		const provider = new GoogleAuthProvider();
		signInWithPopup(auth, provider)
			.then((res) => {
				toast({
					title: "Welcome aboard.",
					description: "You can now create your own microsites!",
					position: "bottom-right",
					status: "success",
					duration: 9000,
					isClosable: true,
				});
			})
			.catch((err) => {});
	};

	const logout = () => {
		signOut(auth).then(() => {
			indexedDB.deleteDatabase("firebaseLocalStorageDb");
			setUser(null);
			destroyCookie(null, "token", {
				path: "/",
			});
			toast({
				title: "See you another time.",
				description: "Signed out successfully",
				position: "bottom-right",
				status: "success",
				duration: 9000,
				isClosable: true,
			});
			router.replace("/");
		});
	};

	useEffect(() => {
		const authenticate = async (token: string) => {
			const res = await axios
				.post(`${process.env.NEXT_PUBLIC_API_URL}/firebase/auth`, {
					token,
				})
				.catch((err) => {});

			return res?.data;
		};

		const unsubscribe = onAuthStateChanged(auth, async (res: any) => {
			try {
				let { accessToken } = res;
				if (!res) {
					accessToken = await auth?.currentUser?.getIdToken();
				}
				const { jwt, user } = await authenticate(accessToken);
				setCookie(null, "token", jwt, {
					maxAge: 7 * 24 * 60 * 60,
					path: "/",
				});
				setUser(user);
				setToken(jwt);
				setUserId(user.id);
				console.log(jwt);
			} catch (error: any) {
			} finally {
				setLoading(false);
			}
		});
		return unsubscribe;
	}, []);

	const contextValue: UserContextValue = {
		user,
		token,
		loading,
		userId,
		refetchName,
		setUser,
		signIn,
		logout,
	};

	return <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>;
};
