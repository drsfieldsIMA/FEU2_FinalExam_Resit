/** @format */

import React, { useEffect } from "react";
import Layout, { Heading } from "../components/Layout";
import { gameObj, genreArray } from "./api/games/gamesArray";
import { Grid } from "@mui/material";
import NewsCard from "../components/lists/Cards/NewsCard";
import { Card } from "@mui/material";
import Header from "../components/navigation/Header";
import { IconButton } from "@mui/material";
import { InsertEmoticon, Pageview } from "@mui/icons-material";
import { Button } from "@mui/material";
import CartGames from "../components/clickHandlers/cartGames";
import BoxList from "../components/lists/BoxList";

function getKeyByValueCart(object: object | any, value: number) {
	if (Object.keys(object).find((key) => object[key] === value)) {
		return value;
	} else {
		return 0;
	}
}

function Cart({ gameArray }: { gameArray: Array<any> | any }) {
	const [news, setNews] = React.useState([]);
	const [renderCount, setRenderCount] = React.useState(0);
	console.log("render Count", renderCount);
	let cartObject: object = {};

	useEffect(() => {
		if (typeof window !== "undefined") {
			const cartObj: string | any = localStorage.getItem("cartObj");
			//	console.log("cartObj",cartObj)
			cartObject = JSON.parse(cartObj);
			const cartArray: object = [cartObject];
		}

		let Tp = "";
		var cartGames: Array<any> | any = [];
		let counter = 0;
		gameArray.map((game: { id: string }) =>
			getKeyByValueCart(cartObject, parseInt(game.id)) > 0
				? ((counter = cartGames.length),
				  (cartGames[counter] = game),
				  // console.log("cartGames",cartGames),
				  setNews(cartGames))
				: null
		);
	}, [gameArray, renderCount]);

	async function deleteCartGameTop(news: object | any, value: number) {
		console.log("delete the array inside function", news, value);
		let alreadyAGame = 0;

		let newsArray = news.filter(function (item: Array<string> | any) {
			return item.id !== value;
		});

		localStorage.setItem("cartObj", JSON.stringify(newsArray));
		setNews(newsArray);
	}

	return (
		<>
			<Header></Header>
			<Heading content='Cart Page'></Heading>
			<main>
				<ul style={{ backgroundColor: "white", color: "black" }}>
					{news ? (
						news.map((item: object | any) => (
							<>
								<BoxList key={item.id} article={item}></BoxList>
								<Button
									variant='outlined'
									onClick={() => (
										deleteCartGameTop(news, item.id),
										setRenderCount((prevState: number) => prevState + 1)
									)}>
									Buy
								</Button>
							</>
						))
					) : (
						<p>sorry no items in array</p>
					)}
				</ul>
			</main>
		</>
	);
}

export async function getServerSideProps() {
	//const  res=await fetch(`${API_URL}/api/news`);

	const response = await fetch(`https://mmo-games.p.rapidapi.com/games`, {
		method: "GET",
		headers: {
			"x-rapidapi-host": "mmo-games.p.rapidapi.com",
			"x-rapidapi-key": "3b1497acf6msh9bc671c8b1eadf4p1062afjsnea62995b5794",
		},
	});

	const gameArrayFull = await response.json();
	const gameArray = gameArrayFull.slice(0, 10);
	return {
		props: { gameArray },
	};
}

export default Cart;
