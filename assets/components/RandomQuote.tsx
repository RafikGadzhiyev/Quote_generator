import React from 'react';
import { MainContext } from '../context/main.context';
import { MainContextData, Quote as Q, QuotePagination } from '../types/types';
import { GoToAuthorQuotesButton, Quote, QuoteAuthor, QuoteAuthorContainer, QuoteContainer, QuoteDataContainer, QuoteType } from "./StyledComponents"
import axios, { AxiosResponse } from 'axios';


interface IRandomQuoteProps {
    givenQuote: Q,
    isQuoteRandom: boolean,
    delayIndex: number
}

export const RandomQuote: React.FC<IRandomQuoteProps> = (props) => {
    const store: MainContextData | null = React.useContext<null | MainContextData>(MainContext);

    const getAllAuthorQuotes: (author: string) => void = React.useCallback(async (author: string) => {
        if (store) {
            store.setSelectedAuthor(() => author);
            store.setIsLoading(() => true);
            let result: AxiosResponse<any, any> = await axios.post('api/get_quote_by_author', JSON.stringify({
                author: author
            }), {
                headers: {
                    "Content-Type": "application/json"
                }
            });
            const authorData: { pagination: QuotePagination, quotes: Array<Q> } = {
                pagination: {
                    currentPage: result.data.pagination.currentPage,
                    totalPages: result.data.pagination.totalPages,
                    nextPage: result.data.pagination.nextPage
                },
                quotes: []
            };
            for (let quote of result.data.data) {
                authorData.quotes.push({
                    _id: quote._id,
                    text: quote.quoteText,
                    author: quote.quoteAuthor,
                    genre: quote.quoteGenre
                })
            }

            store.setQuotes(() => authorData);
            store.setIsLoading(() => false);
        }

    }, [store])

    return (
        <QuoteContainer

        >
            {
                store &&
                !store.isLoading &&
                <>
                    <Quote
                        initial={{
                            opacity: 0,
                            y: -30
                        }}
                        animate={{
                            opacity: 1,
                            y: 0
                        }}
                        exit={{
                            background: 'red'
                        }}
                        transition={{
                            delay: .25 * props.delayIndex
                        }}
                    >
                        <q cite={props.givenQuote.author + ''}>
                            {
                                props.givenQuote.text
                            }
                        </q>
                    </Quote>
                    {
                        props.isQuoteRandom
                        &&
                        <QuoteAuthorContainer
                            initial={{
                                opacity: 0,
                                y: 40
                            }}
                            animate={{
                                opacity: 1,
                                y: 0
                            }}
                        >
                            <GoToAuthorQuotesButton
                                onClick={() => getAllAuthorQuotes(props.givenQuote.author)}
                            >
                                <QuoteDataContainer>
                                    <QuoteAuthor>
                                        {
                                            props.givenQuote.author
                                        }
                                    </QuoteAuthor>
                                    <QuoteType>
                                        {
                                            props.givenQuote.genre
                                        }
                                    </QuoteType>
                                </QuoteDataContainer>
                                <i className="bi bi-arrow-right gc-r"></i>
                            </GoToAuthorQuotesButton>
                        </QuoteAuthorContainer>
                    }
                </>

            }
        </QuoteContainer>
    )
}   