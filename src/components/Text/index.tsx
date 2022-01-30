import React, { useEffect } from 'react';
import './style.scss';
interface IProps {
    test?: string;
}

const Test: React.FC<IProps> = ({ test = _.padStart('Hello TypeScript!', 20, ' ') }) => {
    return <div className="test">{test}</div>;
};

export default Test;
