/** @format */

import React from "react";
import myFavouries from "./favourites";
import Link from "next/link";
import { userContext } from "../../hooks/userContext";
import { boolean } from "yup";

type MyProps = { prefferedcolor: string; favorite: boolean };
type MyState = { prefferedcolor: string; favorite: boolean };

class DashboardPage extends React.Component<MyProps, MyState> {
	constructor(props: MyProps) {
		super(props);
		this.state = { prefferedcolor: "blue", favorite: false };
	}
	shouldComponentUpdate() {
		return true;
	}
	changeColor = () => {
		const adminProps: string | any = localStorage.getItem("registration");
		const admin: object | any = JSON.parse(adminProps);
		this.state.prefferedcolor == "blue"
			? this.setState({ prefferedcolor: "red" })
			: this.setState({ prefferedcolor: "blue" });
	};

	componentDidMount() {
		const adminProps: string | any = localStorage.getItem("registration");
		console.log("adminProps", JSON.parse(adminProps));
		if (adminProps) {
			//here you can set your state if it is necessary
		}
	}

	render() {
		return (
			<div>
				<Link href='/admin/favourites' passHref={false}>
					<a>Favourites Page</a>
				</Link>
				<h1>Dashboard Page color {this.state.prefferedcolor}</h1>
				<p>
					Ipsom Lorem ipsum dolor sit amet consectetur adipisicing elit. A alias
					obcaecati magni architecto. Beatae sed quasi delectus similique.
					Inventore molestiae in iste laudantium ea accusantium rem illum
					architecto. Debitis maxime voluptates incidunt id temporibus. Esse qui
					debitis quod repellat, quia dicta atque deserunt ducimus nostrum.
				</p>
				<button
					style={{ backgroundColor: this.state.prefferedcolor }}
					type='button'
					onClick={this.changeColor}>
					Change color
				</button>
			</div>
		);
	}
}

DashboardPage.contextType = userContext;

export default DashboardPage;
