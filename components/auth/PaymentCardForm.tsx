/** @format */

import type { NextPage } from "next";
import React, { FC } from "react";
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
import { checkNumberOnCard } from "../clickHandlers/checkNumberOnCard";

const schema = yup.object().shape({
	Name: yup.string().required("Please the name on your card"),
	OnCardNumber: yup
		.number()
		.min(12)
		.max(12)
		.required("please enter the name on the card exactly"),
	cvcCode: yup
		.number()
		.required("Please enter your CVC code")
		.min(3, "Must be exactly 3 digits")
		.max(3, "Must be exactly 3 digits"),
});

function PaymentCardForm() {
	const [submitting, setSubmitting] = useState(false);
	const [loginError, setLoginError] = useState(null);

	const [data, setData]: object | any = useState({});
	const [cardNumberState, setCardNumberState] = useState("");

	const [isValid, setIsValid] = useState(false);
	const [focusMessage, setMessage] = useState("");
	const [LogInIs, setLogInValid] = useState(false);
	const nameRegex = /\S/;

	const [isValidNumber, setIsValidNumber] = useState(false);
	const [focusMessageCardNumber, setFocusMessageCardNumber] = useState("");

	const cardNumberRegex = /^[0-9]+$/;

	const { register, handleSubmit } = useForm({
		resolver: yupResolver(schema),
	});

	function handleChange(e: React.ChangeEvent<any>) {
		const newData: Array<any> | any = { ...data };
		newData[e.target.name] = e.target.value;
		setData(newData);
	}

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

	const validateNumberOnCard = (event: React.ChangeEvent<any>) => {
		const pass = event.target.value;
		let check = checkNumberOnCard(pass, cardNumberRegex);
		if (check) {
			setIsValidNumber(true);
			setFocusMessageCardNumber("Your card number looks good");
			setCardNumberState(pass);
			handleChange(event);
		} else {
			setIsValidNumber(false);
			setFocusMessageCardNumber(
				"Please enter card number with more than 12 characters!"
			);
		}
	};

	async function onSubmit(data: object | any) {
		setSubmitting(true);
		setLoginError(null);
		setIsValid(false);
		const paymentInfo: object | any = {
			identifier: data.Name,
			password: data.OnCardNumber,
		};

		try {
			if (isValidNumber && isValid) {
				setMessage(
					`your name and card are valid and your purchase has been processed`
				); // It's an Error instance.
			} else {
				setMessage(`your name and card are invalid please check them`); // It's an Error instance.
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

	return (
		<Box
			component='main'
			sx={{
				alignItems: "center",
				display: "block",
				flexGrow: 1,
				minHeight: "100%",
			}}
			className='payment-form__container'>
			<Container
				sx={{
					backgroundColor: "transparent",
				}}
				maxWidth='sm'>
				<form onSubmit={handleSubmit(onSubmit)}>
					<div className={`message ${isValid ? "success" : "error"}`}>
						{focusMessage}
					</div>
					<fieldset disabled={submitting}>
						<label htmlFor='Name'> Name On Card</label>
						<input
							type='text'
							placeholder='Jane, Ronny, Charlie'
							{...register("Name")}
							value={data.Name}
							onChange={(e: React.ChangeEvent<any>) => {
								handleChange(e), validateName;
							}}></input>
						<div></div>
						<div className={`message ${isValidNumber ? "success" : "error"}`}>
							{focusMessage}
						</div>
						<div></div>
						<label htmlFor='OnCardNumber'>Number On Card</label>
						<input
							placeholder='Card Number'
							type='text'
							{...register("OnCardNumber")}
							value={data.OnCardNumber}
							onChange={validateNumberOnCard}
						/>
						<div className={`message ${isValidNumber ? "success" : "error"}`}>
							{focusMessageCardNumber}
						</div>
						<div></div>
						<button type='submit' className='addMemory'>
							Pay With Card
						</button>
					</fieldset>
				</form>
			</Container>
		</Box>
	);
}

export default PaymentCardForm;
