import type { NextApiRequest, NextApiResponse } from 'next';
import axios, { AxiosResponse } from 'axios'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const { author } = req.body
        let result: AxiosResponse<any, any> = await axios.get(`quotes?author=${encodeURI(author)}`, {
            baseURL: process.env.BASE_URL
        })

        res.status(200).json(result.data);
    } catch (e: any) {
        res.status(400).json({
            error: e.message
        })
    }
}