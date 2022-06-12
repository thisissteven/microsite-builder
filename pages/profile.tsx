import {
	Box,
	Button,
	Flex,
	FormControl,
	FormErrorMessage,
	FormLabel,
	Heading,
	HStack,
	Input,
	useToast,
	VStack,
} from "@chakra-ui/react";
import type { NextPage } from "next";
import { useUserContext } from "../components/context/UserContext";
import Layout from "../components/elements/Layout";
import { useEffect, useState } from "react";
import UserInput from "../components/elements/UserInput";
import { useForm } from "react-hook-form";
import axios from "axios";
import { displayToast } from "../components/functions/displayToast";

interface FormValues {
	displayName: string;
}

const Profile: NextPage = () => {
	const { user, userId, token, refetchName } = useUserContext();
	const toast = useToast();
	const {
		register,
		handleSubmit,
		reset,
		getValues,
		formState: { isSubmitting },
	} = useForm<FormValues>();

	useEffect(() => {
		user?.displayName && reset({ displayName: user?.displayName });
	}, [user]);

	const onSubmit = async (data: any) => {
		if (data.displayName === "") {
			!toast.isActive("required") && toast(displayToast("required"));
			return;
		}
		await axios
			.put(`${process.env.NEXT_PUBLIC_API_URL}/users/${userId}`, data, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			.then(() => {
				refetchName(token);
				!toast.isActive("name-success") && toast(displayToast("nameEditedSuccess"));
			})
			.catch((err) => {
				if (err.response.data.error.message === "This attribute must be unique") {
					!toast.isActive("nameTaken") && toast(displayToast("nameTaken"));
				}
			});
	};

	return (
		<Layout>
			<HStack spacing={8} w="full" h="70vh" alignItems="flex-start">
				<VStack spacing={8} alignItems="flex-start">
					<Heading>Edit Profile</Heading>
					<Box
						as="form"
						display="flex"
						alignItems="flex-end"
						gap={{ base: 0, sm: 2 }}
						flexDir={{ base: "column", sm: "row" }}
						onSubmit={handleSubmit(onSubmit)}
					>
						<FormControl minW={{ base: "240px", sm: "280px" }}>
							<FormLabel mb={{ base: 2, sm: 4 }}>Display Name</FormLabel>
							<UserInput
								placeholder="Edit your display name"
								isInvalid={getValues().displayName === ""}
								register={register}
								name="displayName"
								maxLength={18}
							/>
						</FormControl>
						<Flex w="full" justifyContent="flex-end">
							<Button mt={2} size="sm" isLoading={isSubmitting} type="submit">
								Save
							</Button>
						</Flex>
					</Box>
				</VStack>
			</HStack>
		</Layout>
	);
};

export default Profile;
