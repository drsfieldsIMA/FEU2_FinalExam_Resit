/** @format */

import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { genreArrayLabels } from "../../utils/backend";

export default function DropdownList() {
	const [anchorEl, setAnchorEl] = React.useState(null);
	const open = Boolean(anchorEl);
	const handleClick = (event: React.ChangeEvent<any>) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	return (
		<>
			<Button
				startIcon={<ArrowDropDownIcon />}
				id='basic-button'
				aria-controls={open ? "basic-menu" : undefined}
				aria-haspopup='true'
				aria-expanded={open ? "true" : undefined}
				className={"drop-down"}
				onClick={handleClick}>
				Genres
			</Button>
			<Menu
				id='basic-menu'
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}
				MenuListProps={{
					"aria-labelledby": "basic-button",
				}}>
				{genreArrayLabels.slice(0, 10).map((item, index): any => (
					<MenuItem key={item.id} onClick={handleClose}>
						<a href={`/browse?${item.name}`}>{item.name}</a>
					</MenuItem>
				))}
			</Menu>
		</>
	);
}
