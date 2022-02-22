import React, { useEffect, useImperativeHandle, forwardRef, useState } from 'react';
import { createForm } from 'rc-form';
import { ctxRcForm } from './config';
import './style.scss';

interface IProp {
    children: any;
    ref: any;
}

const InnerForm: React.FC<any> = (props) => {
    const { children, getForm, form } = props;
    useEffect(() => {
        console.log('inner', form);
        getForm(form);
    }, [form]);
    return (
        <div>
            <ctxRcForm.Provider value={{ form }}>{children}</ctxRcForm.Provider>
        </div>
    );
};

const RcForm = createForm()(InnerForm);

const Form: React.FC<IProp> = (props, ref) => {
    let formRef = null;
    const getForm = (form) => {
        console.log('111');
        formRef = form;
    };
    useImperativeHandle(
        ref,
        () => ({
            form: formRef,
            test: 'test'
        }),
        [formRef]
    );
    return <RcForm getForm={getForm} {...props} />;
};

const FormWithRef = forwardRef(Form);

export default FormWithRef;
