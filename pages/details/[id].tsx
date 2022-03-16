/** @format */
import React from "react";
import PropTypes from "prop-types";
import { Card, Box, Divider } from "@mui/material";
//import { API_URL } from "../utils/url";
import { gameObj } from "../api/games/gamesArray";
import { Grid } from "@mui/material";
import { SingleArticlePage } from "../../components/lists/Cards/SingleArticlePage";

export default function productPost({ asset }) {
	console.log("asset top==>", asset);
	const { title, main_image, article_content, category } = asset;
	return (
		<>
			{/* <Box className='product-box height-75'>
				<Card
					className='singleCard'
					style={{ height: "75vh", marginBottom: "2em", marginTop: "1em" }}>
					<Grid
						container
						rowSpacing={1}
						columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
						<Grid item xs={12} sm={12} md={6} lg={6} xl={4}>
							<div
								className='img-responsive img-thumbnail ratio-4-3'
								style={{
									background: `url(${asset.main_image}) 50% 50% no-repeat`,
									backgroundSize: "cover",
								}}></div>
						</Grid>
						<Grid className='col-sm-12 col-md-6'>
							<h2>{asset.title}</h2>
							<Divider
								sx={{
									borderColor: "#00035a",
									my: 3,
								}}
							/>
							<h3>{asset.category}</h3>
						</Grid>
					</Grid>
				</Card>
			</Box> */}
			<SingleArticlePage single={asset}></SingleArticlePage>
		</>
	);
}

export async function getStaticPaths() {
	//	const res = await fetch(`http://localhost:1337/assets`);
	//	const assets = await res.json();
	return {
		paths: [
			{ params: { id: "131238" } },
			{ params: { id: "131237" } },
			{ params: { id: "131236" } },
		],
		fallback: true,
	};
}

export async function getStaticProps({ params }) {
	const { id } = params;
	//const res = await fetch(`http://localhost:1337/assets?Slug=${slug}`);
	//	const data = await res.json();
	//	const  asset =  assetArr.filter(post => (post.Slug == slug));
	const ith = gameObj.findIndex((x) => x.id === id);
	console.log("ith==>", ith);
	const data = gameObj[ith];
	console.log("asset static==>", data);
	return {
		props: { asset: data },
	};
}

productPost.propTypes = {
	assets: PropTypes.arrayOf(PropTypes.string),
	asset: PropTypes.arrayOf(PropTypes.string),
	title: PropTypes.string,
	id: PropTypes.number,
};
