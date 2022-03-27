/** @format */
import React from "react";
import "../styles/globals.scss";
import type { AppProps } from "next/app";
import { useState, useMemo } from "react";
import { userContext, valueContext } from "../hooks/userContext";
import { QueryClient, QueryClientProvider } from "react-query";

function MyApp({ Component, pageProps }: AppProps) {
	const [user, setUser] = useState(null);
	const [valueTab, setValueTab] = useState("1");
	const [queryClient] = React.useState(() => new QueryClient());

	const userValue = useMemo(() => ({ user, setUser }), [user, setUser]);
	const TabValue = useMemo(
		() => ({ valueTab, setValueTab }),
		[valueTab, setValueTab]
	);
	return (
		<QueryClientProvider client={queryClient}>
		<userContext.Provider value={userValue}>
			<valueContext.Provider value={TabValue}>
				<Component {...pageProps} />;
			</valueContext.Provider>
		</userContext.Provider>
		</QueryClientProvider>
	);
}

export default MyApp;
