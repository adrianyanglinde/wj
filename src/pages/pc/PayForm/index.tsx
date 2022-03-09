import React, { useEffect, useState, useMemo, useRef } from 'react';
import moment from 'moment';
import { produce } from 'immer';
import Input from '@components/Input';
import Upload, { FileItem } from '@components/Upload';
import DataPicker from '@components/DataPicker';
import FormItem from '@components/Form/FormItem';
import Form, { LAYOUT } from '@components/Form/Form';
import { strategies } from '@utils/validator';

let data = {
    game: { value: 'game1', errors: ['warn:game error'] },
    start_date: { value: moment(), errors: ['warn:start_date error'] },
    idcard: {
        value: 'https://fs.img4399.com/kf/2022/02/28/18_2682ae082bdf.jpg',
        errors: ['warn:idcard error']
    },
    pay: {
        value: [
            {
                uid: '-1',
                name: 'xxx.pdf',
                status: 'done'
            },
            {
                uid: '-2',
                name: 'yyy.png',
                status: 'error'
            }
        ],
        errors: ['warn:idcard error']
    }
};

const PayForm: React.FC = () => {
    const [tab, setTab] = useState(1);
    const [disabled, setDisabled] = useState(false);
    const formRef = useRef();
    const getDescript = (startegy: string, message: string, threshold?: any) => ({
        validator: (rule, value: string & File) => (strategies[startegy](value, message, threshold) ? false : true),
        message: `error:${message}`
    });
    const inputEmptyDescriptor = getDescript('isEmpty', '不能为空～');

    const handleChange = (e) => {
        console.log('input otter onChange', e.target);
    };

    const handleRemove = (file: FileItem) => {
        formRef?.current.form.setFields(
            produce(data, (draft) => {
                _.remove(draft['pay'].value, (item) => item.uid === file.uid);
            })
        );
    };

    const submit = () => {
        const form = formRef?.current.form;
        form.validateFields((error, value) => {
            if (error) {
                console.log('error validateFields', error);
            } else {
                console.log(value);
            }
        });
    };

    useEffect(() => {
        formRef?.current.form.setFields(data);
    }, [formRef]);

    return (
        <div className="pay-form">
            <button
                onClick={() => {
                    setTab(1);
                }}
            >
                tab11111
            </button>
            <button
                onClick={() => {
                    setTab(2);
                }}
            >
                tab2
            </button>
            <Form ref={formRef} layout={LAYOUT.VERTICAL}>
                <div style={{ display: tab === 1 ? 'block' : 'none' }}>
                    <FormItem name="game" label="游戏名称" rules={[inputEmptyDescriptor]} hidden={tab !== 1}>
                        <Input disabled={disabled} placeholder="请输入游戏名称" onChange={handleChange} />
                    </FormItem>
                    <FormItem
                        name="contact"
                        label="联系方式"
                        rules={[inputEmptyDescriptor, getDescript('isMoblie', '请填写正确的联系方式～')]}
                        hidden={tab !== 1}
                    >
                        <Input disabled={disabled} placeholder="请输入联系方式" onChange={handleChange} />
                    </FormItem>
                    <FormItem
                        name="idcard"
                        label="身份证"
                        rules={[
                            inputEmptyDescriptor,
                            getDescript('minFileSize', '图片大小不能超过4M哦'),
                            getDescript('imageType', '上传图片格式错误，请重新上传')
                        ]}
                        hidden={tab !== 1}
                    >
                        <Upload onChange={handleChange} />
                    </FormItem>
                    <FormItem
                        name="pay"
                        label="支付渠道流水证明"
                        rules={[inputEmptyDescriptor, getDescript('minFileSize', '图片大小不能超过4M哦')]}
                        hidden={tab !== 1}
                    >
                        <Upload
                            accept=".xls,.xlsx,.csv"
                            listType="picture"
                            onChange={handleChange}
                            onRemove={handleRemove}
                        />
                    </FormItem>
                    <FormItem name="start_date" label="开始消费时间" rules={[inputEmptyDescriptor]} hidden={tab !== 1}>
                        <DataPicker placeholder="请选择发生消费行为的开始时间" />
                    </FormItem>
                </div>
                <div style={{ display: tab === 2 ? 'block' : 'none' }}>
                    <FormItem name="agent" label="代理人" rules={[inputEmptyDescriptor]} hidden={tab !== 2}>
                        <Input disabled={disabled} placeholder="请输入代理人" onChange={handleChange} />
                    </FormItem>
                    {/* <FormItem
                        name="province"
                        label="银行归属地province"
                        rules={[...descriptor]}
                        hidden={tab !== 2}
                    >
                        <select name="province" id="">
                            <option value="">请选择</option>
                        </select>
                    </FormItem>
                    <FormItem
                        name="city"
                        label="银行归属地city"
                        rules={[...descriptor]}
                        hidden={tab !== 2}
                    >
                        <select name="city" id="">
                            <option value="">请选择</option>
                        </select>
                    </FormItem> */}
                </div>
                <button onClick={submit}>提交</button>
            </Form>
        </div>
    );
};

export default PayForm;
