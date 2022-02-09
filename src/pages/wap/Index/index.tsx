import React from 'react';
import Counter from '@components/Counter';
import CounterState from '@components/CounterState';
import './style.scss';

const Index: React.FC = () => {
    console.log('wap index');
    return (
        <div className="index-wap">
            哈5
            <Counter />
            <CounterState />
        </div>
    );
};

export default Index;
