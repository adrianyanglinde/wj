import React, { useEffect, useState, useRef } from 'react';
import { produce } from 'immer';
import Input from '@components/Input';
import Upload from '@components/Upload';
import FormItem from '@components/Form/FormItem';
import Form from '@components/Form/Form';
import { strategies } from '@utils/validator';
import urls from '@api/urls';

const data = {
    party_id_pic_hole: {
        value: 'https://fs.img4399.com/kf/2022/02/28/18_2682ae082bdf.jpg',
        errors: ['warn:idcard error']
    }
};

const IndentityInfo: React.FC = () => {
    const [tab, setTab] = useState(0);
    const [disabled, setDisabled] = useState(false);
    const formRef = useRef();
    const getDescript = (startegy: string, message: string, threshold?: any) => ({
        validator: (rule, value: string & File) => (strategies[startegy](value, message, threshold) ? false : true),
        message: `error:${message}`
    });

    const submit = () => {
        const form = formRef?.current.form;
        form.validateFields((error, value) => {
            if (error) {
                console.log('error validateFields', error);
            } else {
                console.log('subimit value', value);
            }
        });
    };

    useEffect(() => {
        formRef?.current.form.setFields(data);
    }, [formRef]);

    return (
        <div className="baseInfo-form">
            <Form ref={formRef}>
                <button
                    onClick={() => {
                        setTab(0);
                    }}
                >
                    我是监护人本人
                </button>
                <button
                    onClick={() => {
                        setTab(1);
                    }}
                >
                    我是监护人指定代理人
                </button>
                <div style={{ display: tab === 1 ? 'block' : 'none' }}>
                    <FormItem
                        name="party_id_pic_hole"
                        label="代理人身份证照片"
                        rules={[
                            getDescript('isEmpty', '请填写身份证'),
                            getDescript('minFileSize', '图片大小不能超过4M哦', 4),
                            getDescript('imageType', '上传图片格式错误，请重新上传')
                        ]}
                        hidden={tab !== 1}
                    >
                        <Upload url={urls.testUploadImg} />
                    </FormItem>
                </div>
                <FormItem
                    name="party_id_pic_hole"
                    label="监护人手持身份证照片"
                    rules={[
                        getDescript('isEmpty', '请填写身份证'),
                        getDescript('minFileSize', '图片大小不能超过4M哦', 4),
                        getDescript('imageType', '上传图片格式错误，请重新上传')
                    ]}
                >
                    <Upload url={urls.testUploadImg} />
                </FormItem>
                <button onClick={submit}>下一步</button>
            </Form>
        </div>
    );
};

export default IndentityInfo;
