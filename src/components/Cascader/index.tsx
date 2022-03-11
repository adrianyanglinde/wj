import React from 'react';
import './style.scss';
import { ELEMENT_TYPE } from '@components/Form/FormItem';
import RcCascader from 'rc-cascader';
import { CascaderProps } from 'rc-cascader/lib/Cascader';
import arrayTreeFilter from 'array-tree-filter';
import { RightOutlined } from '@assets/svg';

export type OptionType = {
    label: string;
    value: string;
    children?: OptionType[];
};

const Cascader: React.FC<CascaderProps<OptionType>> = (props) => {
    const { value = [], options, placeholder } = props;
    const getLabel = () =>
        arrayTreeFilter(options, (o: OptionType, level) => o.value === value[level])
            .map((o) => o.label)
            .join(', ');
    return (
        <RcCascader {...props} expandIcon={RightOutlined} prefixCls="kf-cascader">
            <input placeholder={placeholder} className="input" value={getLabel()} readOnly />
        </RcCascader>
    );
};

Cascader.elementType = ELEMENT_TYPE.CASCADER;

export default Cascader;
