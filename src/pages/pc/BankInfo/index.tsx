import React, { useEffect, useState, useRef } from 'react';
import Cascader from '@components/Cascader';
import FormItem from '@components/Form/FormItem';
import Form from '@components/Form/Form';
import { strategies } from '@utils/validator';
import urls from '@api/urls';

const data = {
    bank: {
        value: ['zj', 'hangzhou', 'yuhang'],
        errors: ['warn:归属地填写有误']
    }
};

const options = [
    {
        label: '福建',
        value: 'fj',
        children: [
            {
                label: '福州',
                value: 'fuzhou',
                children: [
                    {
                        label: '马尾',
                        value: 'mawei'
                    }
                ]
            },
            {
                label: '泉州',
                value: 'quanzhou'
            }
        ]
    },
    {
        label: '浙江',
        value: 'zj',
        children: [
            {
                label: '杭州',
                value: 'hangzhou',
                children: [
                    {
                        label: '余杭',
                        value: 'yuhang'
                    }
                ]
            }
        ]
    },
    {
        label: '北京',
        value: 'bj',
        children: [
            {
                label: '朝阳区',
                value: 'chaoyang'
            },
            {
                label: '海淀区',
                value: 'haidian'
            }
        ]
    }
];

const BankInfo: React.FC = () => {
    const [disabled, setDisabled] = useState(false);
    const formRef = useRef();
    const getDescript = (startegy: string, message: string, threshold?: any) => ({
        validator: (rule, value: string & File) => (strategies[startegy](value, message, threshold) ? false : true),
        message: `error:${message}`
    });

    const submit = () => {
        const form = formRef?.current.form;
        form.validateFields((error, value) => {
            if (error) {
                console.log('error validateFields', error);
            } else {
                console.log('subimit value', value);
            }
        });
    };

    useEffect(() => {
        formRef?.current.form.setFields(data);
    }, [formRef]);

    return (
        <div className="bankInfo-form">
            <Form ref={formRef}>
                <FormItem name="bank" label="银行归属地" rules={[getDescript('isEmpty', '请选择银行归属地')]}>
                    <Cascader placeholder="请选择银行归属地" options={options}></Cascader>
                </FormItem>
                <button onClick={submit}>提交</button>
            </Form>
        </div>
    );
};

export default BankInfo;
