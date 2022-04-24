import React, { useContext, ReactChild, ReactNode } from 'react';
import { ExclamationCircle, WarnIcon, ErrorIcon } from '@assets/svg';
import { ctxRcForm } from './Form';
import './style.scss';

interface IProp {
    children: React.ReactChild;
    name: string;
    label: ReactNode;
    required?: boolean;
    rules?: any;
    hidden?: boolean;
    extra?: ReactNode;
}

export enum ELEMENT_TYPE {
    INPUT,
    UPLOAD,
    DARA_PICKER,

    CASCADER
}

const FormItem: React.FC<IProp> = (props) => {
    const {
        children = null,
        name = 'name',
        label = 'label',
        required = false,
        rules = null,
        hidden = false,
        extra = null
    } = props;
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
    const getFeedBack = () => {
        return feedback.type ? (
            <div className={`form-item-${feedback.type}`}>
                {feedback.type === 'warn' ? WarnIcon : ErrorIcon}
                {feedback.message}
            </div>
        ) : null;
    };
    const getItemControl = (child: ReactChild, elementType) => {
        switch (elementType) {
            case ELEMENT_TYPE.INPUT:
                return (
                    <div className="form-item-control">
                        <div className="form-item-control-input">
                            <div className="form-item-control-input-content">{child}</div>
                            {!!false && <span className="form-item-children-icon">{ExclamationCircle}</span>}
                        </div>
                        {getFeedBack()}
                    </div>
                );
            case ELEMENT_TYPE.UPLOAD:
            case ELEMENT_TYPE.DARA_PICKER:
            case ELEMENT_TYPE.CASCADER:
                return (
                    <div className="form-item-control">
                        <div className="form-item-control-input">
                            <div className="form-item-control-input-content">{child}</div>
                        </div>
                        {getFeedBack()}
                    </div>
                );
            default:
                break;
        }
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
            // have to write original onChange here if you need
            ...child.props,
            rules,
            hidden,
            getValueFromEvent,
            initialValue: '',
            trigger: elementType === ELEMENT_TYPE.DARA_PICKER ? 'onChange' : 'onBlur',
            validateFirst: true,
            // Upload 需要添加onBlur验证 能触发数据上报
            validateTrigger: elementType === ELEMENT_TYPE.DARA_PICKER ? ['onChange'] : ['onChange', 'onBlur']
        });
        const formProps = {
            form,
            name,
            status: feedback.type
        };
        return React.cloneElement(child, {
            ...formProps,
            ...rcFormItemProps
        });
    };

    const eleChildren = React.Children.map(children, (child) => {
        const { elementType } = child.type;
        if (elementType in ELEMENT_TYPE) {
            const newChild = enhanceChild(child, elementType);
            return getItemControl(newChild, elementType);
        }
        return child;
    });
    return (
        <div className={itemClassName}>
            <div className="form-item-label">
                <label className={labelClassName}>{label}</label>
            </div>
            {eleChildren}
            {extra}
        </div>
    );
};

export default FormItem;
