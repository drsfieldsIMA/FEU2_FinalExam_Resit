/** @format */

import { useRouter } from "next/router";
import PropTypes from "prop-types";
import Link from "next/link";
import Image from "next/image";
import { Box, Card, Stack, Divider } from "@mui/material";
import Grid from "@mui/material/Grid";
import dayjs from "dayjs";
import Head from "next/head";
import { createRef } from "react";
import NextLink from "next/link";
import React from "react";
import { Description } from "@mui/icons-material";

type AssetType = {
	title: string;
	short_description: string;
	screenshots: Array<any>;
	description: string;
	category: string;
	id: number | string;
};
export default function SingleArticlePage({ single }: { single: AssetType }) {
	return (
		<>
			<Box>
				<Card>
					<Grid container spacing={2} px={2} marginLeft={0}>
						<Grid key={single?.id} item xs={12} sm={12} md={6} lg={6} xl={6}>
							<h1 className='single-title'>{single?.title}</h1>
						</Grid>
						<Grid key={single?.id} item xs={12} sm={12} md={6} lg={6} xl={6}>
							<div className='single-image__container'>
								<div className='single-image'>
									{/* <Image
										src={single?.screenshots[0]?.image}
										layout='fill'
										alt={single?.title}
										className='overrideImage'></Image> */}
								</div>
							</div>
						</Grid>
					</Grid>
				</Card>
				<Grid key={single?.id} item xs={12} sm={12} md={12} lg={12} xl={12}>
					<Card className='singleNews'>
						<div className='singleNews-para'>
							<div
								dangerouslySetInnerHTML={{
									__html: single?.description,
								}}></div>
							)
						</div>
					</Card>
				</Grid>
			</Box>
		</>
	);
}

SingleArticlePage.propTypes = {
	title: PropTypes.string,
	main_image: PropTypes.any,
	article_content: PropTypes.any,
	short_description: PropTypes.string,
	category: PropTypes.string,
	id: PropTypes.number,
};
