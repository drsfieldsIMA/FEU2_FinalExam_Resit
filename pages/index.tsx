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

interface IMyValue {
	valueTab: string | any;
	setValueTab: FC<string>;
}

function HomeForm(props: IMyValue) {
	const { valueTab, setValueTab }: IMyValue = useContext(valueContext);

	const handleChange = (
		event: React.ChangeEvent<any>,
		newValue: string | any
	) => {
		console.log("newValue", newValue);
		setValueTab(newValue);
	};

	return (
		<div className='splash-body'>
			<TabContext value={valueTab}>
				<TabPanel value='1'>
					<ResponsivePlayer />
				</TabPanel>
				<TabPanel value='2'>
					<RegistrationForm />
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
		</div>
	);
}

export default HomeForm;
