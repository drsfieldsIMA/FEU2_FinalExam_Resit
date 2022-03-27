/** @format */

import React, { FC, ReactElement } from "react";
import Button from "@mui/material/Button";
import CartGames from "./clickHandlers/cartGames";

function getKeyByValue(object: object | any, value: number) {
	//	console.log("object,value==>",object,value)
	if (object) {
		return Object.keys(object).find((key) => object[key] === value);
	} else {
		return null;
	}
}

export default function CartButton({
	ID,
	index,
}: any | Array<string>): ReactElement<any, any> {
	//const [button, setButton] = React.useState(-1);
	let cartNo: number | null = -1;

	const clickHandler = (event: React.ChangeEvent<any>) => {
		event.target.classList.toggle("MyFilled");
		//	console.log("innerHTM", typeof event.target.innerText);
		event.target.innerText == "ADD"
			? (event.target.innerText = "REMOVE")
			: (event.target.innerText = "ADD");
	};

	if (typeof window !== "undefined") {
		const cartObj: string | any = localStorage.getItem("cartObj");
		//	console.log("cartObj", cartObj);
		if (typeof cartObj != null && typeof cartObj != "undefined") {
			const cartArray: Array<any> | any = JSON.parse(cartObj);
			let cartString: string | number | any = getKeyByValue(
				cartArray,
				parseInt(ID)
			);
			cartNo = parseInt(cartString);
		}
	}

	return cartNo && cartNo > -1 ? (
		<>
			<Button
				key={index}
				className='MyFilled MyEmpty'
				variant='outlined'
				onClick={(e) => (clickHandler(e), CartGames(ID))}>
				Remove
			</Button>
		</>
	) : (
		<Button
			key={index}
			className='MyEmpty'
			variant='outlined'
			onClick={(e) => (clickHandler(e), CartGames(ID))}>
			Add
		</Button>
	);
}
