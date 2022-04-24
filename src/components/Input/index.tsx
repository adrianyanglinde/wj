import React, { useState, useRef, useEffect } from 'react';
import { ClearIcon } from '@assets/svg';
import { ELEMENT_TYPE } from '@components/Form/FormItem';
import './style.scss';

interface IProp {
    onChange?: (e: React.ChangeEvent) => void;
    onBlur?: (e: React.FocusEvent) => void;
    allowclear?: boolean;
    form?: any;
    name?: string;
    status?: string;
    disabled?: boolean;
}
type IProps = IProp & Partial<HTMLInputElement>;

const Input: React.FC<IProps> = (props) => {
    const {
        onChange = () => {
            // do nothing.
        },
        onBlur = () => {
            // do nothing.
        },
        allowclear = false,
        disabled = false,
        name = '',
        status = ''
    } = props;
    const inputRef = useRef(null);
    const [clearVisible, setClearVisible] = useState(false);
    const [focused, setFocused] = useState(false);
    const handleChange = (e: React.ChangeEvent) => {
        onChange(e);
    };
    const handleFocus = () => {
        setFocused(true);
    };
    const handleBlur = (e: React.FocusEvent) => {
        setFocused(false);
        onBlur(e);
    };
    const className = classnames([
        'input',
        {
            'input-status-error': status === 'error',
            'input-status-warn': status === 'warn'
        }
    ]);
    const input = (
        <input
            {..._.pick(props, ['name', 'value', 'disabled', 'placeholder'])}
            className={className}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            autoComplete="off"
            type="text"
        />
    );
    // const className = classnames({
    //     'input-wrapper': true,
    //     'input-wrapper-disabled': disabled,
    //     'input-suffix-wrapper': true,
    //     'input-suffix-wrapper-focused': focused,
    //     'input-suffix-wrapper-clear': clearVisible
    // });
    // useEffect(() => {
    //     if (!disabled) {
    //         setClearVisible(!!value);
    //     }
    // }, [value, disabled]);
    // return (
    //     <div className={className}>
    //         {input}
    //         {allowclear && (
    //             <div className="input-suffix">
    //                 {clearVisible && (
    //                     <span className="input-clear-icon-hidden input-clear-icon" onClick={handleClear}>
    //                         {ClearIcon}
    //                     </span>
    //                 )}
    //             </div>
    //         )}
    //     </div>
    // );
    return input;
};

Input.elementType = ELEMENT_TYPE.INPUT;

export default Input;
