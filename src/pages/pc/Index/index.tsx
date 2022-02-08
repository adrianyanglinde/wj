import React from 'react';
import '@sass/pc/common.scss';
import Test from '@components/Text';
import './style.scss';

const Index: React.FC = () => {
    console.log('pc index');
    return (
        <div className="index-pc">
            <Test test="pc111"></Test>
        </div>
    );
};

export default Index;
