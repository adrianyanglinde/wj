import React, { useContext } from 'react';
import { ctxRcForm } from '@config/config';

function FormItem({ children, name, label, required, rules, validatestatus }) {
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
    const icon = (
        <span className="form-item-children-icon">
            <span
                role="img"
                aria-label="exclamation-circle"
                className="anticon anticon-exclamation-circle"
            >
                <svg
                    viewBox="64 64 896 896"
                    focusable="false"
                    data-icon="exclamation-circle"
                    width="1em"
                    height="1em"
                    fill="currentColor"
                    aria-hidden="true"
                >
                    <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm-32 232c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v272c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V296zm32 440a48.01 48.01 0 010-96 48.01 48.01 0 010 96z" />
                </svg>
            </span>
        </span>
    );

    const formItemWithInput = (child) => (
        <div className="form-item-control">
            <div className="form-item-control-input">
                <div className="form-item-control-input-content">{child}</div>
                {!!validatestatus && icon}
            </div>
            {errors ? <div className="form-item-error">{errors.join(',')}</div> : null}
        </div>
    );
    const eleChildren = React.Children.map(children, (child) => {
        if (child.props.role === 'input') {
            const newChild = React.cloneElement(child, {
                form,
                validatestatus,
                ...getFieldProps(name, { rules, onChange: child.props.onChange })
            });
            return formItemWithInput(newChild);
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
}

export default FormItem;
