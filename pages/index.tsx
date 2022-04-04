/** @format */

import type { NextPage } from "next";
import React, { FC } from "react";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.scss";
import { useState, useContext, useMemo } from "react";
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
import LoginForm from "../components/auth/LoginForm";
import RegistrationForm from "../components/auth/RegistrationForm";
import Tab from "@mui/material/Tab";
import TabContext, { useTabContext } from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import ResponsivePlayer from "../components/ResponsivePlayer";
import { CircularProgress } from "@mui/material";
import { useLogin } from "../config/useLogin";
import { userContext, valueContext } from "../hooks/userContext";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { duplicatedPassword } from "../components/clickHandlers/checkNumberOnCard";
import Header from "../components/navigation/Header";
import { Heading } from "../components/Layout";

interface IMyValue {
	valueTab: string | any;
	setValueTab: FC<string>;
}

const schema = yup.object().shape({
	username: yup.string().required("user name is required"),
	password: yup.string().required("password is required"),
});

function HomeForm(props: IMyValue) {
	const [page, setPage] = useState(0);
	const [submitting, setSubmitting] = useState(false);
	const [IsValid, setIsValid] = useState(false);
	const [focusMessage, setMessage] = useState("");
	const [data, setData]: object | any = useState({});
	const [userName, setUserName] = useState("drsfieldsIMA@gmail.com");
	const [password, setPassword] = useState("Pass1234");
	const [IsValidPassword, setIsValidPassword] = useState(false);
	const [isLoginValid, setIsLoginValid] = useState(false);
	const [focusMessagePassword, setFocusMessagePassword] = useState("");

	const { register, handleSubmit, reset, formState } = useForm({
		resolver: yupResolver(schema),
	});

	const passwordRegex = /\S/;
	const nameRegex = /\S/;

	const FormTitles = ["Start", "Registration", "Log In"];

	const handleChange = (e: React.ChangeEvent<any>) => {
		const newData: Array<any> | any = { ...data };
		newData[e.target.name] = e.target.value;
		setData(newData);
	};

	const validateName = (event: React.ChangeEvent<any>) => {
		const name = event.target.value;
		console.log("name==>", name);
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
		console.log("pass==>", pass);
		if (passwordRegex.test(pass) && pass.length > 2) {
			setIsValidPassword(true);
			setFocusMessagePassword("Your password looks good");
			handleChange(event);
		} else {
			setIsValidPassword(false);
			setFocusMessagePassword(
				"Please enter a Password with more than 2 characters!"
			);
		}
	};

	async function SubmitData(data: object | any) {
		if (typeof window !== "undefined") {
			const registration: object | any = localStorage.getItem("registration");
			const regArray: Array<any> | any = JSON.parse(registration);
			console.log("registrationArray==>", regArray, data);
			setSubmitting(true);
			setIsValid(false);

			try {
				let check = duplicatedPassword(data, regArray);
				console.log("check==>", check);
				if (check) {
					setIsValid(true);
					setIsLoginValid(true);
					setMessage("You will now log in in 2 seconds");
					setMessage("");
					setTimeout(() => {
						router.push("/browse");
					}, 2000);
				} else {
					let errorText =
						`backend error message is \n` +
						`check your login credentials are correct `;
					setMessage(errorText); // It's an Error instance.
				}
			} catch (error: unknown) {
				if (error) {
					setMessage(`front end error message is  ${error}  `); // It's an Error instance.
				} else {
					setMessage("🤷‍♂️"); // Who knows?
				}
			} finally {
				setSubmitting(false);
			}
		}
	}

	const PageDisplay = () => {
		if (page === 0) {
			return (
				<>
					<ResponsivePlayer />;
				</>
			);
		} else if (page === 1) {
			return (
				<>
					<Heading
						classNameString='page_title'
						size='1'
						color='#fbf9be'
						content='Registration Form'></Heading>
					;
					<RegistrationForm page={page} setPage={setPage} />;
				</>
			);
		} else {
			return (
				<main>
					<fieldset>
						<Grid container spacing={2} px={2} marginLeft={0}>
							<Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
								<div className='input-container'>
									<input
										type='text'
										{...register("username")}
										value={data.userName}
										onChange={validateName}
										className='input'></input>
									<label className='label' htmlFor='userName'>
										Username / Email
									</label>
								</div>
								<div></div>
								<div className={`message ${IsValid ? "success" : "error"}`}>
									{focusMessage}
								</div>
							</Grid>
							<Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
								<div className='input-container'>
									<input
										placeholder='password'
										{...register("password")}
										onChange={validatePassword}
										type='password'
										value={data.password}
										className='input'
									/>
									<label className='label' htmlFor='password'>
										Password
									</label>
									<div></div>
								</div>
								<div
									className={`message ${
										IsValidPassword ? "success" : "error"
									}`}>
									{focusMessagePassword}
								</div>
							</Grid>
							<Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
								<div className='button-form__container'>
									<button
										type='submit'
										className='addMemory'
										onClick={(event) => {
											SubmitData(data);
										}}>
										Log in
									</button>
									<button
										type='button'
										onClick={() => {
											reset({
												userName: "",
												password: "",
											}),
												setData("");
										}}
										className='btn btn-info'>
										Reset
									</button>
								</div>
							</Grid>
						</Grid>
					</fieldset>
				</main>
			);
		}
	};

	return (
		<div className='splash-body'>
			<Header />
			<div className='flex-box__container-index'>
				<div className='flex-box-index'>
					<button
						className={page === 0 ? "tab-button disabled" : "tab-button"}
						onClick={() => {
							setPage((currPage) => currPage - 1);
						}}>
						{"Previous"}
					</button>
					<button
						className={
							page !== 0
								? " heading-block active-h1"
								: " heading-block disabled-h1"
						}
						onClick={() => {
							setPage(0);
						}}>
						{FormTitles[0]}
					</button>
					<button
						className={
							page !== 1
								? " heading-block active-h1"
								: " heading-block disabled-h1"
						}
						onClick={() => {
							setPage(1);
						}}>
						{FormTitles[1]}
					</button>
					<button
						className={
							page !== 2
								? " heading-block active-h1"
								: " heading-block disabled-h1"
						}
						onClick={() => {
							setPage(2);
						}}>
						{FormTitles[2]}
					</button>
					<button
						className={page === 2 ? "tab-button disabled" : "tab-button"}
						onClick={() => {
							setPage((currPage) => currPage + 1);
						}}>
						{"Next"}
					</button>
				</div>
			</div>
			<div className='body'>{PageDisplay()}</div>
		</div>
	);
}

export default HomeForm;
