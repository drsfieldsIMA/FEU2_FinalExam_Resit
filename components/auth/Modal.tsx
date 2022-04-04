/** @format */

import React from "react";

function Modal({
	setOpenModal,
}: {
	setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}) {
	return (
		<div className='modalBackground'>
			<div className='modalContainer'>
				<div className='titleCloseBtn'>
					<button
						onClick={() => {
							setOpenModal(false);
						}}>
						X
					</button>
				</div>
				<div className='title'>
					<h1>Are You Sure You Want to Continue with the payment?</h1>
				</div>
				<div className='body'>
					<p>Click Continue to confirm Payment</p>
				</div>
				<div className='footer'>
					<button
						onClick={() => {
							setOpenModal(false);
						}}
						id='cancelBtn'>
						Cancel
					</button>
					<button>Continue</button>
				</div>
			</div>
		</div>
	);
}

export default Modal;
