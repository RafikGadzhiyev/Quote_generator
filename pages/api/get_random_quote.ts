import axios, { AxiosResponse } from 'axios'
import type { NextApiRequest, NextApiResponse } from 'next';
import { Quote } from '../../assets/types/types';
import type { ResponseData } from '../../assets/types/types';

export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
    try {
        let result: AxiosResponse<any, any> = await axios.get('quotes/random', {
            baseURL: process.env.BASE_URL
        }),
            quoteFromResponseData: Quote | null = null;

        if (result.status === 200 && result.data !== null) {
            quoteFromResponseData = {
                _id: result.data.data[0]._id,
                text: result.data.data[0].quoteText,
                genre: result.data.data[0].quoteGenre,
                author: result.data.data[0].quoteAuthor
            }
        }

        res.status(200).json({
            quote: quoteFromResponseData
        })
    } catch (e: any) {
        res.status(404).json({
            quote: null,
            error: e.message
        })
    }
}