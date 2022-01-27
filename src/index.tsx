// A polyfilled environment for React 16 using core-js to support older browsers
import 'core-js/es/map';
import 'core-js/es/set';
import React from 'react';
import { render } from 'react-dom';
import CounterContainer from './container/CounterContainer';
import 'lodash';
import '@sass/common.scss';

import Text from '@components/Text';
import Counter from '@components/Counter';

render(
    <CounterContainer.Provider initialState={2}>
        <Text />
        <Counter />
    </CounterContainer.Provider>,
    document.getElementById('root')
);
