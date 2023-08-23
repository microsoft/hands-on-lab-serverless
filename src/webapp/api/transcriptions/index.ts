import { URL } from 'node:url';
import { Context, HttpRequest, HttpResponse } from "@azure/functions";

const transcriptionFetchingUrl = process.env.TRANSCRIPTION_FETCHING_URL;
const pageSize = +process.env.TRANSCRIPTIONS_PAGE_SIZE || 50;

export default async function (context: Context, req: HttpRequest): Promise<HttpResponse> {
    try {
        if (!transcriptionFetchingUrl) {
            throw new Error('Missing environment variable TRANSCRIPTION_FETCHING_URL');
        }

        const url = new URL(transcriptionFetchingUrl);

        // Pagination
        let page = +req.query.page || 1;
        url.searchParams.set('offset', String((page - 1) * pageSize));
        url.searchParams.set('limit', String(pageSize));

        const response = await fetch(url);
        const transcriptions = await response.json();

        return {
            status: response.status,
            body: JSON.stringify(transcriptions),
        };
    } catch (error) {
        return {
            status: 500,
            body: JSON.stringify({
                error: error.message,
            }),
        };
    }
};
