/** @format */

export function checkNumberOnCard(
	pass: number | any,
	cardNumberRegex: string | any
) {
	if (cardNumberRegex.test(pass) && pass.length > 11 && pass.length < 13) {
		return true;
	} else {
		return false;
	}
}

export function duplicatedPassword(
	data: object | any,
	registrationArray: object | any
) {
	if (data.password == registrationArray.password) {
		return true;
	} else {
		return false;
	}
}
