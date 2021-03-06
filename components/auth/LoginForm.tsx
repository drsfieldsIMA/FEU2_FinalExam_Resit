/** @format */

import type { NextPage } from "next";
import React from "react";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.scss";
import { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import NextLink from "next/link";
import { yupResolver } from "@hookform/resolvers/yup";
import {
	Box,
	Button,
	Container,
	Grid,
	Link,
	TextField,
	Typography,
} from "@mui/material";
import router from "next/router";
import { duplicatedPassword } from "../clickHandlers/checkNumberOnCard";

const schema = yup.object().shape({
	email: yup.string().required("Please enter your email"),
	password: yup.string().required("Please enter your password"),
});

function LoginForm() {
	const [submitting, setSubmitting] = useState(false);
	const [isValid, setIsValid] = useState(false);
	const [focusMessage, setMessage] = useState("");
	const [isLoginValid, setIsLoginValid] = useState(false);
	const [focusLoginMessage, setFocusMessage] = useState("");

	const { register, handleSubmit } = useForm({
		resolver: yupResolver(schema),
	});

	const registration: object | any = localStorage.getItem("registration");
	if (!registration) {
		setFocusMessage(
			"You need to register before you can gain access to the web app"
		);
	}

	const nameRegex = /\S/;

	const validateName = (event: React.ChangeEvent<any>) => {
		const name = event.target.value;
		if (nameRegex.test(name) && name.length > 4) {
			setIsValid(true);
			setMessage("Your Name looks good");
		} else {
			setIsValid(false);
			setMessage("Please enter a name with more than 3 characters!");
		}
	};

	const [isValidPassword, setIsValidPassword] = useState(false);
	const [focusMessagePassword, setFocusMessagePassword] = useState("");

	const passwordRegex = /\S/;

	const validatePassword = (event: React.ChangeEvent<any>) => {
		const pass = event.target.value;
		if (passwordRegex.test(pass) && pass.length > 2) {
			setIsValidPassword(true);
			setFocusMessagePassword("Your password looks good");
		} else {
			setIsValidPassword(false);
			setFocusMessagePassword(
				"Please enter a Password with more than 2 characters!"
			);
		}
	};

	async function onSubmit(data: object | any) {
		const registrationArray = JSON.parse(registration);
		setSubmitting(true);
		setIsValid(false);
		try {
			let check = duplicatedPassword(data, registrationArray);
			if (check) {
				setIsValid(true);
				setIsLoginValid(true);
				setFocusMessage("You will now log in in 2 seconds");
				setMessage("");
				setTimeout(() => {
					router.push("/browse");
				}, 500);
			} else {
				let errorText =
					`backend error message is \n` +
					`check your login credentials are correct `;
				setFocusMessage(errorText); // It's an Error instance.
			}
		} catch (error: unknown) {
			if (error) {
				setFocusMessage(`front end error message is  ${error}  `); // It's an Error instance.
			} else {
				setFocusMessage("?????????????"); // Who knows?
			}
		} finally {
			setSubmitting(false);
		}
	}

	return (
		<Box
			component='main'
			sx={{
				alignItems: "center",
				display: "flex",
				flexGrow: 1,
				minHeight: "100%",
			}}
			className='height-75'>
			<Container
				sx={{
					backgroundColor: "white",
				}}
				maxWidth='sm'>
				<form onSubmit={handleSubmit(onSubmit)}>
					<div className={`message ${isLoginValid ? "success" : "error"}`}>
						{focusLoginMessage}
					</div>

					<fieldset disabled={submitting}>
						<label htmlFor='email'>Username / Email</label>
						<input
							type='text'
							placeholder='email address'
							{...register("email")}></input>
						<div></div>
						<div className={`message ${isValid ? "success" : "error"}`}>
							{focusMessage}
						</div>
						<label htmlFor='password'>Password</label>
						<input
							placeholder='password'
							{...register("password")}
							onChange={validatePassword}
							type='password'
						/>
						<div className={`message ${isValidPassword ? "success" : "error"}`}>
							{focusMessagePassword}
						</div>
						<div></div>
						<div className='button-form__container'>
							<button type='submit' className='addMemory'>
								Log in
							</button>
						</div>
					</fieldset>
				</form>
			</Container>
		</Box>
	);
}

export default LoginForm;
