import React, { useEffect, useImperativeHandle, forwardRef } from 'react';
import { createForm } from 'rc-form';
import './style.scss';

export enum LAYOUT {
    HORIZONTAL = 'horizontal',
    VERTICAL = 'vertical'
}
interface IProp {
    children: any;
    form?: any;
    ref: any;
    formRef?: any;
    layout?: LAYOUT.HORIZONTAL | LAYOUT.VERTICAL;
}
export const ctxRcForm = React.createContext(null);

const Form: React.FC<IProp> = (props) => {
    const { children, form, formRef, layout = LAYOUT.HORIZONTAL } = props;
    const formClassName = classnames(['form', `form-${layout}`]);
    useImperativeHandle(
        formRef,
        () => ({
            form: form,
            test: 'test'
        }),
        [form]
    );
    return (
        <ctxRcForm.Provider value={{ form }}>
            <div className={formClassName}>{children}</div>
        </ctxRcForm.Provider>
    );
};

const RcForm = createForm()(Form);

const FormWithRef = forwardRef((props, ref) => {
    return <RcForm formRef={ref} {...props} />;
});

export default FormWithRef;
