import React, { useEffect, useState, useMemo, useRef } from 'react';
import moment from 'moment';
import { produce } from 'immer';
import Input from '@components/Input';
import Upload, { FileItem } from '@components/Upload';
import DataPicker from '@components/DataPicker';
import FormItem from '@components/Form/FormItem';
import Form, { LAYOUT } from '@components/Form/Form';
import { strategies } from '@utils/validator';

const dataFileList = [
    {
        fid: '-1',
        full: 'https://fs.img4399.com/kf/2022/03/10/xxx.pdf',
        name: 'xxx.pdf',
        md5: '117c56f72987421854e4ee0597a7986c1'
    },
    {
        fid: '-2',
        full: 'https://fs.img4399.com/kf/2022/03/10/yyy.xlsx',
        name: 'yyy.xlsx',
        md5: '117c56f72987421854e4ee0597a7986c2'
    }
];

const data = {
    game: { value: 'game1', errors: ['warn:game error'] },
    // start_date: { value: moment(), errors: ['warn:start_date error'] },
    idcard: {
        value: 'https://fs.img4399.com/kf/2022/02/28/18_2682ae082bdf.jpg',
        errors: ['warn:idcard error']
    },
    pay: {
        value: '',
        errors: ['warn:idcard error']
    }
};

const PayForm: React.FC = () => {
    const [tab, setTab] = useState(1);
    const [disabled, setDisabled] = useState(true);
    const [fileList, setFileList] = useState(dataFileList);
    const formRef = useRef();
    const getDescript = (startegy: string, message: string, threshold?: any) => ({
        validator: (rule, value: string & File) => (strategies[startegy](value, message, threshold) ? false : true),
        message: `error:${message}`
    });

    const handleChange = (e) => {
        console.log('input otter onChange', e.target);
    };

    const handleRemovePay = (file: FileItem) => {
        setFileList((data) =>
            produce(data, (draft) => {
                _.remove(draft, (item) => item.fid === file.fid);
            })
        );
    };

    const handleChangePay = (item) => {
        setFileList((data) =>
            produce(data, (draft) => {
                draft.push(item);
            })
        );
    };

    const submit = () => {
        const form = formRef?.current.form;
        form.validateFields((error, value) => {
            if (error) {
                console.log('error validateFields', error);
            } else {
                console.log('subimit value', value);
                console.log('subimit fileList', fileList);
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
                <FormItem
                    name="contact"
                    label="联系方式"
                    rules={[
                        getDescript('isEmpty', '请填写联系方式'),
                        getDescript('isMoblie', '请填写正确的联系方式～')
                    ]}
                >
                    <Input disabled={disabled} placeholder="请输入联系方式" onChange={handleChange} />
                </FormItem>
                <div style={{ display: tab === 1 ? 'block' : 'none' }}>
                    <FormItem
                        name="game"
                        label="消费金额"
                        rules={[getDescript('isEmpty', '消费金额必须为不小于0的数字，且小数点后不得超过2位数')]}
                        hidden={tab !== 1}
                    >
                        <Input disabled={disabled} placeholder="请输入游戏名称" onChange={handleChange} />
                    </FormItem>
                    <FormItem
                        name="idcard"
                        label="身份证"
                        rules={[
                            getDescript('isEmpty', '请填写身份证'),
                            getDescript('minFileSize', '图片大小不能超过4M哦', 4),
                            getDescript('imageType', '上传图片格式错误，请重新上传')
                        ]}
                        hidden={tab !== 1}
                    >
                        <Upload onChange={handleChange} />
                    </FormItem>
                    <FormItem
                        name="pay"
                        label="支付渠道流水证明"
                        rules={[
                            getDescript('isFileEmpty', '支付渠道流水证明不能为空～', fileList),
                            getDescript('fileType', '上传文件格式不符合要求，请重新上传'),
                            getDescript('isSameFile', '您已上传过该文件，请勿重复上传哦~', fileList),
                            getDescript('minFileSize', '上传文件超过4M，请重新上传', 4)
                        ]}
                        hidden={tab !== 1}
                    >
                        <Upload
                            accept=".xls,.xlsx,.csv"
                            listType="picture"
                            fileList={fileList}
                            onChange={handleChangePay}
                            onRemove={handleRemovePay}
                        />
                    </FormItem>
                    <FormItem
                        name="start_date"
                        label="开始消费时间"
                        rules={[getDescript('isEmpty', '请选择消费时间')]}
                        hidden={tab !== 1}
                    >
                        <DataPicker placeholder="请选择发生消费行为的开始时间" />
                    </FormItem>
                </div>
                <div style={{ display: tab === 2 ? 'block' : 'none' }}>
                    <FormItem
                        name="agent"
                        label="代理人"
                        rules={[getDescript('isEmpty', '请输入代理人')]}
                        hidden={tab !== 2}
                    >
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
