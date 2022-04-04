/** @format */

import * as React from "react";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import PropTypes from "prop-types";
import { useRouter } from "next/router";
import { useEffect, useState, useRef, useContext } from "react";
import useDeviceSize from "./DeviceSize";
import Link from "next/link";
import { destroyCookie, parseCookies } from "nookies";
import router from "next/router";
import { ReactJSXElement } from "@emotion/react/types/jsx-namespace";
import { NextComponentType } from "next";
import { Filter, LoginTwoTone, Tune } from "@mui/icons-material";
import { PersonRounded, Pageview } from "@mui/icons-material";
import useSWR, { SWRConfig } from "swr";
import NextLink from "next/link";
import { userContext, valueContext } from "../../hooks/userContext";
import DropdownList from "../lists/DropdownList";
import DeleteIcon from "@mui/icons-material/Delete";

const Header: any = () => {
	const { user, setUser } = useContext(userContext);
	useEffect(() => {
		if (typeof window !== "undefined") {
			const regObj: string | any = localStorage.getItem("registration");
			const registrationArray = JSON.parse(regObj);
			if (registrationArray?.userName) {
				console.log("registration", registrationArray.userName);
				setUser(registrationArray.userName);
			}
		}
	}, [setUser]);

	const [inputValue, setInputValue] = React.useState("");
	const [searchTerm, setSearchTerm] = React.useState("");
	const [modalIsOpen, setModalIsOpen] = React.useState(false);

	const router = useRouter();
	const [toggleMenu, setToggleMenu] = useState(false);

	const [width, height] = useDeviceSize();

	const toggleNav = () => {
		setToggleMenu(!toggleMenu);
	};

	const toggleLogo = () => {
		router.pathname === "/" ? toggleNav() : null;
	};

	return (
		<nav className='header'>
			<Link href='/'>
				<a className='logo-link' onClick={() => toggleLogo()}>
					<div className='logo'></div>
				</a>
			</Link>

			{(toggleMenu || width > 768) && (
				<ul className='list'>
					<li className='items'>
						<Link href='/browse'>
							<div className='nav-genre-item'></div>
						</Link>
						<DropdownList></DropdownList>
					</li>
					<li className='items'>
						<Link href='/cart'>
							<div className='nav-cart-item'></div>
						</Link>
						<Link href='/cart'>
							<a className='items__link' onClick={() => toggleNav()}>
								Cart
							</a>
						</Link>
					</li>
					<li className='items'>
						<div className='nav-card-item'></div>
						<Link href='/checkout'>
							<a className='items__link' onClick={() => toggleNav()}>
								Check-out
							</a>
						</Link>
					</li>
					{user ? (
						<>
							<Button
								className='items login-btn'
								component='a'
								startIcon={<LoginTwoTone fontSize='small' />}
								onClick={() => {
									// call logout
									setUser(null), router.push("/");
								}}>
								{`${user} Logout`}
							</Button>
						</>
					) : (
						<button>Login</button>
					)}
				</ul>
			)}

			<IconButton
				size='large'
				edge='end'
				color='inherit'
				aria-label='menu'
				onClick={toggleNav}
				className='toggle-nav'
				sx={{
					display: {
						mr: 2,
						xs: "inline-flex",
						sm: "none",
					},
				}}>
				<MenuIcon sx={{ fontSize: "3rem" }} />
			</IconButton>
		</nav>
	);
};

export async function getStaticProps({ params }: { params: object | any }) {
	console.log("Navigation Params==>", params);

	return {
		props: { params },
	};
}

Header.propTypes = {
	onSidebarOpen: PropTypes.func,
	articles: PropTypes.any,
};

export default Header;
