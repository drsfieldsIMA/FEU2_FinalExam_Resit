/**
 *
 *
 * @format
 */
/* eslint-disable react-hooks/rules-of-hooks */
import { useQuery, useQueryClient } from "react-query";
import React, { useState, FC, useEffect, useRef } from "react";
import Layout, { Heading } from "../components/Layout";
import { gameObj, genreArray } from "./api/games/gamesArray";
import { CircularProgress, Grid, responsiveFontSizes } from "@mui/material";
import NewsCard from "../components/lists/Cards/NewsCard";
import { Card } from "@mui/material";
import Header from "../components/navigation/Header";
import { IconButton } from "@mui/material";
import { Pageview } from "@mui/icons-material";
import Link from "next/link";
import { Button } from "@mui/material";
import CartGames from "../components/clickHandlers/cartGames";
import BoxList from "../components/lists/BoxList";
import { constants } from "zlib";
import { genreArrayLabels } from "../utils/backend";
import axios from "axios";
import api from "./api/games/posts";
import useDebounce from "../utils/useDebounce";
import useLocalStorage from "../hooks/useLocalStorage";
import CartButton from "../components/CartButton";
import { Box } from "reflexbox";
import ListAltIcon from "@mui/icons-material/ListAlt";

const getArticles = async (
	categoryName: string,
	isLoading: boolean,
	setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
	//			const newData=`fields name,version_title,cover.*,screenshots.*,artworks.*;where genres=${ID}; limit 10;`
	//			const request= await api.post("games", newData)
	//	console.log("categoryName==>", categoryName);
	console.log("categoryName", categoryName);
	try {
		const add = await fetch(
			`https://mmo-games.p.rapidapi.com/games?category=${categoryName}`,
			{
				method: "GET",
				headers: {
					"x-rapidapi-host": "mmo-games.p.rapidapi.com",
					"x-rapidapi-key":
						"3b1497acf6msh9bc671c8b1eadf4p1062afjsnea62995b5794",
				},
			}
		);
		const addResponse = await add.json();
		return addResponse;
	} catch (err) {
		console.log("error==>", err);
		return;
	} finally {
		setIsLoading(false);
	}
};

type MyProps = {
	news: Array<any> | any;
	fetchNews: boolean;
	userName: string;
};
type MyState = {
	news: Array<any> | any;
	fetchNews: boolean;
	userName: string;
};

const API_TWITCH = "https://api.igdb.com/v4/";

function browsePage({ gameArray }: { gameArray: Array<any> | null }) {
	const [spliceLimit, setSpliceLimit] = useState(6);
	const [genreID, setGenreID] = useState("");
	const [dataGenre, setDataGenre] = useState(gameArray);
	const [cartArray, setCartArray] = useState([]);
	const queryClient = useQueryClient();
	const [renderCount, setRenderCount] = React.useState(0);
	const [isLoading, setIsLoading] = React.useState(true);

	let tabRef = useRef(null);

	const debouncedSearchValue = useDebounce(genreID, 300);

	const changeColor = async (event: React.ChangeEvent<any>) => {
		console.log("ChangeColor==>", event);
		const links = document.querySelector(".active-btn");
		event.target.classList.toggle("active-btn");
	};

	async function getGenre(nameID: string | any) {
		setIsLoading(true);
		console.log("getGenre", nameID);
		var T = await getArticles(nameID, isLoading, setIsLoading);
		console.log("T", T);
		setDataGenre(T);
	}

	useEffect(() => {
		// component is mounted and window is available
		if (gameArray!.length > 0) {
			return setIsLoading(false);
		} else {
			return setIsLoading(true);
		}
		// unsubscribe from the event on component unmount
	}, [gameArray]);

	return (
		<>
			<Header></Header>
			<Heading
				classNameString='page_title'
				size='1'
				color='#fbf9be'
				content='Browse Page'></Heading>
			<main>
				<section className='tab-container' ref={tabRef}>
					{genreArrayLabels.slice(0, 10).map((item, index): any => (
						<Button
							key={item.id}
							className='tab-btn'
							variant='outlined'
							onClick={(e) => (changeColor(e), getGenre(item.name))}>
							{item.name}
						</Button>
					))}
				</section>
				<Grid container spacing={2} px={2} marginLeft={0}>
					{isLoading ? (
						<Box className='container-circular-progress'>
							<CircularProgress className='circular-progress' />
						</Box>
					) : (
						!isLoading &&
						dataGenre?.map((item: object | any, index: number) => (
							<Grid key={item.id} item xs={12} sm={6} md={6} lg={4} xl={4}>
								<Card>
									{item.cover ? (
										<div
											key={item.id}
											className='hero'
											style={{
												backgroundImage: `url(https://images.igdb.com/igdb/image/upload/t_cover_big/${item.cover?.image_id}.jpg)`,
												backgroundColor: `${"#f0f7ff"}`,
												backgroundSize: `${"contain"}`,
											}}></div>
									) : item.artworks ? (
										<div
											key={item.id}
											className='hero'
											style={{
												backgroundImage: `url(https://images.igdb.com/igdb/image/upload/t_cover_big/${item.artworks[0].image_id}.jpg)`,
												backgroundColor: `${"#f0f7ff"}`,
												backgroundSize: `${"contain"}`,
											}}></div>
									) : item.screenshots ? (
										<div
											key={item.id}
											className='hero'
											style={{
												backgroundImage: `url(https://images.igdb.com/igdb/image/upload/t_cover_big/${item.screenshots[0].image_id}.jpg)`,
												backgroundColor: `${"#f0f7ff"}`,
												backgroundSize: `${"contain"}`,
											}}></div>
									) : (
										<div
											className='hero'
											style={{
												backgroundImage: `url(${item.thumbnail})`,
												backgroundColor: `${"#f0f7ff"}`,
												backgroundSize: `${"contain"}`,
											}}></div>
									)}
									<h1 className='card-h1'>{item.title}</h1>
									<div className='button-group__card'>
										<CartButton
											ID={parseInt(item.id)}
											index={index}></CartButton>
										<Link
											key={item.name}
											href={`/details/${parseInt(item.id)}`}>
											<a className='link-button'> Details </a>
										</Link>
									</div>
								</Card>
							</Grid>
						))
					)}
				</Grid>
			</main>
		</>
	);
}

export async function getServerSideProps() {
	//const  res=await fetch(`${API_URL}/api/news`);
	//	const res = await fetch(`${API_URL}/games`);
	//const gameArray = gameObj;
	//const dataFetch="fields name,version_title,genres,cover.*,screenshots.*,artworks.*; limit 14;"
	//const response=await api.post("/games", dataFetch)
	//console.log("response==>",response.data)

	const response = await fetch(`https://mmo-games.p.rapidapi.com/games`, {
		method: "GET",
		headers: {
			"x-rapidapi-host": "mmo-games.p.rapidapi.com",
			"x-rapidapi-key": "3b1497acf6msh9bc671c8b1eadf4p1062afjsnea62995b5794",
		},
	});
	const gameArrayFull = await response.json();
	let gameArray = [];
	gameArray = gameArrayFull.slice(0, 40);
	return {
		props: { gameArray },
	};
}

export default browsePage;
