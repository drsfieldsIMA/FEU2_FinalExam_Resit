/** @format */
import useLocalStorage from "../../hooks/useLocalStorage";
import { useState, useEffect } from "react";

async function CartGames(newID) {
	//const oldCartObj = {};
	console.log("newID", newID);
	if (oldCartObj.length > 0) {
		const count = oldCartObj.length;
		const increment = count;
		const cartObj = { ...oldCartObj };
	} else {
		const oldCartObj = {};
		const increment = 0;
		const cartObj = { ...oldCartObj };
	}
	cartObj[increment] = newID;
	//	useLocalStorage("cartObj", JSON.stringify(cartObj));
}

export default CartGames;
