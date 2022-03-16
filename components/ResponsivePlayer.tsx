/** @format */

import ReactPlayer from "react-player";
import { Component } from "react";
import { CircularProgress } from "@mui/material";
import Box from "@mui/material/Box";

class ResponsivePlayer extends Component {
	constructor(props) {
		super(props);
		this.state = { isLoadingVideo: true };
	}

	componentDidMount() {
		setTimeout(() => {
			this.setState({ isLoadingVideo: false });
		}, 6500);
	}

	render() {
		return (
			<main>
				{this.state.isLoadingVideo ? (
					<div className='circular-progress-wrapper'>
						<Box className='container-circular-progress'>
							<CircularProgress className='circular-progress' />
						</Box>
					</div>
				) : (
					<div className='player-wrapper'>
						<ReactPlayer
							className='react-player'
							url='https://www.youtube.com/watch?v=VyHB28SqsLQ&t=15s'
							width='100%'
							height='100%'
							controls={true}
							playing={true}
						/>
					</div>
				)}
			</main>
		);
	}
}

export default ResponsivePlayer;
