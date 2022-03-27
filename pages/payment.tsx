/** @format */

import React from "react";
import Link from "next/link";
import { boolean } from "yup";
import PaymentCardForm from "../components/auth/PaymentCardForm";
import Card from "@mui/material/Card";
import Header from "../components/navigation/Header";
import { Heading } from "../components/Layout";

function Payment() {
	return (
		<>
			<Header></Header>
			<Heading content='Payment Page'></Heading>
			<div>
				<Card>
					<Link href='/cart' passHref={false}>
						<a>Cart Page</a>
					</Link>
				</Card>

				<PaymentCardForm />
			</div>
		</>
	);
}

export default Payment;
