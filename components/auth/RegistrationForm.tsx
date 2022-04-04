/** @format */

import type { NextPage } from "next";
import React, { FC, useEffect } from "react";
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
import { checkEmailString } from "../clickHandlers/checkEmailString";
import { handleBreakpoints } from "@mui/lab/node_modules/@mui/system";

export interface MyTabContextValue {
	valueTab: string;
	setValueTab: FC<String>;
}

const API_URL = "https://level-up-strapi.herokuapp.com";

const schema = yup.object().shape({
	email: yup.string().required("Please enter your first name"),
	password: yup.string().required("Please enter your password"),
	password_2: yup.string().required("Please enter your password"),
});

function RegistrationForm({
	page,
	setPage,
}: {
	page: number;
	setPage: React.Dispatch<React.SetStateAction<number>>;
}) {
	const [renderCount, setRenderCount] = useState(0);
	const [submitting, setSubmitting] = useState(false);
	const [loginError, setLoginError] = useState(null);

	const [IsValid, setIsValid] = useState(false);
	const [focusMessage, setMessage] = useState("");
	const [IsLogInValid, setIsLogInValid] = useState(false);
	const [focusLoginMessage, setFocusMessage] = useState("");
	const [focusMessageEmail, setFocusMessageEmail] = useState("");
	const [IsValidEmail, setIsValidEmail] = useState(false);
	const [IsValidPassword, setIsValidPassword] = useState(false);
	const [email, setEmail] = useState("");
	const [password_1, setPassword_1] = useState("");
	const [focusMessagePassword, setFocusMessagePassword] = useState("");

	const passwordRegex = /\S/;

	const [IsValidDuplicatePassword, setIsValidDuplicatePassword] =
		useState(false);
	const [focusMessageDuplicatePassword, setMessageDuplicatePassword] =
		useState("");

	const nameRegex = /\S/;

	const [data, setData]: object | any = useState({});

	const { register, handleSubmit } = useForm({
		resolver: yupResolver(schema),
	});

	const handleChange = (e: React.ChangeEvent<any>) => {
		const newData: Array<any> | any = { ...data };
		newData[e.target.name] = e.target.value;
		setData(newData);
	};

	const validateName = (event: React.ChangeEvent<any>) => {
		const name = event.target.value;
		console.log("name==>", event.target.classList);
		if (nameRegex.test(name) && name.length > 4) {
			setIsValid(true);
			setMessage("Your Name looks good");
			handleChange(event);
		} else {
			setIsValid(false);
			setMessage("Please enter a name with more than 3 characters!");
		}
	};

	const validatePassword = (event: React.ChangeEvent<any>) => {
		const pass = event.target.value;
		if (passwordRegex.test(pass) && pass.length > 2) {
			setIsValidPassword(true);
			setFocusMessagePassword("Your password looks good");
			setPassword_1(pass);
			handleChange(event);
		} else {
			setIsValidPassword(false);
			setFocusMessagePassword(
				"Please enter a Password with more than 2 characters!"
			);
		}
	};

	const validateRepeatedPassword = (event: React.ChangeEvent<any>) => {
		const repeatedPass = event.target.value;
		if (repeatedPass === password_1) {
			setIsValidDuplicatePassword(true);
			setMessageDuplicatePassword("Your passwords match!");
		} else {
			setIsValidDuplicatePassword(false);
			setMessageDuplicatePassword("Please re-enter your chosen password");
		}
	};
	const emailRegex =
		/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

	const validateEmail = (event: React.ChangeEvent<any>) => {
		console.log("check Email==>", event.target.value);
		const userEmail = event.target.value;
		let checkEmail = checkEmailString(userEmail, emailRegex);
		console.log("check Email==>", checkEmail);
		if (checkEmail) {
			setIsValidEmail(true);
			setFocusMessageEmail("Your email looks good");
			setEmail(userEmail);
			handleChange(event);
		} else {
			setIsValidEmail(false);
			setFocusMessageEmail("Please enter a email with more than 2 characters!");
		}
	};

	async function setFormData(
		event: React.ChangeEvent<any>,
		data: object | any
	) {
		event.preventDefault();
		console.log("data==>", data);
		setSubmitting(true);
		setLoginError(null);
		setIsValid(false);
		setIsLogInValid(false);
		try {
			if (IsValidPassword) {
				setIsValid(true);
				setIsLogInValid(true);
				if (typeof window !== "undefined") {
					localStorage.setItem("registration", JSON.stringify(data));
				}
				setFocusMessage("You will now log in in 2 seconds");
				setMessage("");
				setPage(3);
			} else {
				let errorText =
					`backend error message is  \n` +
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
			//		setValueTab("3");
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
				<form>
					<div className={`message ${IsValid ? "success" : "error"}`}>
						{focusMessage}
					</div>
					<fieldset disabled={submitting}>
						<Grid container spacing={2} px={2} marginLeft={0}>
							<Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
								<div className='input-container'>
									{/* 	<input
										type='text'
										{...register("userName")}
										value={data.userName}
										onChange={(e: React.ChangeEvent<any>) => {
											validateName(e);
										}}
										className='input'></input>
									<label className='label' htmlFor='userName'>
										First Name
									</label> */}
								</div>
								<div></div>
								<div className={`message ${IsValid ? "success" : "error"}`}>
									{focusMessage}
								</div>
							</Grid>
							<Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
								<div className='input-container'>
									<input
										type='text'
										{...register("email")}
										value={data.userEmail}
										className='input'
										name='email'
										onChange={validateEmail}></input>
									<label className='label' htmlFor='email'>
										Email
									</label>
								</div>
								<div></div>
								<div
									className={`message ${IsValidEmail ? "success" : "error"}`}>
									{focusMessageEmail}
								</div>
							</Grid>
							<Grid item xs={12} sm={12} md={12} lg={12} xl={6}>
								<div className='input-container'>
									<input
										{...register("password_1")}
										onChange={validatePassword}
										type='password'
										name='password_1'
										value={data.password_1}
										className='input'
									/>
									<label className='label' htmlFor='password_1'>
										Password
									</label>
								</div>
								<div
									className={`message ${
										IsValidPassword ? "success" : "error"
									}`}>
									{focusMessagePassword}
								</div>
								<div></div>
							</Grid>
							<Grid item xs={12} sm={12} md={12} lg={12} xl={6}>
								<div className='input-container'>
									<input
										{...register("password_2")}
										onChange={validateRepeatedPassword}
										name={data.password_2}
										type='password'
										className='input'
									/>
									<label className='label' htmlFor='password_2'>
										Re-enter Password
									</label>
								</div>
								<div
									className={`message ${
										IsValidDuplicatePassword ? "success" : "error"
									}`}>
									{focusMessageDuplicatePassword}
								</div>
								<div></div>
							</Grid>
						</Grid>
						<div className='button-form__container'>
							<button
								type='submit'
								className='addMemory'
								onClick={(event) => setFormData(event, data)}>
								Register Details
							</button>
							<button
								onClick={() => {
									setPage((currPage) => currPage - 1);
								}}>
								Prev
							</button>
						</div>
					</fieldset>
				</form>
			</Container>
		</Box>
	);
}

export default RegistrationForm;
