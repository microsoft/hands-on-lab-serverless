import {useEffect, useState} from 'react';

export default function useFetch<ResponseDataType>(url: string, method?: 'GET' | 'POST', body?: object | undefined) {
    const [controller] = useState(new AbortController());
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState<ResponseDataType | undefined>();
    const [error, setError] = useState<any>();

    useEffect(() => {  
        (async () => {
            try {
                const options = {
                    signal: controller.signal,
                    method: method || 'GET',
                    body: body && !(body instanceof File) ? JSON.stringify(body) : body,
                };

                const response = await fetch(url, options);
                const responseData: ResponseDataType = await response.json();
                setData(responseData);
            } catch (requestError: any) {
                setError(requestError);
            } finally {
                setLoading(false);
            }
        })();
  
        return () => controller.abort();
    }, [url, method, body, controller]);

    return [data, loading, error, controller];
}