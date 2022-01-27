import React from 'react';
import './style.scss';
interface IProp {
    test?: string;
}

const Test: React.FC<IProp> = ({ test = '111dfsdfsd ] sd fsad test' }) => {
    return <div className="test">{test}</div>;
};

export default Test;
