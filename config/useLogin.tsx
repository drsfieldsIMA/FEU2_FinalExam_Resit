/** @format */

export const useLogin = async () => {
	const regObj = localStorage.getItem("registration");
	const regObjParse = JSON.parse(regObj);
	return {
		username: regObjParse.secondName,
	};
};
