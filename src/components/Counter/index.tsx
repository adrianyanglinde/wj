import React from 'react';
import CounterContainer from '@containers/Counter';
import './style.scss';
import engine from '@server/rule-engine';

const Counter: React.FC = () => {
    const counter = CounterContainer.useContainer();
    if (process.env.MOCK) {
        console.log('mock');
    } else {
        console.log('nomock');
    }
    /**
     * Define facts the engine will use to evaluate the conditions above.
     * Facts may also be loaded asynchronously at runtime; see the advanced example below
     */
    const facts = {
        personalFoulCount: 6,
        gameDuration: counter.count
    };

    // Run the engine to evaluate
    engine.run(facts).then(({ events }) => {
        events.map((event) => console.log(event.params.message));
    });

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
