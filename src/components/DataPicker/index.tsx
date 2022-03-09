import React, { useState, useRef, useEffect } from 'react';
import './style.scss';
import { Moment } from 'moment';

import Picker, { PickerProps } from 'rc-picker';
import momentGenerateConfig from '../../../node_modules/rc-picker/lib/generate/moment';
import zhCN from '../../../node_modules/rc-picker/lib/locale/zh_CN';
import 'rc-picker/assets/index.css';

const DataPicker: React.FC<PickerProps<Moment>> = (props) => {
    const onSelect = (newValue: Moment) => {
        console.log('Select:', newValue);
    };

    const onChange = (newValue: Moment | null, formatString?: string) => {
        console.log('Change:', newValue, formatString);
    };
    return <Picker<Moment> {...props} prefixCls="kf-picker" generateConfig={momentGenerateConfig} locale={zhCN} />;
};

DataPicker.elementType = 'DataPicker';

export default DataPicker;
