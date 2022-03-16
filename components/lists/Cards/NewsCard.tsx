/** @format */

import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { useRouter } from "next/router";
import Button from "@mui/material/Button";
import PropTypes from "prop-types";
import dayjs from "dayjs";
import Hero from "../../Hero";
import Grid from "@mui/material/Grid";
import Link from "next/link";
import { ReactJSXElement } from "@emotion/react/types/jsx-namespace";
import { IconButton } from "@mui/material";
import { Science, SportsFootball } from "@mui/icons-material";

type CardArticleParams = {
	title: string;
	content: string;
	id?: number;
	main_image?: any;
	category: string;
	slug?: string;
	author?: any;
	createdAt?: any;
	description?: string;
};

const NewsCard = ({ article }: { article: CardArticleParams }) => {
	const cardArticle: CardArticleParams = article;

	console.log("article News Cards==>", article);

	return (
		<Card
			className={`news-card`}
			sx={{ width: 210, height: 400, marginLeft: 0 }}>
			<CardContent>
				<Link key={cardArticle.slug} href={`/${cardArticle.slug}`}>
					<a>
						<Hero
							title={cardArticle.title}
							imageSrc={`${cardArticle.main_image}`}
							bgColor='#f2f0e4'
							bgSize='contain'
						/>
						<Grid
							container
							rowSpacing={1}
							columnSpacing={{ xs: 1, sm: 1, md: 2, lg: 3 }}
							marginTop={{ xs: 1, sm: 2, md: 3 }}>
							<Grid key={1} item xs={6} sm={6} md={3}>
								<Typography
									variant='h4'
									color='text.primary'
									className='std-size__font'
									fontFamily='protipo, sans-serif'>
									{10 / 01 / 1986}
								</Typography>
							</Grid>
							<Grid key={2} item xs={6} sm={6} md={3}>
								<Typography
									variant='body1'
									color='text.primary'
									className='lun-primary'
									fontFamily='protipo, sans-serif'>
									{`${cardArticle.category}`}
								</Typography>
								<IconButton>
									<SportsFootball></SportsFootball>
								</IconButton>
							</Grid>
							<Grid key={3} item xs={12} sm={12} md={6}>
								<Typography
									variant='body1'
									color='text.primary'
									className='lun-secondary'
									fontFamily='protipo, sans-serif'>
									{`${cardArticle.author}`}
								</Typography>
							</Grid>
							<Grid key={4} item xs={12} sm={12} md={12}>
								<Typography
									variant='body1'
									color='text.primary'
									className='std-size__font'
									fontFamily='protipo, sans-serif'>
									{cardArticle.description}
								</Typography>
							</Grid>
						</Grid>
					</a>
				</Link>
			</CardContent>
		</Card>
	);
};

NewsCard.propTypes = {
	props: PropTypes.node,
	articles: PropTypes.node,
	image: PropTypes.arrayOf(PropTypes.string),
	title: PropTypes.string,
	category: PropTypes.string,
	content: PropTypes.string,
	author: PropTypes.string,
};

export default NewsCard;
