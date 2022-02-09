import React, { useEffect, useState } from 'react';
import './style.scss';

const Counter: React.FC = () => {
    const [count, setCount] = useState(7);
    const decrement = () => {
        const newCount = count - 1;
        setCount(newCount);
    };
    const increment = () => {
        const newCount = count + 1;
        setCount(newCount);
    };
    return (
        <div>
            <button className="button-dec" onClick={decrement}>
                -
            </button>
            <span>{count}</span>
            <button className="button-inc" onClick={increment}>
                +
            </button>
        </div>
    );
};

export default Counter;
