import _ from 'lodash';

interface Strategies {
    [propName: string]: (value: string & File, errorMsg: string, options?: any) => string | void;
}

export const strategies: Strategies = {
    isEmpty(value, errorMsg) {
        return !value || _.trim(value) === '' ? errorMsg : void 0;
    },
    isNum(value, errorMsg) {
        return !/(^[1-9]\d*$)/.test(value) ? errorMsg : void 0;
    },
    imageType(file, errorMsg) {
        if ((file as any) instanceof File) {
            const filePath = file.name.toLowerCase().split('.');
            const fileType = filePath[filePath.length - 1];
            return !/(jpg|png)$/i.test(fileType) ? errorMsg : void 0;
        }
        return void 0;
    },
    fileType(file, errorMsg) {
        if ((file as any) instanceof File) {
            const filePath = file.name.toLowerCase().split('.');
            const fileType = filePath[filePath.length - 1];
            return !/(xls|xlsx|csv)$/i.test(fileType) ? errorMsg : void 0;
        }
        return void 0;
    },
    isSameFile(file, errorMsg, fileList) {
        if ((file as any) instanceof File) {
            return _.find(fileList, (item) => item.name === file.name) ? errorMsg : void 0;
        }
        return void 0;
    },
    isFileEmpty(value, errorMsg, fileList) {
        return this.isEmpty(value, errorMsg) && fileList.length <= 0 ? errorMsg : void 0;
    },
    minFileSize(file, errorMsg, threshold = 4) {
        if ((file as any) instanceof File) {
            return file.size / 1024 / 1024 > threshold ? errorMsg : void 0;
        }
        return void 0;
    },
    // maxLength(value, length, errorMsg) {
    //     return value > +length ? errorMsg : void 0;
    // },
    isMoblie(value, errorMsg) {
        if (value == '') return void 0;

        return !/^0{0,1}(13[0-9]|15[7-9]|15[0-7]|18[0-9])[0-9]{8}$/.test(value) ? errorMsg : void 0;
    },
    isEmail(value, errorMsg) {
        if (value == '') return void 0;

        return !/^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/.test(value)
            ? errorMsg
            : void 0;
    },
    // isRealName(value, errorMsg) {
    //     return !regRealName.test(value) ? errorMsg : void 0;
    // },
    // isIdcard(value, errorMsg) {
    //     return !__checkIdcard(value) ? errorMsg : void 0;
    // },
    imageFormat(value, errorMsg) {
        return !/.(jpg|jpeg|png|JPG|JPEG|PNG)$/.test(value) ? errorMsg : void 0;
    },
    maxSize(value, length, errorMsg) {
        return value / 1024 / 1024 > length ? errorMsg : void 0;
    },
    isIdPassport(value, errorMsg) {
        return !/^[a-zA-Z0-9]{5,17}$/.test(value) ? errorMsg : void 0;
    },
    isIdTaiwan(value, errorMsg) {
        return !/(^\d{8})$/.test(value) ? errorMsg : void 0;
    },
    isReturnHome(value, errorMsg) {
        return !/(H|M|h|m)(\d{8})$/.test(value) ? errorMsg : void 0;
    }
};
