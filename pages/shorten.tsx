import {
	Box,
	Button,
	FormControl,
	FormLabel,
	Heading,
	HStack,
	Input,
	useColorModeValue,
	useToast,
	VStack,
} from "@chakra-ui/react";
import type { NextPage } from "next";
import { AnimatePresence, motion } from "framer-motion";
import Layout from "../components/elements/Layout";
import { SubmitHandler, useForm } from "react-hook-form";
import axios from "axios";
import { useEffect, useState } from "react";
import Dialog from "../components/elements/Dialog";
import { isValidUrl } from "../components/functions/isValidUrl";
import { displayToast } from "../components/functions/displayToast";
import { useUserContext } from "../components/context/UserContext";

interface FormValues {
	longUrl: string;
	shortUrl: string;
}

const Shorten: NextPage = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [shortenedLink, setShortenedLink] = useState("");
	const inputBorder = { border: `2px solid ${useColorModeValue("#616161", "#D9D9D9")}` };

	const {
		register,
		handleSubmit,
		reset,
		formState: { isSubmitting },
	} = useForm<FormValues>();

	const [errorType, setErrorType] = useState<"longUrl" | "shortUrl">();
	const { user, token } = useUserContext();

	const toast = useToast();

	const shortenUrl: SubmitHandler<FormValues> = async (data) => {
		if (!isValidUrl(data.longUrl)) {
			if (!toast.isActive("invalid-url")) {
				setErrorType("longUrl");
				toast(displayToast("invalid-url"));
			}
			return;
		}

		const unallowedUrl = ["", "shorten", "profile", "links", "microsite", "microsite/new", "microsite/example"];

		const { data: micrositeData } = await axios(
			`${process.env.NEXT_PUBLIC_API_URL}/microsites?filters[shortUrl][$eq]=${data.shortUrl}`
		);

		if (unallowedUrl.includes(data.shortUrl) || micrositeData?.data?.length > 0) {
			setErrorType("shortUrl");
			!toast.isActive("error") && toast(displayToast("taken"));
			return;
		}

		await axios
			.post(
				`${process.env.NEXT_PUBLIC_API_URL}/links`,
				{
					data: token ? { ...data, user: user?.id } : data,
				},
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			)
			.then((res) => {
				if (!toast.isActive("success")) {
					setErrorType(undefined);
					toast(displayToast("success"));
				}
				setShortenedLink(data.shortUrl);
				reset({ longUrl: "", shortUrl: "" });
				setIsOpen(true);
			})
			.catch((err) => {
				const errorMessage: String = err.response.data.error.message;
				if (errorMessage === "This attribute must be unique" && !toast.isActive("error")) {
					setErrorType("shortUrl");
					toast(displayToast("taken"));
				}
			});
	};

	return (
		<Layout>
			<VStack w="full">
				<VStack spacing={8} alignItems={{ base: "flex-start", sm: "center" }}>
					<Heading>
						Shorten any{" "}
						<AnimatePresence exitBeforeEnter>
							<Box
								as={motion.span}
								key={useColorModeValue("light", "dark")}
								initial={{ opacity: 0 }}
								animate={{ opacity: 1, transition: { duration: 1 } }}
								exit={{ opacity: 0 }}
								color={useColorModeValue("red.400", "red.300")}
							>
								URL
							</Box>
						</AnimatePresence>{" "}
						instantly!
					</Heading>
					<Box as="form" onSubmit={handleSubmit(shortenUrl)} w="full">
						<FormControl>
							<VStack spacing={4} px={{ base: 0, sm: 4 }}>
								<Input
									{...register("longUrl")}
									autoComplete="off"
									isInvalid={errorType === "longUrl"}
									errorBorderColor="red.300"
									_active={inputBorder}
									_focus={inputBorder}
									p={1}
									placeholder="Enter your long URL"
									variant="filled"
									size="sm"
									id="shortUrl"
								/>
								<HStack spacing={2} alignItems="center" w="full">
									<FormLabel m="0" htmlFor="shortUrl">
										{process.env.NEXT_PUBLIC_SITE_URL}
									</FormLabel>
									<Input
										{...register("shortUrl")}
										autoComplete="off"
										isInvalid={errorType === "shortUrl"}
										errorBorderColor="red.300"
										_active={inputBorder}
										_focus={inputBorder}
										p={1}
										placeholder="Enter your short URL"
										variant="filled"
										size="sm"
										id="shortUrl"
									/>
								</HStack>
								<Button isLoading={isSubmitting} alignSelf="flex-end" size="sm" variant="solid" type="submit">
									Shorten URL
								</Button>
								<Dialog isOpen={isOpen} setIsOpen={setIsOpen} shortenedLink={shortenedLink} />
							</VStack>
						</FormControl>
					</Box>
				</VStack>
			</VStack>
		</Layout>
	);
};

export default Shorten;
