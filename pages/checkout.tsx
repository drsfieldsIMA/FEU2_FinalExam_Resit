/** @format */

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { boolean } from "yup";
import PaymentCardForm from "../components/auth/PaymentCardForm";
import Card from "@mui/material/Card";
import Header from "../components/navigation/Header";
import { Heading } from "../components/Layout";

function getKeyByValueCart(object: object | any, value: number) {
	if (Object.keys(object).find((key) => object[key] === value)) {
		console.log("value", value);
		return value;
	} else {
		return 0;
	}
}

function Payment({ gameArray }: { gameArray: Array<any> | any }) {
	let cartObject: object = {};
	const [news, setNews] = useState([]);
	const [renderCount, setRenderCount] = useState(1);
	const [noGames, setNoGames] = useState(0);
	const [totGames, setTotGames] = useState(0);
	useEffect(() => {
		if (typeof window !== "undefined") {
			const cartObj: string | any = localStorage.getItem("cartObj");
			//	console.log("cartObj",cartObj)
			cartObject = JSON.parse(cartObj);
			const cartArray = { ...cartObject };

			let noOfGames = Object.keys(cartArray).length;
			console.log("noOfGames", noOfGames);
			setNoGames(noOfGames);
			let totalPriceOfGames = 20 * noOfGames;
			setTotGames(totalPriceOfGames);
			console.log("News", totalPriceOfGames);
		}
	}, []);

	return (
		<>
			<Header></Header>
			<Heading
				classNameString='page_title'
				size='1'
				color='#fbf9be'
				content='Payment Page'></Heading>
			<div className='flex-box__container'>
				<div className='flex-box'>
					<Card className='checkout-summary'>
						<Link href='/cart' passHref={false}>
							<a>Cart Page</a>
						</Link>
						<table className='checkout-table'>
							<tr>
								<th className='tab-column'>Number of games</th>
								<th className='tab-column'>Total Price</th>
							</tr>
							{noGames ? (
								<tr>
									<th>{noGames} x Items</th>
									<th>${totGames}</th>
								</tr>
							) : null}
						</table>
					</Card>
					<button
						onClick={() => {
							setRenderCount((prevState) => prevState + 1);
						}}
						className='primary-btn'>
						Load Amount
					</button>
				</div>
				<PaymentCardForm />
			</div>
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

export default Payment;
