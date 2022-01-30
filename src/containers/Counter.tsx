import { useState } from 'react';
import { createContainer } from 'unstated-next';
import { get } from '@api/request';
import urls from '@api/urls';

function useCounter(initialState = 0) {
    const [count, setCount] = useState(initialState);
    const decrement = () => setCount(count - 1);
    const increment = () => setCount(count + 1);
    const getTest = () => get(urls.testApi);
    return { count, decrement, increment, getTest };
}

const CounterContainer = createContainer(useCounter);

export default CounterContainer;
