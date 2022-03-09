import React, { useEffect, useState, useRef } from 'react';
import { createWaterMark } from '@ued/watermark';
import urls from '@api/urls';
import './style.scss';
import { post } from '@api/request';
import { UploadPlus } from '@assets/svg';
import Viewer from 'viewerjs';
import 'viewerjs/dist/viewer.css';

enum STATUS_TYPE {
    EMPTY = 'empty',
    UPLOADING = 'uploading',
    LOADING = 'loading',
    SUCCESS = 'success',
    DISABLED = 'disabled'
}

interface IProp {
    form?: any;
    name?: string;
    url?: string;
    onChange?: (e: React.ChangeEvent) => void;
}

const Upload: React.FC<IProp> = (props) => {
    const { form, name, onChange, url = urls.testUpload } = props;
    const [status, setStatus] = useState(STATUS_TYPE.EMPTY);
    const [preview, setPreview] = useState('');
    const inputRef = useRef(null);
    const imageRef = useRef(null);
    const newProps = _.omit(props, 'form', 'value');
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
    const handleChangeFile = () => {
        inputRef.current.click();
    };
    const handleChange = (e) => {
        onChange(e); //TODO: 必须先执行，才能触发rc-form 的onchange验证
        const file = e.target.files[0];
        const error = form.getFieldError(name);
        if (error) {
            return false;
        }
        setStatus(STATUS_TYPE.UPLOADING);

        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = async (event) => {
            const base64Url = await createWaterMarkAsync(event.target.result);
            setStatus(STATUS_TYPE.SUCCESS);
            setPreview(base64Url);
            new Viewer(imageRef.current);
            return;
            const blob = dataURLtoBlob(base64Url);
            upload(blob);
        };
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
    const upload = async (file: Blob) => {
        const formData = new FormData();
        formData.append('file', file);
        try {
            const res = await post(url, formData);
            const image = new Image();
            setStatus(STATUS_TYPE.LOADING);
            image.src = res.d.full;
            image.onload = () => {
                setStatus(STATUS_TYPE.SUCCESS);
                setPreview(image.src);
                new Viewer(imageRef.current);
            };
        } catch (error) {
            setStatus(STATUS_TYPE.DISABLED);
        }
    };

    return (
        <div className="upload">
            {status === STATUS_TYPE.UPLOADING && <div className="upload-loading">上传中...</div>}
            {status === STATUS_TYPE.LOADING && <div className="upload-loading">加载中...</div>}
            {status === STATUS_TYPE.EMPTY && (
                <div>
                    <div className="upload-txt">{UploadPlus}上传</div>
                    <input {...newProps} ref={inputRef} type="file" accept="image/*" onChange={handleChange} />
                </div>
            )}
            {status === STATUS_TYPE.SUCCESS && (
                <div>
                    <input {...newProps} ref={inputRef} type="file" accept="image/*" onChange={handleChange} />
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
    );
};

Upload.elementType = 'Upload';

export default Upload;
