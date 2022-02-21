import React, { useEffect, useState, useMemo } from 'react';
import { createForm } from 'rc-form';
import { ctxRcForm } from '@components/Form/config';
import Input from '@components/Input';
import FormItem from '@components/Form/FormItem';
interface IProp {
    form: any;
}

const PayForm: React.FC<IProp> = ({ form }) => {
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

    const submit = () => {
        form.validateFields(async (error, value) => {
            if (error) {
                const errors = _.reduce(
                    form.getFieldsError(),
                    (result, val) => {
                        if (val) {
                            return result.concat(val);
                        }
                        return result;
                    },
                    []
                );
                setFormError(errors[0]);
                return;
            }
            setBtnLoading(true);
            try {
                //await IM.IMServer.saveCollect(value);
                console.log('submit', value);
            } catch (e) {
            } finally {
                setBtnLoading(false);
            }
        });
    };

    // useEffect(() => {
    //     if (form && editable) {
    //         collect_info = {
    //             game: window.Config.game.name || '',
    //             account: user_status === 1 ? window.UniLogin.getUname() : ''
    //         };
    //         form.setFieldsValue(_.omit(collect_info, 'collect_id', 'add_time', 'id', 'job_id', 'sess_id'));
    //     }
    // }, [collect_info, editable]);

    // useEffect(() => {
    //     if (STATUS.status === IMSTATUS.ENDED) {
    //         setBtnDisable(true);
    //         setDisabled(true);
    //     }
    // }, [STATUS.status]);

    // const getValidateStatus = (key) =>
    //     useMemo(() => {
    //         if (disabled) {
    //             return '';
    //         }
    //         if (otype === 'COLLECT_REFUSE') {
    //             if (_.includes(err_fields, key)) return 'warning';
    //         }
    //         return '';
    //     }, [key, otype, err_fields, disabled]);

    // const getDisabled = (key) =>
    //     useMemo(() => {
    //         if (disabled) {
    //             return true;
    //         }
    //         if (otype === 'COLLECT_REFUSE') {
    //             if (!_.includes(err_fields, key)) return true;
    //         }
    //         return disabled;
    //     }, [key, otype, err_fields, disabled]);

    const btnSubmit = () => {
        if (btnLoading) {
            return <button disabled>提交中...</button>;
        }
        if (btnDisable) {
            return <button disabled>提交</button>;
        }
        return <button onClick={submit}>提交</button>;
    };

    return (
        <div className={formClassName}>
            <ctxRcForm.Provider value={{ form }}>
                {config.map((item) => {
                    const { key, label, maxLength, allowclear, required, rules, placeholder } = item;
                    return (
                        <FormItem
                            key={key}
                            label={label}
                            rules={rules}
                            required={required}
                            name={key}
                            validatestatus={''}
                        >
                            <Input
                                name={key}
                                disabled={disabled}
                                maxLength={maxLength}
                                placeholder={placeholder}
                                onChange={handleChange}
                                allowclear={allowclear}
                            />
                        </FormItem>
                    );
                })}
                {btnSubmit()}
            </ctxRcForm.Provider>
        </div>
    );
};

const RcForm = createForm()(PayForm);

export default RcForm;
