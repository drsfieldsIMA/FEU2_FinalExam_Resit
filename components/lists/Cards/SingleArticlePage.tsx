/** @format */

import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import { Box, Card, Stack, Divider } from "@mui/material";
import Grid from "@mui/material/Grid";
import dayjs from "dayjs";
import Head from "next/head";
import { createRef } from "react";
import NextLink from "next/link";
import React from "react";

export const SingleArticlePage = ({ single }) => {
	const maxL = single.short_description.length;
	const one = single.short_description.replace(/\s+/g, "").slice(0, 1);
	const two = single.short_description.slice(1, maxL);
	return (
		<>
			<Box>
				<Card>
					<Grid container spacing={2} px={2} marginLeft={0}>
						<Grid key={single.slug} item xs={12} sm={12} md={6} lg={6} xl={6}>
							<h1 className='single-title'>{single.title}</h1>
						</Grid>
						<Grid key={single.slug} item xs={12} sm={12} md={6} lg={6} xl={6}>
							<div className='single-image__container'>
								<div className='single-image'>
									<Image
										src={single.main_image}
										layout='fill'
										alt={single.title}
										className='overrideImage'></Image>
								</div>
							</div>
						</Grid>
					</Grid>
				</Card>
				<Grid key={single.slug} item xs={12} sm={12} md={12} lg={12} xl={12}>
					<Card className='singleNews'>
						<div className='singleNews-para'>
							<span className='firstLetter'>{one}</span>
							<p>{two}</p>
							<div
								dangerouslySetInnerHTML={{
									__html: single.article_content,
								}}></div>
							)
						</div>
					</Card>
				</Grid>
			</Box>
		</>
	);
};
