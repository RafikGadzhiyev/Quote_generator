import axios, { AxiosResponse } from 'axios'
import React from 'react'
import { MainContext } from '../context/main.context'
import { MainContextData, ResponseData } from '../types/types'
import { NoneBorderButton } from "./StyledComponents"

export const GenerateButton: React.FC = () => {
    const store: MainContextData | null = React.useContext<MainContextData | null>(MainContext);
    let isLoad: React.MutableRefObject<boolean> = React.useRef<boolean>(false);


    const getRandomQuote: () => void = React.useCallback(async () => {
        if (store && !isLoad.current) {
            store.setSelectedAuthor((() => null));
            isLoad.current = true;
            store.setIsLoading(() => true);
            let result: AxiosResponse<ResponseData, any> = await axios.get('api/get_random_quote');
            store.setIsLoading(() => false);
            isLoad.current = false;
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
            }))
        }
    }, [store])

    React.useEffect(() => {
        getRandomQuote();
    }, []);


    return <NoneBorderButton
        onClick={() => getRandomQuote()}
    >
        <span>random</span>
        <i className="bi bi-arrow-repeat"></i>
    </NoneBorderButton>

}