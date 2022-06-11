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
	VStack,
} from "@chakra-ui/react";
import type { NextPage } from "next";
import { useUserContext } from "../components/context/UserContext";
import Layout from "../components/elements/Layout";
import { useEffect, useState } from "react";
import UserInput from "../components/elements/UserInput";
import { useForm } from "react-hook-form";
import axios from "axios";

interface FormValues {
	displayName: string;
}

const Profile: NextPage = () => {
	const { user, userId, token, refetchName } = useUserContext();
	const {
		register,
		handleSubmit,
		reset,
		formState: { isSubmitting, errors },
	} = useForm<FormValues>();

	useEffect(() => {
		user?.displayName && reset({ displayName: user?.displayName });
	}, [user]);

	const onSubmit = async (data: any) => {
		await axios
			.put(`${process.env.NEXT_PUBLIC_API_URL}/users/${userId}`, data, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			.then((res) => refetchName(token));
	};

	return (
		<Layout>
			<HStack spacing={8} h="full" w="full" alignItems="flex-start">
				<VStack spacing={8} w="full" alignItems="flex-start">
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
								errorType={errors?.displayName?.type}
								register={register}
								name="displayName"
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
