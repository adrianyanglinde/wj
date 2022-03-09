import React, { useEffect } from 'react';
import './style.scss';

export const data = [
    {
        id: 1,
        area_code: '110000',
        level: 1,
        parent_id: -1,
        name: '北京市',
        city: [
            {
                id: 2,
                area_code: '110100',
                level: 2,
                parent_id: 1,
                name: '北京城区'
            }
        ]
    },
    {
        id: 19,
        area_code: '120000',
        level: 1,
        parent_id: -1,
        name: '天津市',
        city: [
            {
                id: 20,
                area_code: '120100',
                level: 2,
                parent_id: 19,
                name: '天津城区'
            }
        ]
    },
    {
        id: 37,
        area_code: '130000',
        level: 1,
        parent_id: -1,
        name: '河北省',
        city: [
            {
                id: 38,
                area_code: '130100',
                level: 2,
                parent_id: 37,
                name: '石家庄市'
            },
            {
                id: 61,
                area_code: '130200',
                level: 2,
                parent_id: 37,
                name: '唐山市'
            },
            {
                id: 76,
                area_code: '130300',
                level: 2,
                parent_id: 37,
                name: '秦皇岛市'
            }
        ]
    }
];

const Test: React.FC = () => {
    return <Input></Input>;
};

export default Test;
