import React, { useContext, ReactChild } from 'react';
import { ExclamationCircle, Warn } from '@assets/svg';
import { ctxRcForm } from './Form';
import './style.scss';

interface IProp {
    children: React.ReactChild;
    name: string;
    label: string;
    required?: boolean;
    rules?: any;
    hidden?: boolean;
}

const FormItem: React.FC<IProp> = (props) => {
    const { children = null, name = 'name', label = 'label', required = false, rules = null, hidden = false } = props;
    const { form } = useContext(ctxRcForm);
    const { getFieldProps, getFieldError } = form;
    const errors = getFieldError(name) || [''];
    const feedback = {
        type: errors[0].split(':')[0],
        message: errors[0].split(':')[1]
    };
    const labelClassName = classnames({
        [`form-item-required`]: required
    });
    const itemClassName = classnames({
        'form-item': true,
        [`form-item-has-${feedback.type}`]: !!feedback.type
    });
    const itemControlMap = {
        Input: (child: ReactChild) => (
            <div className="form-item-control">
                <div className="form-item-control-input">
                    <div className="form-item-control-input-content">{child}</div>
                    {!!false && <span className="form-item-children-icon">{ExclamationCircle}</span>}
                </div>
                {feedback.type ? (
                    <div className={`form-item-${feedback.type}`}>
                        {Warn}
                        {feedback.message}
                    </div>
                ) : null}
            </div>
        ),
        Upload: (child: ReactChild) => (
            <div className="form-item-control">
                <div className="form-item-control-input">
                    <div className="form-item-control-input-content">{child}</div>
                </div>
                {feedback.type ? (
                    <div className={`form-item-${feedback.type}`}>
                        {Warn}
                        {feedback.message}
                    </div>
                ) : null}
            </div>
        ),
        DataPicker: (child: ReactChild) => (
            <div className="form-item-control">
                <div className="form-item-control-input">
                    <div className="form-item-control-input-content">{child}</div>
                </div>
                {feedback.type ? (
                    <div className={`form-item-${feedback.type}`}>
                        {Warn}
                        {feedback.message}
                    </div>
                ) : null}
            </div>
        )
    };
    const getValueFromEvent = (e) => {
        if (!e || !e.target) {
            return e;
        }
        const { target } = e;
        if (target.type === 'checkbox') {
            return target.checked;
        }
        if (target.type === 'file') {
            return target.files[0];
        }
        return target.value;
    };

    const enhanceChild = (child, elementType) => {
        const rcFormItemProps = getFieldProps(name, {
            ...child.props,
            rules,
            hidden,
            getValueFromEvent,
            initialValue: '',
            trigger: ['onChange', 'onBlur'],
            validateFirst: true,
            validateTrigger: ['onChange', 'onBlur']
        });
        let elementTypeProps = {};

        if (elementType === 'Upload') {
            elementTypeProps = {
                fileList: rcFormItemProps.value
            };
        }
        return React.cloneElement(child, {
            form,
            name,
            ...rcFormItemProps,
            ...elementTypeProps
        });
    };

    const eleChildren = React.Children.map(children, (child) => {
        const { elementType } = child.type;
        if (_.includes(['Input', 'Upload', 'DataPicker'], elementType)) {
            const newChild = enhanceChild(child, elementType);
            return itemControlMap[elementType](newChild);
        }
        return child;
    });
    return (
        <div className={itemClassName}>
            <div className="form-item-label">
                <label className={labelClassName}>{label}</label>
            </div>
            {eleChildren}
        </div>
    );
};

export default FormItem;
