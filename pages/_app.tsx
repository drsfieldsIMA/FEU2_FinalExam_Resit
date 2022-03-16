/** @format */

import "../styles/globals.scss";
import type { AppProps } from "next/app";
import { useState, useMemo } from "react";
import { userContext, valueContext } from "../hooks/userContext";

function MyApp({ Component, pageProps }: AppProps) {
	const [user, setUser] = useState(null);
	const [valueTab, setValueTab] = useState("1");

	const userValue = useMemo(() => ({ user, setUser }), [user, setUser]);
	const TabValue = useMemo(
		() => ({ valueTab, setValueTab }),
		[valueTab, setValueTab]
	);
	return (
		<userContext.Provider value={userValue}>
			<valueContext.Provider value={TabValue}>
				<Component {...pageProps} />;
			</valueContext.Provider>
		</userContext.Provider>
	);
}

export default MyApp;
