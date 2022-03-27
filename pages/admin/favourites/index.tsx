/** @format */

import React, { TimeHTMLAttributes, useState } from "react";
import Link from "next/link";
import BoxList from "../../../components/lists/BoxList";

type MyProps = {
	articlesArray: Array<any>;
	spliceLimit: number;
	prevArray: Array<any>;
};
type MyState = {
	articlesArray: Array<any>;
	spliceLimit: number;
	prevArray: Array<any>;
};

class myFavourites extends React.Component<MyProps, MyState> {
	constructor(props: MyProps) {
		super(props);
		this.state = {
			spliceLimit: 4,
			articlesArray: [],
			prevArray: [],
		};
	}

	componentDidMount() {
		const fetchGame = async () => {
			const response = await fetch(
				`https://mmo-games.p.rapidapi.com/latestnews`,
				{
					method: "GET",
					headers: {
						"x-rapidapi-host": "mmo-games.p.rapidapi.com",
						"x-rapidapi-key":
							"3b1497acf6msh9bc671c8b1eadf4p1062afjsnea62995b5794",
					},
				}
			);
			const articlesArray = await response.json();
			this.setState({
				articlesArray: articlesArray.splice(0, 4),
			});
		};
		fetchGame();
	}

	componentDidUpdate() {
		console.log("componentDidUpdate");
	}

	componentDidCatch() {
		console.log("componentDidCatch");
	}

	handleButtonClick = () => {
		const fetchUserEmail = async () => {
			const response = await fetch(
				`https://mmo-games.p.rapidapi.com/latestnews`,
				{
					method: "GET",
					headers: {
						"x-rapidapi-host": "mmo-games.p.rapidapi.com",
						"x-rapidapi-key":
							"3b1497acf6msh9bc671c8b1eadf4p1062afjsnea62995b5794",
					},
				}
			);
			console.log("response==>", response);
			const articlesArray = await response.json();
			console.log("title", articlesArray);
			const { title, article_content, id } = articlesArray;
			this.setState({
				prevArray: this.state.articlesArray,
			});
			console.log("limit==>", this.state.spliceLimit);
			console.log(
				"article_content",
				articlesArray.splice(0, this.state.spliceLimit)
			);
			this.setState({
				articlesArray: this.state.prevArray.concat(
					articlesArray.splice(0, this.state.spliceLimit)
				),
			});
		};

		fetchUserEmail();
	};

	render() {
		return (
			<div>
				<h1>A user</h1>
				<ul >
					{this.state.articlesArray &&
						this.state.articlesArray.map((article, index) => (
							<BoxList key={article.id} article={article}></BoxList>
						))}
				</ul>
				<button onClick={this.handleButtonClick}>Fetch Games</button>
			</div>
		);
	}
}

export default myFavourites;
