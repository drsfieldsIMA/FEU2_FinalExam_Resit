/** @format */
import React from "react";
import PropTypes from "prop-types";
import { Card, Box, Divider, CircularProgress } from "@mui/material";
//import { API_URL } from "../utils/url";
import { gameObj } from "../api/games/gamesArray";
import { Grid } from "@mui/material";
import SingleArticlePage from "../../components/lists/Cards/SingleArticlePage";
import Text from "../../components/Text";
import Link from "next/link";

export default function productPost({ asset }) {
	console.log("game asset scoped==>", asset);
	const [isLoading, setIsLoading] = React.useState(true);

	React.useEffect(() => {
		if (asset) {
			//	const { title, main_image, article_content, category } = asset;
			var content = asset?.description?.replace(/<img[^>]*>/, "");
			const imgTags = asset?.description?.match(
				/<img [^>]*src="[^"]*"[^>]*>/gm
			);
			const frameTags = asset?.description?.match(
				/<iframe [^>]*src="[^"]*"[^>]*>/gm
			);
			setIsLoading(false);
		}
	}, [asset]);

	return (
		<>
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
										background: `url(${asset?.thumbnail}) 50% 50% no-repeat`,
										backgroundSize: "cover",
									}}></div>
								<div className='thumbnail-group'>
									{asset.screenshots
										? asset.screenshots.map((item) => (
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
								<h2>{asset.title}</h2>
								<h4>{asset.release_date}</h4>
								<Divider
									sx={{
										borderColor: "#00035a",
										my: 3,
									}}
								/>
								<Link href={`/category?${asset.genre}`}>
									<a className='category-link'>{asset.genre}</a>
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
									dangerouslySetInnerHTML={{ __html: `${asset.description}` }}
								/>
								<Text color={"#00035a"} content={asset.id}></Text>
								<Text color={"#00035a"} content={asset.createdAt}></Text>
							</Grid>
						</Grid>
					</Card>
				</Box>
			)}
		</>
	);
}

export async function getStaticPaths() {
	//	const res = await fetch(`http://localhost:1337/assets`);
	//	const assets = await res.json();
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
	//const res = await fetch(`http://localhost:1337/assets?Slug=${slug}`);
	//	const data = await res.json();
	//	const  asset =  assetArr.filter(post => (post.Slug == slug));
	const response = await fetch(
		`https://mmo-games.p.rapidapi.com/game?id=${id}`,
		{
			method: "GET",
			headers: {
				"x-rapidapi-host": "mmo-games.p.rapidapi.com",
				"x-rapidapi-key": "3b1497acf6msh9bc671c8b1eadf4p1062afjsnea62995b5794",
			},
		}
	);
	const asset = await response.json();
	console.log("game asset", asset);
	return {
		props: { asset },
	};
}
