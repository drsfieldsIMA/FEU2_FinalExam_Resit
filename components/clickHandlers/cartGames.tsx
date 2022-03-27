/** @format */
import useLocalStorage from "../../hooks/useLocalStorage";
import { useState, useEffect } from "react";

function getKeyByValue(object: object | any, value: number) {
	return Object.keys(object).find((key) => object[key] === value);
}

function deleteCartGame(
	oldCartArray: object | any,
	newID: number,
	alreadyAGame: string
) {
	delete oldCartArray[alreadyAGame];
	return oldCartArray;
}

function startCartGames(newID: number) {
	let oldCartArray = {};
	let counter = 0;
	var cartObj: object | any = { ...oldCartArray };
	cartObj[counter] = newID;
	localStorage.setItem("cartObj", JSON.stringify(cartObj));
}

function pushCartGames(oldCartArray: object | any, newID: number) {
	console.log("continue the array");
	const count: number = Object.keys(oldCartArray).length;
	const counter: number = count;
	var cartObj = { ...oldCartArray };
	cartObj[counter] = newID;
	localStorage.setItem("cartObj", JSON.stringify(cartObj));
}

export default function CartGames(newID: number) {
	const regObj: string | any = localStorage.getItem("registration");
	const parseRegObj: object | any = JSON.parse(regObj);
	const oldCartObj: object | any = localStorage.getItem("cartObj");
	if (oldCartObj === undefined || oldCartObj === null) {
		startCartGames(newID);
	} else {
		let oldCartArray = JSON.parse(oldCartObj);
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
