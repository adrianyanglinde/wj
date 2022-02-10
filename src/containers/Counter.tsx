import { useState } from 'react';
import { createContainer } from 'unstated-next';
import { get } from '@api/request';
import urls from '@api/urls';

function useCounter(initialState = 0) {
    const [count, setCount] = useState(initialState);
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState({});
    const decrement = () => setCount(count - 1);
    const increment = () => setCount(count + 1);
    const getTest = async () => {
        try {
            setLoading(true);
            const data = await get(urls.testApi);
            setData(data?.d);
            console.log(data);
            setLoading(false);
        } catch (error) {
            console.log(error);
        }
    };
    return { count, decrement, increment, getTest, loading, data };
}

const CounterContainer = createContainer(useCounter);

export default CounterContainer;
