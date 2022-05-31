import React from 'react';
import { MainContext } from '../assets/context/main.context';
import { MainContextData, Quote, QuotePagination, QuotesData } from '../assets/types/types';
import type { AppProps } from 'next/app'

import 'bootstrap-icons/font/bootstrap-icons.css'
import '../styles/globals.css'

function MyApp({ Component, pageProps }: AppProps) {
	const [quotes, setQuotes]: [QuotesData | null, React.Dispatch<React.SetStateAction<QuotesData | null>>] = React.useState<QuotesData | null>(null);
	const [selectedAuthorContent, setSelectedAuthorContent]: [QuotesData | null, React.Dispatch<React.SetStateAction<QuotesData | null>>] = React.useState<{ pagination: QuotePagination, quotes: Array<Quote> } | null>(null);
	const [selectedAuthor, setSelectedAuthor]: [string | null, React.Dispatch<React.SetStateAction<string | null>>] = React.useState<null | string>(null);
	const [isLoading, setIsLoading]: [boolean, React.Dispatch<React.SetStateAction<boolean>>] = React.useState<boolean>(false);
	const [currentPage, setCurrentPage]: [number, React.Dispatch<React.SetStateAction<number>>] = React.useState<number>(1);

	const store: MainContextData = {
		quotes, setQuotes,
		selectedAuthor, setSelectedAuthor,
		selectedAuthorContent, setSelectedAuthorContent,
		isLoading, setIsLoading,
		currentPage, setCurrentPage
	};

	return <MainContext.Provider
		value={store}
	>
		<Component {...pageProps} />
	</MainContext.Provider>
}

export default MyApp
