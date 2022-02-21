import React from 'react';
import '@sass/pc/common.scss';
import PayForm from '@pages/pc/PayForm';
import Test from '@components/Text';
import './style.scss';

const Index: React.FC = () => {
    console.log('pc index');
    return (
        <div className="">
            {/* <Test test="pc111"></Test> */}
            <PayForm />
        </div>
    );
};

export default Index;
