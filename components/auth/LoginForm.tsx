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

const schema = yup.object().shape({
	username: yup.string().required("Please enter your email"),
	password: yup.string().required("Please enter your password"),
});

function LoginForm() {
	const [submitting, setSubmitting] = useState(false);
	const [loginError, setLoginError] = useState(null);

	const { register, handleSubmit } = useForm({
		resolver: yupResolver(schema),
	});

	const registration = localStorage.getItem("registration");
	console.log("registration", registration);

	const [isValid, setIsValid] = useState(false);
	const [focusMessage, setMessage] = useState("");
	const [loginisValid, setloginisValid] = useState(false);
	const [focusLoginMessage, setFocusMessage] = useState("");
	const [auth, setAuth] = useState("");
	const nameRegex = /\S/;

	const validateName = (event) => {
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

	const validatePassword = (event) => {
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

	async function onSubmit(data) {
		console.log("submit now on click");
		console.log("registration", registration);
		console.log("data", data);
		const registrationArray = JSON.parse(registration);
		setSubmitting(true);
		setLoginError(null);
		setIsValid(false);
		try {
			if (data.password == registrationArray.password) {
				setIsValid(true);
				setloginisValid(true);
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
				setFocusMessage("🤷‍♂️"); // Who knows?
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
					<div className={`message ${loginisValid ? "success" : "error"}`}>
						{focusLoginMessage}
					</div>

					<fieldset disabled={submitting}>
						<label htmlFor='username'>Username / Email</label>
						<input
							type='text'
							placeholder='email address'
							{...register("username")}></input>
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
						<button type='submit' className='addMemory'>
							Log in
						</button>
					</fieldset>
				</form>
			</Container>
		</Box>
	);
}

export default LoginForm;
