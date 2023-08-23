import { Context, HttpRequest, HttpResponse } from "@azure/functions";
import { getBoundary, parse } from 'parse-multipart-data';

const {FILE_UPLOADING_URL, FILE_UPLOADING_FORMAT} = process.env;

// Data formats
const binary = 'binary';
const form = 'form';
const supportedUploadFormats = [binary, form];

const fileUploadingUrl = FILE_UPLOADING_URL;
let fileUploadingFormat = FILE_UPLOADING_FORMAT;

if (!supportedUploadFormats.includes(fileUploadingFormat)) {
    fileUploadingFormat = form;
}

export default async function (context: Context, req: HttpRequest): Promise<HttpResponse> {
    try {
        if (!fileUploadingUrl) {
            throw new Error('Missing environment variable FILE_UPLOADING_URL');
        }

        const originalContentType = req.headers['content-type'];
        let contentType = originalContentType;
        let body = req.bufferBody;

        if (fileUploadingFormat === binary && originalContentType.includes('form-data')) {
            const boundary = getBoundary(originalContentType);
            const [file] = parse(req.bufferBody, boundary);

            body = file.data;
            contentType = file.type;
        }

        const response = await fetch(fileUploadingUrl, {
            method: 'POST',
            body,
            headers: {
                'Content-Type': contentType,
            },
        });

        return {
            status: response.status,
            body: await response.text(),
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
