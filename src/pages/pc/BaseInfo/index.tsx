import React, { useEffect, useState, useRef } from 'react';
import { useRouteMatch, useParams } from 'react-router-dom';
import { produce } from 'immer';
import Input from '@components/Input';
import Upload, { FileItem } from '@components/Upload';
import FormItem from '@components/Form/FormItem';
import Form from '@components/Form/Form';
import { strategies } from '@utils/validator';
import urls from '@api/urls';
import DataPicker from '@components/DataPicker';
import AccountBookFilledSvg from '@ant-design/icons-svg/lib/asn/AccountBookFilled';

console.log('AccountBookFilledSvg', AccountBookFilledSvg);

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
    pay_certificate_file: {
        value: '',
        errors: ['warn:银行填写有误']
    }
};

const BaseInfo: React.FC = () => {
    const [disabled, setDisabled] = useState(false);
    const [fileList, setFileList] = useState(dataFileList);
    const formRef = useRef();
    const getDescript = (startegy: string, message: string, threshold?: any) => ({
        validator: (rule, value: string & File) => (strategies[startegy](value, message, threshold) ? false : true),
        message: `error:${message}`
    });

    const handleRemovePay = (file: FileItem) => {
        setFileList((data) =>
            produce(data, (draft) => {
                _.remove(draft, (item) => item.fid === file.fid);
            })
        );
    };

    const handleChangePay = (file) => {
        setFileList((data) =>
            produce(data, (draft) => {
                draft.push(file);
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

    const formConfig = {
        pay_amount: {
            item: {
                name: 'pay_amount',
                label: '消费金额',
                rules: [getDescript('isEmpty', '消费金额必须为不小于0的数字，且小数点后不得超过2位数')]
            },
            control: {
                disabled: disabled
            }
        },
        pay_time: {
            item: {
                name: 'pay_time',
                label: '开始消费时间',
                rules: [getDescript('isEmpty', '请选择消费时间')]
            },
            control: {
                disabled: disabled
            }
        },
        state_content: {
            item: {
                name: 'state_content',
                label: '申诉内容',
                rules: [getDescript('isEmpty', '请填写申诉内容')]
            },
            control: {
                disabled: disabled
            }
        },
        pay_certificate_file: {
            item: {
                name: 'pay_certificate_file',
                label: (
                    <>
                        支付渠道流水证明
                        <span className="desc">
                            （
                            <a href="http://my.4399.com/help/article-view-id-6078" target="_blank">
                                如何获得流水证明？
                            </a>
                            ）
                        </span>
                    </>
                ),
                rules: [
                    getDescript('isFileEmpty', '支付渠道流水证明不能为空～', fileList),
                    getDescript('fileType', '上传文件格式不符合要求，请重新上传'),
                    getDescript('isSameFile', '您已上传过该文件，请勿重复上传哦~', fileList),
                    getDescript('minFileSize', '上传文件超过4M，请重新上传', 4)
                ]
            },
            control: {
                disabled: disabled
            }
        },
        pay_name: {
            item: {
                name: 'pay_name',
                label: '被扣款人姓名',
                rules: [getDescript('isEmpty', '请输入被扣款人姓名')]
            },
            control: {
                disabled: disabled
            }
        }
    };

    return (
        <div className="baseInfo-form">
            <Form ref={formRef}>
                <FormItem {...formConfig.pay_amount.item}>
                    <Input {...formConfig.pay_amount.control} placeholder="请输入准确的消费金额" />
                </FormItem>
                <FormItem {...formConfig.pay_time.item}>
                    <DataPicker {...formConfig.pay_time.control} placeholder="请选择发生消费行为的开始时间" />
                </FormItem>
                <FormItem {...formConfig.state_content.item}>
                    <Input {...formConfig.state_content.control} placeholder="请描述密码泄露原因及申请退款的原因" />
                </FormItem>
                <FormItem
                    {...formConfig.pay_certificate_file.item}
                    extra={<div className="form-item-tip">xls、xlsx、csv格式或pdf格式，文件大小不得超过8MB</div>}
                >
                    <Upload
                        {...formConfig.pay_certificate_file.control}
                        url={urls.testUploadFile}
                        accept=".xls,.xlsx,.csv"
                        listType="picture"
                        fileList={fileList}
                        onChange={handleChangePay}
                        onRemove={handleRemovePay}
                    />
                </FormItem>
                <FormItem {...formConfig.pay_name.item}>
                    <Input {...formConfig.pay_name.control} placeholder="请输入被扣款人姓名" />
                </FormItem>
                <div className="form-btn-group">
                    <button className="button" onClick={submit}>
                        下一步
                    </button>
                </div>
            </Form>
        </div>
    );
};

export default BaseInfo;
