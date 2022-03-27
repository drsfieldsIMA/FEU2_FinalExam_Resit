/** @format */

export const checkEmailString = (
	userEmail: string | any,
	emailRegex: string | any
) => {
	if (emailRegex.test(userEmail) && userEmail.length > 2) {
		return true;
	} else {
		return false;
	}
};
