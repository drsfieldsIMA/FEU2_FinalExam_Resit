/** @format */

import type { NextPage } from "next";
import React from "react";
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
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import ResponsivePlayer from "../components/ResponsivePlayer";
import { CircularProgress } from "@mui/material";
import { useLogin } from "../config/useLogin";
import { userContext, valueContext } from "../hooks/userContext";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";

function HomeForm() {
	const { user, setUser } = useContext(userContext);
	const { valueTab, setValueTab } = useContext(valueContext);

	const handleChange = (event, newValue) => {
		console.log("newValue", newValue);
		setValueTab(newValue);
	};

	return (
		<TabContext value={valueTab}>
			<TabPanel value='1'>
				<div>
					<h2>Home</h2>
					<pre>{JSON.stringify(user, null, 2)}</pre>
					{user ? (
						<button
							onClick={() => {
								// call logout
								setUser(null);
							}}>
							logout
						</button>
					) : (
						<button
							onClick={async () => {
								const user = await useLogin();
								setUser(user);
							}}>
							login
						</button>
					)}
				</div>
				<ResponsivePlayer />
			</TabPanel>
			<TabPanel value='2'>
				<RegistrationForm value={valueTab} />
			</TabPanel>
			<TabPanel value='3'>
				<LoginForm />
			</TabPanel>
			<Box sx={{ borderBottom: 1, borderColor: "divider" }}>
				<TabList
					onChange={handleChange}
					aria-label='lab API tabs example'
					variant='fullWidth'
					className='tab-context'
					textColor='inherit'>
					<Tab className='start-tab' label='Start' value='1' />
					<Tab className='registration-tab' label='Registration' value='2' />
					<Tab className='login-tab' label='Sign in' value='3' />
				</TabList>
			</Box>
		</TabContext>
	);
}

export default HomeForm;
