import React, { useEffect, useState, useMemo } from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import { createForm } from 'rc-form';
import { ctxRcForm, IMSTATUS } from '@config/config';
import Input from '@components/Input';
import FormItem from './FormItem';
import './Form.scss';

function Form({ form, onSubmit, otype, collect_info, err_fields }) {
    const { STATUS, user_status } = useSelector(
        ({ IMReducer, IndexReducer }) => ({
            STATUS: IMReducer.STATUS,
            user_status: IndexReducer.user_status
        }),
        shallowEqual
    );
    const [formError, setFormError] = useState(null);
    const [placeholder, setPlaceholder] = useState('');
    const [disabled, setDisabled] = useState(false);
    const [editable] = useState(otype !== 'COLLECT_EDIT');
    const [btnLoading, setBtnLoading] = useState(false);
    const [btnDisable, setBtnDisable] = useState(true);
    const formClassName = classnames({
        'im-message-form': true,
        'im-message-form-no-editable': !editable,
        'im-message-form-editable': editable
    });
    const table = {
        mobile: {
            label: '游戏名称',
            maxLength: 30
        },
        account: {
            label: '账号',
            maxLength: 30
        },
        district_service: {
            label: '区服',
            maxLength: 30
        },
        role: {
            label: '角色名/id',
            maxLength: 100
        },
        contact: {
            label: '联系方式',
            maxLength: 30
        }
    };
    const keys = ['game_name', 'account', 'district_service', 'role', 'contact'];
    const descriptor = [{ required: true, validator: (rule, value) => _.trim(value) !== '', message: '不能为空哦~' }];

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
                await IM.IMServer.saveCollect(value);
                onSubmit();
            } catch (e) {
            } finally {
                setBtnLoading(false);
            }
        });
    };

    useEffect(() => {
        if (form && editable) {
            if (otype === 'COLLECT_ADD') {
                collect_info = {
                    game_name: window.Config.game.name || '',
                    account: user_status === 1 ? window.UniLogin.getUname() : ''
                };
            }
            form.setFieldsValue(_.omit(collect_info, 'collect_id', 'add_time', 'id', 'job_id', 'sess_id'));
        }
    }, [collect_info, editable, otype]);

    useEffect(() => {
        const docEl = document.documentElement;
        const isWap = !!(docEl.clientWidth <= 900);
        if (isWap) {
            setPlaceholder('请输入（必填）');
        }
    }, []);

    useEffect(() => {
        if (STATUS.status === IMSTATUS.ENDED) {
            setBtnDisable(true);
            setDisabled(true);
        }
    }, [STATUS.status]);

    const getValidateStatus = (key) =>
        useMemo(() => {
            if (disabled) {
                return '';
            }
            if (otype === 'COLLECT_REFUSE') {
                if (_.includes(err_fields, key)) return 'warning';
            }
            return '';
        }, [key, otype, err_fields, disabled]);

    const getDisabled = (key) =>
        useMemo(() => {
            if (disabled) {
                return true;
            }
            if (otype === 'COLLECT_REFUSE') {
                if (!_.includes(err_fields, key)) return true;
            }
            return disabled;
        }, [key, otype, err_fields, disabled]);

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
            <h6 className="im-message-form-title">{editable ? '填写表单' : '提交表单'}</h6>
            <div className="im-message-form-content">
                <ctxRcForm.Provider value={{ form }}>
                    {keys.map((key) => {
                        const { label, maxLength } = table[key];
                        return (
                            <FormItem
                                label={label}
                                rules={descriptor}
                                required
                                name={key}
                                validatestatus={getValidateStatus(key)}
                            >
                                {editable ? (
                                    <Input
                                        name={key}
                                        disabled={getDisabled(key)}
                                        maxLength={maxLength}
                                        placeholder={placeholder}
                                        onChange={handleChange}
                                        allowclear={otype !== 'COLLECT_REFUSE'}
                                        role="input"
                                    />
                                ) : (
                                    <div className="form-item-text" role="test">
                                        {collect_info[key]}
                                    </div>
                                )}
                            </FormItem>
                        );
                    })}
                    {formError && <div className="im-message-form-error">{formError}</div>}
                    {editable && btnSubmit()}
                </ctxRcForm.Provider>
            </div>
        </div>
    );
}

const RcForm = createForm()(Form);

export default RcForm;
