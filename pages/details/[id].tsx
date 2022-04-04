/** @format */
import React, { useState, useEffect, FC } from "react";
import PropTypes from "prop-types";
import { Card, Box, Divider, CircularProgress } from "@mui/material";
//import { API_URL } from "../utils/url";
import { gameObj } from "../api/games/gamesArray";
import { Grid } from "@mui/material";
import SingleArticlePage from "../../components/lists/Cards/SingleArticlePage";
import Text from "../../components/Text";
import Link from "next/link";
import CartButton from "../../components/CartButton";
import { InsertEmoticon } from "@mui/icons-material";
import Header from "../../components/navigation/Header";

export default function ProductPost({ game }: { game: Array<object> | any }) {
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		if (game) {
			//	const { title, main_image, article_content, category } = game;
			var content = game?.description?.replace(/<img[^>]*>/, "");
			const imgTags = game?.description?.match(/<img [^>]*src="[^"]*"[^>]*>/gm);
			const frameTags = game?.description?.match(
				/<iframe [^>]*src="[^"]*"[^>]*>/gm
			);
			setIsLoading(false);
		}
	}, [game]);

	return (
		<>
			<Header></Header>
			{isLoading ? (
				<Box className='container-circular-progress'>
					<CircularProgress className='circular-progress' />
				</Box>
			) : (
				<Box className='product-box'>
					<Card
						className='singleCard'
						style={{ marginBottom: "2em", marginTop: "1em" }}>
						<Grid container spacing={2} px={2} marginLeft={0}>
							<Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
								<div
									className='img-responsive ratio-4-3'
									style={{
										background: `url(${game?.thumbnail}) 50% 50% no-repeat`,
										backgroundSize: "cover",
									}}></div>
								<div className='thumbnail-group'>
									{game.screenshots
										? game.screenshots.map((item: object | any) => (
												<div
													key={item.id}
													className='content-container img-thumbnail'
													style={{
														background: `url(${item.image}) 50% 50% no-repeat`,
													}}></div>
										  ))
										: null}
								</div>
							</Grid>
							<Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
								<div className='flex-box__container__id'>
									<div className='flex-box__id'>
										<h1 className='detail-h1'>{game.title}</h1>
										<CartButton
											ID={parseInt(game.id)}
											key={game.id}
											className={"detail-btn"}></CartButton>
									</div>
								</div>
								<div className='flex-box__container__id'>
									<div className='flex-box__id'>
										<h2 className='detail-price'>$19.99</h2>
										<h2 className='detail-h2'>{game.release_date}</h2>
									</div>
								</div>
								<Divider
									sx={{
										borderColor: "#00035a",
										my: 3,
									}}
								/>
								<Link href={`/category?${game.genre}`}>
									<a className='category-link'>{game.genre}</a>
								</Link>
								<Divider
									sx={{
										borderColor: "#00035a",
										my: 3,
									}}
								/>
								<div
									className='content-container'
									color='#e52d27'
									dangerouslySetInnerHTML={{ __html: `${game.description}` }}
								/>
								<Text
									fontFamily={"demos-next"}
									size='12px'
									color={"#00035a"}
									content={game.id}></Text>
								<Text
									fontFamily={"demos-next"}
									size='12px'
									color={"#00035a"}
									content={game.createdAt}></Text>
							</Grid>
						</Grid>
					</Card>
				</Box>
			)}
		</>
	);
}

export async function getStaticPaths() {
	//	const res = await fetch(`http://localhost:1337/games`);
	//	const games = await res.json();
	const paths = gameObj.slice(0, 5).map((post) => ({
		params: { id: String(post.id) },
	}));
	return {
		paths,
		fallback: true,
	};
}

export async function getStaticProps({ params }: { params: object | any }) {
	console.log("Static Params", params);
	let { id } = params;
	console.log("Static id", id);
	let idInt = parseInt(id);
	//const res = await fetch(`http://localhost:1337/games?Slug=${slug}`);
	//	const data = await res.json();
	//	const  game =  gameObject.filter(post => (post.Slug == slug));
	let game = gameObj.filter((post) => post.id == 131237);

	/* const response = await fetch(
		`https://mmo-games.p.rapidapi.com/game?id=${id}`,
		{
			method: "GET",
			headers: {
				"x-rapidapi-host": "mmo-games.p.rapidapi.com",
				"x-rapidapi-key": "3b1497acf6msh9bc671c8b1eadf4p1062afjsnea62995b5794",
			},
		}
	);

	if (response.status === 200) {
		console.log("response", response);
		game = await response.json();
	} */

	//	console.log("game asset", asset);
	return {
		props: { game },
	};
}
