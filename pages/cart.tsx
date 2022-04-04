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
		console.log("line 18", value);
		return value;
	} else {
		return 0;
	}
}

function Cart({ gameArray }: { gameArray: Array<any> | any }) {
	const [news, setNews] = React.useState([]);
	const [renderCount, setRenderCount] = React.useState(0);
	const [noGames, setNoGames] = React.useState(0);
	const [totGames, setTotGames] = React.useState(0);
	console.log("render Count", renderCount);
	let cartObject: object = {};

	useEffect(() => {
		if (typeof window !== "undefined") {
			const cartObj: string | any = localStorage.getItem("cartObj");
			//	console.log("cartObj",cartObj)
			cartObject = JSON.parse(cartObj);
			const cartArray: Array<String> | any = Object.values(cartObject);
			const noOfGames = cartArray.length;
			const TotalOfGames = 20 * noOfGames;
			setNoGames(noOfGames);
			setTotGames(TotalOfGames);
			setNews(cartArray);
			console.log("News", news);
		}
	}, [gameArray, renderCount]);

	async function deleteCartGameTop(news: object | any, value: number) {
		console.log("delete the array inside function", news, value);
		let alreadyAGame = 0;

		let newsArray = news.filter(function (item: Array<string> | any) {
			return item.id !== value;
		});

		localStorage.setItem("cartObj", JSON.stringify(newsArray));
		setNews(newsArray);
		console.log("news", news);
	}

	return (
		<>
			<Header></Header>
			<Heading
				classNameString='page_title'
				size='1'
				color='#fbf9be'
				content='Cart Page'></Heading>
			<main>
				<button
					onClick={() => setRenderCount((prevState: number) => prevState + 1)}>
					Load Games
				</button>
				<div style={{ backgroundColor: "white", color: "black" }}>
					<table>
						<tr>
							<th className='tab-column'>Game</th>
							<th className='tab-column'>Price</th>
							<th className='tab-column'>Remove</th>
						</tr>
						{news.length > 0 ? (
							news.map((item: object | any, index) => (
								<tr key={index}>
									<td key={item.title}>{item.title}</td>
									<td key={item.category}>$20</td>
									<td key={item.id}>
										<Button
											key={index}
											variant='outlined'
											className='MyFilled'
											onClick={() => (
												deleteCartGameTop(news, item.id),
												setRenderCount((prevState: number) => prevState + 1)
											)}>
											Remove
										</Button>
									</td>
								</tr>
							))
						) : (
							<tr>
								<td>sorry no items in array</td>
							</tr>
						)}
						<tfoot>
							<tr>
								<th className='tab-column'>Total Games</th>
								<th className='tab-column'>{noGames}</th>
								<th className='tab-column'>Total Cost</th>
								<th className='tab-column'>{totGames}</th>
							</tr>
						</tfoot>
					</table>
				</div>
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

	const gameArray = await response.json();
	return {
		props: { gameArray },
	};
}

export default Cart;
