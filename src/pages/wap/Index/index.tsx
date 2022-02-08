import React from 'react';
import Counter from '@components/Counter';
import './style.scss';

const Index: React.FC = () => {
    console.log('wap index');
    return (
        <div className="index-wap">
            <Counter />
        </div>
    );
};

export default Index;
