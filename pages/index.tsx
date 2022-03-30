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

interface IMyValue {
	valueTab: string | any;
	setValueTab: FC<string>;
}

const schema = yup.object().shape({
	userName: yup.string().required("Please enter your first name"),
	email: yup.string().required("Please enter your first name"),
	password: yup.string().required("Please enter your password"),
	password_2: yup.string().required("Please enter your password"),
});

function HomeForm(props: IMyValue) {
	const [page, setPage] = useState(0);
	const [submitting, setSubmitting] = useState(false);
	const [IsValid, setIsValid] = useState(false);
	const [focusMessage, setMessage] = useState("");
	const [data, setData]: object | any = useState({});
	const [password, setPassword] = useState("");
	const [IsValidPassword, setIsValidPassword] = useState(false);
	const [isLoginValid, setIsLoginValid] = useState(false);
	const [focusMessagePassword, setFocusMessagePassword] = useState("");

	const { register, handleSubmit } = useForm({
		resolver: yupResolver(schema),
	});

	const passwordRegex = /\S/;
	const nameRegex = /\S/;

	const FormTitles = ["Start", "Registration", "Log In"];

	const validateName = (event: React.ChangeEvent<any>) => {
		const name = event.target.value;
		console.log("name==>", name);
		if (nameRegex.test(name) && name.length > 4) {
			setIsValid(true);
			setMessage("Your Name looks good");
			const newData: Array<any> | any = { ...data };
			newData[event.target.name] = event.target.value;
			setData(newData);
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
			setPassword(pass);
			const newData: Array<any> | any = { ...data };
			newData[event.target.name] = event.target.value;
			setData(newData);
			console.log("pass==>", pass);
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
			return <RegistrationForm page={page} setPage={setPage} />;
		} else {
			return (
				<fieldset>
					<Grid container spacing={2} px={2} marginLeft={0}>
						<Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
							<div className='input-container'>
								<input
									type='text'
									{...register("userName")}
									value={data.userName}
									onChange={(e: React.ChangeEvent<any>) => {
										validateName(e);
									}}
									className='input'></input>
								<label className='label' htmlFor='username'>
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
									onChange={(e: React.ChangeEvent<any>) => {
										validatePassword(e);
									}}
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
								className={`message ${IsValidPassword ? "success" : "error"}`}>
								{focusMessagePassword}
							</div>
						</Grid>
						<div className='button-form__container'>
							<button
								disabled={page == 0}
								onClick={() => {
									setPage((currPage) => currPage - 1);
								}}>
								Prev
							</button>
							<button
								type='submit'
								className='addMemory'
								onClick={(event) => {
									SubmitData(data);
								}}>
								Log in
							</button>
						</div>
					</Grid>
				</fieldset>
			);
		}
	};

	return (
		<div className='splash-body'>
			<Header />
			<h1>{FormTitles[page]}</h1>
			<div className='flex-box__container'>
				<div className='flex-box'>
					<button
						className={page === 0 ? "tab-button disabled" : "tab-button"}
						onClick={() => {
							setPage((currPage) => currPage - 1);
						}}>
						{"Previous"}
					</button>
					<div className='progressbar'>
						<div
							style={{
								width: page === 0 ? "33.3%" : page == 1 ? "66.6%" : "100%",
							}}></div>
					</div>
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
