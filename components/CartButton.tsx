/** @format */

import React, { FC, ReactElement } from "react";
import Button from "@mui/material/Button";
import CartGames from "./clickHandlers/cartGames";
import ShoppingBasketOutlinedIcon from "@material-ui/icons/ShoppingBasketOutlined";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";

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
	className,
}: any | Array<string>): ReactElement<any, any> {
	//const [button, setButton] = React.useState(-1);
	let cartNo: number | null = -1;

	const clickHandler = (event: React.ChangeEvent<any>) => {
		//event.target.classList.toggle("MyFilled");
		//	console.log("innerHTM", typeof event.target.innerText);
		console.log("event target", event.target.style.backgroundColor);
		event.target.style.backgroundColor == "#fbf9be" ? "#bf2604" : "#fbf9be";
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
				className={`${className} MyFilled`}
				variant='outlined'
				startIcon={<ShoppingBasketOutlinedIcon fontSize='small' />}
				onClick={(e) => (clickHandler(e), CartGames(ID))}>
				Remove
			</Button>
		</>
	) : (
		<Button
			key={index}
			className={`${className} MyEmpty`}
			variant='outlined'
			startIcon={<ShoppingBasketIcon fontSize='small' />}
			onClick={(e) => (clickHandler(e), CartGames(ID))}>
			Add
		</Button>
	);
}
