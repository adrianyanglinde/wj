import React from 'react';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';

const Process: React.FC = () => {
    return (
        <div>
            <Link to="/process/base/111">111</Link>
            <Link to="/process/bank/222">222</Link>
        </div>
    );
};

export default Process;
