import React, { useEffect, useState, useMemo, useRef } from 'react';
import Input from '@components/Input';
import FormItem from '@components/Form/FormItem';
import Form, { useForm } from '@components/Form/Form';

const PayForm: React.FC = () => {
    const [formError, setFormError] = useState(null);
    const [disabled, setDisabled] = useState(false);
    const [editable] = useState(true);
    const [btnLoading, setBtnLoading] = useState(false);
    const [btnDisable, setBtnDisable] = useState(true);
    const formClassName = classnames({
        'pay-form': true
    });
    const descriptor = [
        { required: true, validator: (rule, value: string) => _.trim(value) !== '', message: '不能为空哦~' }
    ];
    const commonConfig = {
        required: true,
        allowclear: true
    };
    const config = [
        {
            ...commonConfig,
            key: 'game',
            label: '游戏名称',
            placeholder: '请输入游戏名称',
            maxLength: 30,
            rules: [...descriptor]
        },
        {
            ...commonConfig,
            key: 'account',
            label: '账号',
            placeholder: '请输入账号',
            maxLength: 30,
            rules: [...descriptor]
        },
        {
            ...commonConfig,
            key: 'contact',
            label: '联系方式',
            placeholder: '请输入联系方式',
            maxLength: 30,
            rules: [...descriptor]
        }
    ];

    const handleChange = () => {
        if (btnDisable) {
            setBtnDisable(false);
        }
    };

    const formRef = useRef();

    const submit = () => {
        formRef?.current.form;
    };

    const btnSubmit = () => {
        if (btnLoading) {
            return <button disabled>提交中...</button>;
        }
        if (btnDisable) {
            return <button disabled>提交</button>;
        }
        return <button onClick={submit}>提交</button>;
    };

    // const getForm = (form) => {
    //     console.log('outer', form);
    // };

    useEffect(() => {
        console.log('outer', formRef?.current.form);
    }, [formRef]);

    return (
        <div className={formClassName}>
            <Form ref={formRef}>
                {config.map(({ key, label, maxLength, allowclear, required, rules, placeholder }) => (
                    <FormItem key={key} label={label} rules={rules} required={required} name={key} validatestatus={''}>
                        <Input
                            name={key}
                            disabled={disabled}
                            maxLength={maxLength}
                            placeholder={placeholder}
                            onChange={handleChange}
                            allowclear={allowclear}
                        />
                    </FormItem>
                ))}
                {btnSubmit()}
            </Form>
        </div>
    );
};

export default PayForm;
