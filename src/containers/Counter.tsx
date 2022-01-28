import { useState } from 'react';
import { createContainer } from 'unstated-next';

function useCounter(initialState = 0) {
    const [count, setCount] = useState(initialState);
    const decrement = () => setCount(count - 1);
    const increment = () => setCount(count + 1);
    return { count, decrement, increment };
}

const CounterContainer = createContainer(useCounter);

export default CounterContainer;
