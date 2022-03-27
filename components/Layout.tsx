/** @format */

import React, { ReactElement } from "react";
import Head from "next/head";
import Header from "./navigation/Header";
import PropTypes from "prop-types";
import useSWR, { SWRConfig } from "swr";
import Image from "next/image";
import styles from "../styles/Home.module.scss";
import { createRef } from "react";
import NextLink from "next/link";
import { Button } from "@mui/material";
import { PermContactCalendar } from "@mui/icons-material";
import { API_URL } from "../utils/env";

type QueryParams = {
	title: string;
	keywords: string;
	descrip: string;
	gsv: string;
	children: any;
};

export default function Layout({
	title,
	keywords,
	descrip,
	gsv,
	children,
}: QueryParams) {
	const args: any = `${API_URL}/articles`;

	return (
		<div>
			<Head>
				<title>{title}</title>
				<meta name='description' content={descrip}></meta>
				<meta name='keywords' content={keywords}></meta>
				<meta name='google-site-verification' content={gsv}></meta>
			</Head>
			<Header></Header>

			<main>
				<div className='container'>{children}</div>
			</main>

			<footer className={styles.footer}>
				<div style={{ marginLeft: "5rem" }}>
					<h5>Powered by Positivity </h5>
				</div>
				<NextLink href='/contact' passHref={false}>
					<Button
						component='a'
						startIcon={<PermContactCalendar fontSize='small' />}>
						Contact Page
					</Button>
				</NextLink>
			</footer>
		</div>
	);
}

export function Heading({ color, size, content }: any) {
	const VariableHeading: string | any = `h${size}`;
	return (
		<div className='heading-block'>
			<VariableHeading style={{ color }}>{content}</VariableHeading>
		</div>
	);
}

Heading.propTypes = {
	size: PropTypes.string,
	content: PropTypes.string.isRequired,
	color: PropTypes.string,
	VariableHeading: PropTypes.node,
	articles: PropTypes.any,
};

Layout.defaultProps = {
	title: " Level up news  | Powered by Positivity ",
	descrip:
		"Be informed about local news, leverage positive information and your increase your profile",
	keywords:
		"Breaking News, Current headlines, Local News, Science, Sport, Culture and Nature, musical events ",
	gsv: "wenrVQYITXvXIH9sNnSmiBaOZ941XPPzAvnupQrq6RQ",
};
