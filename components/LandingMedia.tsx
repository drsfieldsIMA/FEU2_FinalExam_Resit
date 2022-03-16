/** @format */
/** @format */

import React from "react";
import Head from "next/head";
import { Grid } from "@mui/material";
import Link from "next/link";
import API_URL from "../utils/env";
import Hero from "./Hero";
import Button from "@mui/material/Button";
import PropTypes from "prop-types";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import NextLink from "next/link";
import ReactPlayer from "react-player";

export default function LandingMedia({ news }: Array<any>) {
	return (
		<>
			<div className='hero-wrapper'>
				{/* 				<Hero
					title='Here is your science news'
					imageSrc='/YGT_2022_pillars.jpg'
					classString='hero_banner'
					bgColor='#000080'
					desc='A picture of a Tesla car over the earth'
				/> */}

				{/* 				<iframe
					title='Endless Space 2'
					src='https://imdb-video.media-imdb.com/vi3401563161/1434659607842-pgv4ql-1555653207271.mp4?Expires=1646339298&Signature=dS9AtHHJHa6x~HpMQEJ0V5tJO~1J2L~uIwORAl0IwMffofkGwJZGi~B4NmagBsDdUboNfDw8AJiDiSU37LZPODRKwK-ibPM4eyqXox8OX7mrTitj8HBx7mr9KnJTmPdkXrb~MQN9gKxP6vARAI0eSRJKccbkcUH5Mflt9iPWqhWfMJOciTxOTrN3EV~d2dcxs1YOD9r0EG2e5toBvflvVv85~o4lztgq4gorbYg5WJ85SYqOjeUMFcSGx307nnrdnau4xZVkSTxebfS5GqhiOdg898L2UXJhwIwagy8cFzpR1Atk4YtnhbATbBNRqVexLJ3y6uDsI~J7QJajS0raHg__&Key-Pair-Id=APKAIFLZBVQZ24NQH3KA'
					height='100%'
					width='100%'
					allow='autoplay; encrypted-media'></iframe> */}
				<ReactPlayer
					url='https://imdb-video.media-imdb.com/vi3401563161/1434659607842-pgv4ql-1555653207271.mp4?Expires=1646339298&Signature=dS9AtHHJHa6x~HpMQEJ0V5tJO~1J2L~uIwORAl0IwMffofkGwJZGi~B4NmagBsDdUboNfDw8AJiDiSU37LZPODRKwK-ibPM4eyqXox8OX7mrTitj8HBx7mr9KnJTmPdkXrb~MQN9gKxP6vARAI0eSRJKccbkcUH5Mflt9iPWqhWfMJOciTxOTrN3EV~d2dcxs1YOD9r0EG2e5toBvflvVv85~o4lztgq4gorbYg5WJ85SYqOjeUMFcSGx307nnrdnau4xZVkSTxebfS5GqhiOdg898L2UXJhwIwagy8cFzpR1Atk4YtnhbATbBNRqVexLJ3y6uDsI~J7QJajS0raHg__&Key-Pair-Id=APKAIFLZBVQZ24NQH3KA'
					controls={true}
					playing={true}
					className='video-player'
				/>
			</div>

			<Button>Load More </Button>
		</>
	);
}

export async function getStaticProps() {
	const res = await fetch(`${API_URL}/articles`);

	const articles: Array<string> = await res.json();
	const news: Array<string> = articles;
	return {
		props: { news },
	};
}

LandingMedia.propTypes = {
	item: PropTypes.any,
	news: PropTypes.array,
	title: PropTypes.string,
	category: PropTypes.string,
};
