import React from "react"

export type MainContextData = {
    quotes: QuotesData | null,
    setQuotes: React.Dispatch<React.SetStateAction<QuotesData | null>>,
    selectedAuthor: string | null,
    setSelectedAuthor: React.Dispatch<React.SetStateAction<string | null>>,
    selectedAuthorContent: QuotesData | null,
    setSelectedAuthorContent: React.Dispatch<React.SetStateAction<QuotesData | null>>,
    isLoading: boolean,
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
    currentPage: number,
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>
}

export type Quote = {
    _id: string,
    text: string,
    genre: string,
    author: string
}

export type QuotesData = {
    pagination: QuotePagination,
    quotes: Array<Quote>
}

export type QuotePagination = {
    currentPage: number,
    nextPage: null | number,
    totalPages: number
}

export type ResponseData = {
    quote: Quote | null,
    error?: string
}