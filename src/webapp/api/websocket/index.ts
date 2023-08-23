import { Context, HttpRequest, HttpResponse } from "@azure/functions";
import { WebPubSubServiceClient } from '@azure/web-pubsub';

const connectionString = process.env.WPS_CONNECTION_STRING;
const hubName = process.env.WPS_HUB_NAME || 'transcriptions';
const serviceClient: WebPubSubServiceClient | null = connectionString ? new WebPubSubServiceClient(connectionString, hubName) : null;

export default async function (context: Context, req: HttpRequest): Promise<HttpResponse> {
    try {
        if (!serviceClient) {
            throw new Error('Missing environment variable WPS_CONNECTION_STRING');
        }

        // https://learn.microsoft.com/en-us/azure/azure-web-pubsub/concept-service-internals#authentication-workflow
        const token = await serviceClient.getClientAccessToken();

        return {
            body: JSON.stringify({
                url: token.url,
            }),
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
