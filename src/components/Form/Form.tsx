import React, { useEffect, useImperativeHandle, forwardRef } from 'react';
import { createForm } from 'rc-form';
import { ctxRcForm } from './config';
import './style.scss';

interface IProp {
    children: any;
    form?: any;
    ref: any;
    formRef?: any;
}

const Form: React.FC<IProp> = (props) => {
    const { children, form, formRef } = props;
    useEffect(() => {
        console.log('inner', form);
    }, [form]);
    useImperativeHandle(
        formRef,
        () => ({
            form: form,
            test: 'test'
        }),
        [form]
    );
    return (
        <div>
            <ctxRcForm.Provider value={{ form }}>{children}</ctxRcForm.Provider>
        </div>
    );
};

const RcForm = createForm()(Form);

const FormWithRef = forwardRef((props, ref) => {
    return <RcForm formRef={ref} {...props} />;
});

export default FormWithRef;
