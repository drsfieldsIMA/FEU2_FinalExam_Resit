/** @format */

export const useLogin = async () => {
	const regObj: object | any = localStorage.getItem("registration");
	const regObjParse: object | any = JSON.parse(regObj);
	return {
		username: regObjParse.userName,
	};
};
