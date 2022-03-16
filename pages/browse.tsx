/** @format */

import React from "react";
import Layout, { Heading } from "../components/Layout";
import { gameObj, genreArray } from "./api/games/gamesArray";
import { Grid } from "@mui/material";
import NewsCard from "../components/lists/Cards/NewsCard";
import { Card } from "@mui/material";
import Header from "../components/navigation/Header";
import { IconButton } from "@mui/material";
import { Pageview } from "@mui/icons-material";
import { Button } from "@mui/material";
import CartGames from "../components/clickHandlers/cartGames";

class browsePage extends React.Component {
	constructor(props) {
		super(props);
		console.log("props==>", props);
		this.state = {
			news: props.news,
			fetchNews: false,
			firstName: "User 1",
		};
	}

	componentDidCatch() {
		console.log("componentDidCatch");
	}

	componentDidMount() {
		const regObj = localStorage.getItem("registration");
		const parseRegObj = JSON.parse(regObj);
		console.log("parseRegObjs", parseRegObj);

		console.log("componentDidMount");

		function getKeyByValue(object, value) {
			return Object.keys(object).find((key) => object[key] === value);
		}

		function deleteCartGame(oldCartArray, newID, alreadyAGame) {
			console.log("delete the array inside function");
			delete oldCartArray[alreadyAGame];
			console.log("after deletion the array", oldCartArray);
			return oldCartArray;
		}

		function startCartGames(newID) {
			let oldCartArray = {};
			let counter = 0;
			var cartObj = { ...oldCartArray };
			cartObj[counter] = newID;
			localStorage.setItem("cartObj", JSON.stringify(cartObj));
		}

		function pushCartGames(oldCartArray, newID) {
			console.log("continue the array");
			console.log("oldCartArray", oldCartArray);
			const count: number = Object.keys(oldCartArray).length;
			console.log("count==>", count);
			const counter: number = count;
			var cartObj = { ...oldCartArray };
			cartObj[counter] = newID;
			localStorage.setItem("cartObj", JSON.stringify(cartObj));
		}

		function cartGames(newID) {
			console.log("newID", newID);
			const oldCartObj = localStorage.getItem("cartObj");
			console.log("oldCartObj==>", oldCartObj);
			if (oldCartObj === undefined || oldCartObj === null) {
				startCartGames(newID);
			} else {
				let oldCartArray = JSON.parse(oldCartObj);
				console.log("oldCartArray", oldCartArray);
				const alreadyAGame = getKeyByValue(oldCartArray, newID);
				console.log("alreadyAGame==>", alreadyAGame);
				if (alreadyAGame) {
					console.log("delete the array");
					let cartObj = deleteCartGame(oldCartArray, newID, alreadyAGame);
					localStorage.setItem("cartObj", JSON.stringify(cartObj));
				} else {
					pushCartGames(oldCartArray, newID);
				}
			}
		}
	}

	render() {
		return (
			<>
				<Header></Header>
				<Heading content='Browse Page'></Heading>
				<main>
					<div className='tagline'>
						<div className='f-box'>
							<input
								className='header-input'
								onChange={(e) => setInputValue(e.target.value)}></input>
							<IconButton
								onClick={(e) => toggleNav()}
								className='header-input__btn'
								component='a'
								size='large'
								color='inherit'>
								<Pageview></Pageview>
							</IconButton>
						</div>
					</div>
					<Grid container spacing={2} px={2} marginLeft={0}>
						{genreArray.slice(0, 5).map((item, index): any => (
							<Grid key={index} item xs={6} sm={4} md={3} lg={2} xl={2}>
								<Button
									variant='outlined'
									onClick={(e) => this.setState({ fetchNews: true })}>
									{item.name}
								</Button>
							</Grid>
						))}
					</Grid>
					<Grid container spacing={2} px={2} marginLeft={0}>
						{this.state.fetchNews
							? this.state.news.map((item): any => (
									<Grid key={item.id} item xs={12} sm={6} md={6} lg={4} xl={4}>
										<Card>
											<div
												className='hero'
												style={{
													backgroundImage: `url(${item.main_image})`,
													backgroundColor: `${"#000080"}`,
													backgroundSize: `${"contain"}`,
												}}></div>
											<h1 className='card-h1'>{item.title}</h1>
											<Button
												variant='outlined'
												onClick={(e) => cartGames(item.id)}>
												Buy
											</Button>
										</Card>
									</Grid>
							  ))
							: this.state.news.map((item): any => (
									<Grid key={item.id} item xs={12} sm={6} md={6} lg={4} xl={4}>
										<Card>
											<div
												className='hero'
												style={{
													backgroundImage: `url(${item.main_image})`,
													backgroundColor: `${"#000080"}`,
													backgroundSize: `${"contain"}`,
												}}></div>
											<h1 className='card-h1'>{item.title}</h1>
											<Button
												variant='outlined'
												onClick={(e) => cartGames(item.id)}>
												Buy
											</Button>
										</Card>
									</Grid>
							  ))}
					</Grid>
				</main>
			</>
		);
	}
}

export async function getServerSideProps() {
	//const  res=await fetch(`${API_URL}/api/news`);
	const news = gameObj;
	return {
		props: { news },
	};
}

export default browsePage;
