import React, { useEffect } from 'react';
import { useParams, useRouteMatch, Switch, Route } from 'react-router-dom';
import './style.scss';

const InfoLayout: React.FC = ({ children }) => {
    const params = useParams();
    const match = useRouteMatch();
    console.log('InfoLayout params', params);
    console.log('InfoLayout match', match);
    const getCls = (info) => {
        return classnames({
            active: info === params.info
        });
    };
    return (
        <div className="info-layout">
            <ul>
                <li className={getCls('base')}>基础信息</li>
                <li className={getCls('indentity')}>身份信息</li>
                <li className={getCls('bank')}>退款账号信息</li>
            </ul>
            {children}
        </div>
    );
};

export default InfoLayout;
