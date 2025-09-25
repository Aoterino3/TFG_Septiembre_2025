import { useEffect, useState } from 'react';
import { connection_status } from '../util/constants';
export const fetchData = async (url: string, question: string): Promise<any> => {
    
    return await
        fetch(url, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ user_prompt: question, sys_prompt: '' }),
        })
        .then(response => response.json())
        .then(async data => {
            let answer = data.answer;
            answer = answer.substring(answer.indexOf('{'), answer.lastIndexOf('}') + 1);
            return ({ status: connection_status.OK, data: JSON.parse(answer) })
        })
        .catch(error => {
            return { status: connection_status.KO, error: error };
        });
}

interface useFechResponseProps {
    data: any;
    loading: boolean;
    error: boolean;
}
export const useFetch = (url: string, question: string): useFechResponseProps => {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const controller = new AbortController();

    const getData = async () => {
        setLoading(false);
        try {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                signal: controller.signal,
                body: JSON.stringify({ user_prompt: question, sys_prompt: '' }),
            });
            const dataResponse = await response.json();
            if (!dataResponse) return;
            let answer = dataResponse.answer;
            answer = answer.substring(answer.indexOf('{'), answer.lastIndexOf('}') + 1);
            setData({ status: connection_status.OK, data: JSON.parse(answer) });
        }
        catch (error) {
            setError(true);
        }
        finally {
            setLoading(true);
        }
    };
    useEffect(() => {
        getData();
        return () => {
            controller.abort();
        };
    });

    return { data, loading, error };
}