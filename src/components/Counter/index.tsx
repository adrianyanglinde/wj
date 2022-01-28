import React from 'react';
import CounterContainer from '@containers/Counter';
import './style.scss';

const Counter: React.FC = () => {
    const counter = CounterContainer.useContainer();
    return (
        <div>
            <button className="button-dec" onClick={counter.decrement}>
                -
            </button>
            <span>{counter.count}</span>
            <button className="button-inc" onClick={counter.increment}>
                +
            </button>
        </div>
    );
};

export default Counter;
