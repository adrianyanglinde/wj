import React, { useEffect, useState, useRef } from 'react';
import { createWaterMark } from '@ued/watermark';
import urls from '@api/urls';
import './style.scss';
import { post } from '@api/request';
import { UploadPlus } from '@assets/svg';
import Viewer from 'viewerjs';
import 'viewerjs/dist/viewer.css';
import { ELEMENT_TYPE } from '@components/Form/FormItem';

enum STATUS_TYPE {
    EMPTY = 'empty',
    UPLOADING = 'uploading',
    LOADING = 'loading',
    SUCCESS = 'success',
    DISABLED = 'disabled'
}

export type FileItem = {
    fid: string;
    full: string;
    md5: string;
    name?: string;
};

interface IProp {
    form?: any;
    name?: string;
    url?: string;
    value?: string;
    /** 先简单根据listType区分文件列表上传/图片上传 */
    listType?: 'picture' | null;
    accept?: string;
    fileList?: FileItem[];
    maxCount?: number;
    onChange?: (any) => void;
    onRemove?: (e) => void;
    onBlur?: (e) => void;
}

const Upload: React.FC<IProp> = (props) => {
    const {
        form,
        name,
        onChange = () => {
            // do
        },
        onBlur = () => {
            // do
        },
        onRemove = () => {
            // do
        },
        url = urls.testUploadImg,
        listType,
        value,
        accept = '*',
        fileList = [],
        maxCount = 4
    } = props;
    const [status, setStatus] = useState(STATUS_TYPE.EMPTY);
    const [preview, setPreview] = useState('');
    const inputRef = useRef(null);
    const imageRef = useRef(null);
    const newProps = _.pick(props, 'name', 'onChange', 'accept');
    const dataURLtoBlob = (dataurl) => {
        const arr = dataurl.split(','),
            mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]);
        let n = bstr.length;
        const u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new Blob([u8arr], { type: mime });
    };
    const handleRemove = (item) => {
        form.setFieldsValue({ [name]: '' });
        onRemove(item);
    };
    const handleChangeFile = () => {
        inputRef.current.click();
    };
    const handleChange = async (e) => {
        onBlur(e); //TODO: 必须先执行，才能触发数据上报
        const file = e.target.files[0];
        const error = form.getFieldError(name);
        console.log('upload', error);
        if (error) {
            setStatus(STATUS_TYPE.EMPTY);
            return false;
        }
        setStatus(STATUS_TYPE.UPLOADING);
        //if (listType) {
        upload(file);
        // } else {
        //     const reader = new FileReader();
        //     reader.readAsDataURL(file);
        //     reader.onload = async (event) => {
        //         const base64Url = await createWaterMarkAsync(event.target.result);
        //         // setStatus(STATUS_TYPE.SUCCESS);
        //         // setPreview(base64Url);
        //         // new Viewer(imageRef.current);
        //         // return;
        //         const blob = dataURLtoBlob(base64Url);
        //         upload(blob);
        //     };
        // }
    };
    const createWaterMarkAsync = (dataSource): Promise<string> =>
        new Promise((resolve) => {
            createWaterMark({
                dataSource: dataSource,
                dataSourceType: 'base64',
                content: '仅供4399UED使用',
                success: (base64Url) => {
                    resolve(base64Url);
                }
            });
        });
    const upload = async (file: Blob | File) => {
        const formData = new FormData();
        formData.append('file', file);
        try {
            const res = await post(url, formData);
            if (listType) {
                setStatus(STATUS_TYPE.SUCCESS);
                console.log('res', res);
                onChange({
                    ...res.d,
                    name: file.name
                });
            } else {
                const image = new Image();
                setStatus(STATUS_TYPE.LOADING);
                image.src = res.d.full;
                image.onload = () => {
                    setStatus(STATUS_TYPE.SUCCESS);
                    setPreview(image.src);
                };
            }
        } catch (error) {
            console.log('post', error);
            setStatus(STATUS_TYPE.DISABLED);
        }
    };
    const getFileType = (fileName) => {
        const filePath = fileName.toLowerCase().split('.');
        return filePath[filePath.length - 1];
    };

    useEffect(() => {
        if (value) {
            setStatus(STATUS_TYPE.SUCCESS);
            setPreview(value);
        }
    }, [value]);

    useEffect(() => {
        if (imageRef.current) {
            new Viewer(imageRef.current);
        }
    }, [imageRef.current, preview]);

    const getItemFileIconCls = (name) =>
        classnames([
            'upload-list-item-file',
            {
                'upload-list-item-file-pdf': getFileType(name) === 'pdf',
                'upload-list-item-file-excel': getFileType(name) !== 'pdf'
            }
        ]);

    return (
        <div className="upload">
            {listType ? (
                <>
                    {!_.isEmpty(fileList) && (
                        <div className="upload-list-picture">
                            {fileList.map((item) => (
                                <div className="upload-list-item-wrap" key={item.fid}>
                                    <div className="upload-list-item">
                                        <div className={getItemFileIconCls(item.name)}></div>
                                        {item.name}
                                    </div>
                                    <div className="upload-list-item-delete" onClick={() => handleRemove(item)}>
                                        删除
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                    {fileList.length < maxCount && (
                        <div className="upload-field">
                            {status === STATUS_TYPE.UPLOADING && <div className="upload-loading">上传中...</div>}
                            {status === STATUS_TYPE.LOADING && <div className="upload-loading">加载中...</div>}
                            {(status === STATUS_TYPE.EMPTY || status === STATUS_TYPE.SUCCESS) && (
                                <div>
                                    <div className="upload-txt">{UploadPlus}上传</div>
                                    <input
                                        {...newProps}
                                        ref={inputRef}
                                        type="file"
                                        accept={accept}
                                        onChange={handleChange}
                                    />
                                </div>
                            )}
                        </div>
                    )}
                </>
            ) : (
                <div className="upload-field">
                    {status === STATUS_TYPE.UPLOADING && <div className="upload-loading">上传中...</div>}
                    {status === STATUS_TYPE.LOADING && <div className="upload-loading">加载中...</div>}
                    {status === STATUS_TYPE.EMPTY && (
                        <div>
                            <div className="upload-txt">{UploadPlus}上传</div>
                            <input {...newProps} ref={inputRef} type="file" accept={accept} onChange={handleChange} />
                        </div>
                    )}
                    {status === STATUS_TYPE.SUCCESS && (
                        <div>
                            <input {...newProps} ref={inputRef} type="file" accept={accept} onChange={handleChange} />
                            <div className="upload-img">
                                <img src={preview} ref={imageRef} alt="" />
                            </div>
                            <div className="upload-change" onClick={handleChangeFile}>
                                更改
                            </div>
                        </div>
                    )}
                    {status === STATUS_TYPE.DISABLED && (
                        <div className="upload-img-wrapper">
                            <div
                                className="upload-img upload-disable"
                                style={{ backgroundImage: 'url(' + preview + ')' }}
                            ></div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

Upload.elementType = ELEMENT_TYPE.UPLOAD;

export default Upload;
