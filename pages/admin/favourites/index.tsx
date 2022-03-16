/** @format */

import React, { useState } from "react";
import Link from "next/link";
import BoxList from "../../../components/lists/BoxList";

class myFavourites extends React.Component {
	componentDidMount() {
		console.log("componentDidMount");
	}

	constructor(props) {
		super(props);
		this.state = {
			articlesArray: [
				{ title: "game 1", article_content: "", id: "1" },
				{ title: "game 2", article_content: "", id: "2" },
			],
		};
	}

	componentDidUpdate() {
		console.log("componentDidUpdate");
		console.log("this.state==>", this.state.articlesArray);
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
			console.log("article_content", article_content);

			this.setState({
				articlesArray,
			});
		};
		fetchUserEmail();
	};

	render() {
		return (
			<div>
				<h1>A user</h1>
				<ul>
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
