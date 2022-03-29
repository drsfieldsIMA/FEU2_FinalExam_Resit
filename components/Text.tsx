/** @format */
import React from "react";
import PropTypes from "prop-types";

function Text({
	color,
	size,
	fontFamily,
	content,
}: {
	color: string;
	size: string | any;
	fontFamily: string;
	content: string;
}) {
	return (
		<p style={{ color: color, fontSize: size, fontFamily: fontFamily }}>
			{content}
		</p>
	);
}

export default Text;
