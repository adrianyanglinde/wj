// A polyfilled environment for React 16 using core-js to support older browsers
import 'core-js/es/map';
import 'core-js/es/set';
import React from 'react';
import { render } from 'react-dom';
import 'lodash';
import '@sass/common.scss';

import CounterContainer from '@containers/Counter';
import Text from '@components/Text';
import Counter from '@components/Counter';

render(
    <CounterContainer.Provider initialState={2}>
        <Text />
        <Counter />
    </CounterContainer.Provider>,
    document.getElementById('root')
);
