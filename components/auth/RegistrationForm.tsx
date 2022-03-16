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
import nookies from "nookies";
import { Password } from "@mui/icons-material";
import TabContext, { useTabContext } from "@mui/lab/TabContext";
import { valueContext } from "../../hooks/userContext";

const API_URL = "https://level-up-strapi.herokuapp.com";

const schema = yup.object().shape({
	firstName: yup.string().required("Please enter your first name"),
	secondName: yup.string().required("Please enter your first name"),
	userName: yup.string().required("Please enter your email"),
	password: yup.string().required("Please enter your password"),
	password_2: yup.string().required("Please enter your password"),
});

function RegistrationForm() {
	const { valueTab, setValueTab } = useContext(valueContext);

	const [submitting, setSubmitting] = useState(false);
	const [loginError, setLoginError] = useState(null);

	const { register, handleSubmit } = useForm({
		resolver: yupResolver(schema),
	});

	const [data, setData] = useState({});
	const [password_1, setPassword_1] = useState("");

	const handleChange = (e) => {
		const newData = { ...data };
		newData[e.target.name] = e.target.value;
		setData(newData);
	};

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
			setPassword_1(pass);
		} else {
			setIsValidPassword(false);
			setFocusMessagePassword(
				"Please enter a Password with more than 2 characters!"
			);
		}
	};

	const validateRepeatedPassword = (event) => {
		const repeatedPass = event.target.value;
		if (repeatedPass === password_1) {
			setIsValidPassword(true);
			setFocusMessagePassword("Your passwords match!");
			const newData = { ...data };
			newData["password"] = repeatedPass;
			setData(newData);
			console.log("handleChange", data);
		} else {
			setIsValidPassword(false);
			setFocusMessagePassword("Please re-enter your chosen password");
		}
	};

	async function setFormData() {
		localStorage.setItem("registration", JSON.stringify(data));
		setValueTab("3");
	}

	async function onSubmit(data) {
		setSubmitting(true);
		setLoginError(null);
		setIsValid(false);
		const loginInfo = {
			identifier: data.username,
			password: data.password,
		};

		try {
			if (isValid && isValidPassword) {
				setIsValid(true);
				setloginisValid(true);
				setFocusMessage("You will now log in in 2 seconds");
				setMessage("");
				localStorage.setItem("auth", JSON.stringify(loginResponse));
			} else {
				let errorText =
					`backend error message is   ${login.statusText} & ${login.status} \n` +
					`check your credentials are correct `;
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
					backgroundColor: "transparent",
				}}
				maxWidth='sm'>
				<form onSubmit={handleSubmit(onSubmit)}>
					<div className={`message ${loginisValid ? "success" : "error"}`}>
						{focusLoginMessage}
					</div>
					<fieldset disabled={submitting}>
						<Grid container spacing={2} px={2} marginLeft={0}>
							<Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
								<label htmlFor='firstName'>First Name</label>
								<input
									type='text'
									placeholder='Jane, Ronny, Charlie'
									{...register("firstName")}
									value={data.firstName}
									onChange={handleChange}></input>
								<div></div>
							</Grid>
							<Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
								<label htmlFor='secondName'>Second Name</label>
								<input
									type='text'
									placeholder='Doe, Atkinson, Murphy'
									{...register("secondName")}
									value={data.secondName}
									name='secondName'
									onChange={handleChange}></input>
								<div></div>
							</Grid>
							<Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
								<label htmlFor='password_1'>Password</label>
								<input
									placeholder='password'
									{...register("password_1")}
									onChange={validatePassword}
									type='password'
									name='password_1'
									value={data.password_1}
								/>
								<div
									className={`message ${
										isValidPassword ? "success" : "error"
									}`}>
									{focusMessagePassword}
								</div>
								<div></div>
							</Grid>
							<Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
								<label htmlFor='password_2'>Re-enter Password</label>
								<input
									placeholder=' please repeat your password'
									{...register("password_2")}
									onChange={validateRepeatedPassword}
									name={data.password_2}
									type='password'
								/>
								<div
									className={`message ${
										isValidPassword ? "success" : "error"
									}`}>
									{focusMessagePassword}
								</div>
								<div></div>
							</Grid>
						</Grid>
						<button
							type='submit'
							className='addMemory'
							onClick={() => setFormData()}>
							Add Data
						</button>
					</fieldset>
				</form>
			</Container>
		</Box>
	);
}

export default RegistrationForm;
