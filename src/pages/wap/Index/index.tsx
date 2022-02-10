import React from 'react';
import CounterContainer from '@containers/Counter';
import Counter from '@components/Counter';
import './style.scss';

const Index: React.FC = () => {
    console.log('wap index');
    return (
        <CounterContainer.Provider>
            <div className="index-wap">
                哈2
                <Counter />
            </div>
        </CounterContainer.Provider>
    );
};

export default Index;
