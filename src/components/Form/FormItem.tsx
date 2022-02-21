import React, { useContext, ReactChild } from 'react';
import { ExclamationCircle } from '@assets/svg';
import { ctxRcForm } from './config';
import './style.scss';

interface IProp {
    children: React.ReactChild;
    name: string;
    label: string;
    required?: boolean;
    rules?: any;
    validatestatus?: string;
}

const FormItem: React.FC<IProp> = (props) => {
    const { children, name, label, required, rules, validatestatus } = props;
    const { form } = useContext(ctxRcForm);
    const { getFieldProps, getFieldError } = form;
    const errors = getFieldError(name);
    const labelClassName = classnames({
        [`form-item-required`]: required
    });
    const itemClassName = classnames({
        'form-item': true,
        [`form-item-has-feedback`]: !!validatestatus,
        [`form-item-has-warning`]: validatestatus === 'warning'
    });
    const swiper = {
        Input: (child: ReactChild) => (
            <div className="form-item-control">
                <div className="form-item-control-input">
                    <div className="form-item-control-input-content">{child}</div>
                    {!!validatestatus && <span className="form-item-children-icon">{ExclamationCircle}</span>}
                </div>
                {errors ? <div className="form-item-error">{errors.join(',')}</div> : null}
            </div>
        )
    };
    const eleChildren = React.Children.map(children, (child) => {
        if (child.type.name === 'Input') {
            const newChild = React.cloneElement(child, {
                form,
                validatestatus,
                ...getFieldProps(name, { rules, onChange: child.props.onChange, initialValue: '' })
            });
            return swiper['Input'](newChild);
        }
        return child;
    });

    return (
        <div className={itemClassName}>
            <div className="form-item-label">
                <label className={labelClassName} title={label}>
                    {label}
                </label>
            </div>
            {eleChildren}
        </div>
    );
};

export default FormItem;
