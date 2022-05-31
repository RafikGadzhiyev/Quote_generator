import React, { useCallback } from 'react';
import axios, { AxiosResponse } from 'axios';
import type { NextPage } from 'next';
import Head from 'next/head'
import { GenerateButton } from '../assets/components/GenerateButton'
import { MainContextData, Quote, ResponseData } from '../assets/types/types';
import { MainContext } from '../assets/context/main.context';
import { RandomQuote } from '../assets/components/RandomQuote';
import { MainContentContainer, QuotesList } from '../assets/components/StyledComponents';
import { v4 as uuidv4 } from 'uuid'
import { CircularProgress } from '@mui/material';
import Pagination from '@mui/material/Pagination';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack'
import Grid from "@mui/material/Grid"


const Home: NextPage = () => {
	const store: MainContextData | null = React.useContext<MainContextData | null>(MainContext);
	let total: React.MutableRefObject<number> = React.useRef<number>(1);

	React.useEffect(() => {
		if (store && !store.quotes && total.current === 1) {
			store.setIsLoading(() => true);
			total.current--;
			axios.get('api/get_random_quote')
				.then((result: AxiosResponse<ResponseData, any>) => {
					if (result.statusText === 'OK') {
						store.setQuotes(() => ({
							pagination: {
								currentPage: 0,
								nextPage: 0,
								totalPages: 0
							},
							quotes: [{
								author: result.data.quote?.author + '',
								_id: result.data.quote?._id + '',
								text: result.data.quote?.text + '',
								genre: result.data.quote?.genre + ''
							}]
						}));
						store.setIsLoading(() => false);
					}
				})
		}
	}, [store])

	const getAnotherPage = React.useCallback(async (page: number) => {
		if (store) {
			store.setIsLoading(() => true);
			const result: AxiosResponse<any, any> = await axios.post('api/get_quote_by_page', JSON.stringify({
				author: store.selectedAuthor,
				page
			}), {
				headers: {
					"Content-Type": "application/json"
				}
			})

			const quotes: Array<Quote> = [];
			for (let quote of result.data.data) {
				quotes.push({
					_id: quote._id,
					text: quote.quoteText,
					author: quote.quoteAuthor,
					genre: quote.quoteGenre
				})
			}
			store.setQuotes(() => ({
				pagination: {
					currentPage: result.data.pagination.currentPage,
					nextPage: result.data.pagination.nextPage,
					totalPages: result.data.pagination.totalPages
				},
				quotes
			}))
			store.setIsLoading(() => false);
		}
	}, [store])

	const PaginationChangeHandler = useCallback((_: React.ChangeEvent<unknown>, page: number) => {
		if (store) {
			store.setCurrentPage(() => page);
			getAnotherPage(page);
			window.scrollTo(0, 0);
		}
	}, [store, getAnotherPage])

	return (
		<MainContentContainer >
			<Head>
				<title>Quote generator</title>
				<meta name='description' content='This is random quote generator' />
			</Head>
			<GenerateButton />
			{
				store && store.selectedAuthor &&
				<h1 style={{ marginBlock: '1rem' }}>{store.selectedAuthor}</h1>
			}
			{
				store && store.isLoading &&
				<Stack

					sx={{
						position: 'absolute',
						width: store.selectedAuthor ? "45%" : '35%',
						top: store.selectedAuthor ? '' : "47%",
						left: store.selectedAuthor ? '' : "50%",
						transform: store.selectedAuthor ? '' : 'translate(-50%, -50%)'
					}}
				>
					{
						!store.selectedAuthor &&
						<>
							<Skeleton animation={'wave'} variant={'text'} />
							<Skeleton animation={'wave'} variant={'text'} />
							<Skeleton animation={'wave'} variant={'text'} />
						</>
					}
					{
						store.selectedAuthor &&
						<ul
							style={{
								listStyle: 'none',
							}}
						>
							{
								Array(10).fill(1).map(() => <li style={{ marginBlock: '1rem' }} key={uuidv4()}>
									<Skeleton animation={'wave'} variant={'text'} />
									<Skeleton animation={'wave'} variant={'text'} />
									<Skeleton animation={'wave'} variant={'text'} />
								</li>)
							}
						</ul>
					}
					{
						!store.selectedAuthor
						&&
						<Grid
							container
							sx={{
								marginTop: '4rem'
							}}
							columnSpacing={2}
						>
							<Grid
								item
								xs={11}
							>
								<Skeleton
									animation={'wave'}
									variant={"text"}
									sx={{
										width: '50%'
									}}
								/>
							</Grid>
							<Grid
								item
								xs={1}
							>
								<Skeleton animation={'wave'} variant={'rectangular'} />
							</Grid>
							<Grid
								item
								xs={3}
							>
								<Skeleton animation={'wave'} variant={"text"} />
							</Grid>
						</Grid>
					}

				</Stack>
			}
			{
				<QuotesList>
					{
						store && !store.isLoading && store.quotes && store.quotes.quotes.length && store.selectedAuthor &&
						!store.isLoading &&
						<>
							{store.quotes.quotes.map((e: Quote, i: number) => <li
								key={uuidv4()}
							>
								<RandomQuote
									isQuoteRandom={false}
									givenQuote={e}
									delayIndex={i}
								/>
							</li>)
							}

							{
								store.quotes.pagination.totalPages > 1 &&
								<Pagination
									count={store.quotes.pagination.totalPages}
									variant={"text"}
									shape={'rounded'}
									sx={{
										margin: '0 auto'
									}}
									page={store.currentPage}
									onChange={(e: React.ChangeEvent<unknown>, value: number) => value !== store.currentPage ? PaginationChangeHandler(e, value) : value}
								/>
							}
						</>
					}
					{
						store && !store.isLoading && store.quotes && !store.selectedAuthor && store.quotes.quotes.length === 1 &&
						<RandomQuote
							delayIndex={0}
							givenQuote={store.quotes.quotes[0]}
							isQuoteRandom={true}
						/>
					}
				</QuotesList>
			}
		</MainContentContainer >
	)
}

export default Home
