// A polyfilled environment for React 16 using core-js to support older browsers
// import 'core-js/es/map';
// import 'core-js/es/set';
// import 'core-js/features/object/assign';
// import 'core-js/stable/promise';
import 'core-js/stable';
import 'regenerator-runtime/runtime';

import React from 'react';
import { render } from 'react-dom';
import 'lodash';
import '@sass/common.scss';
if (process.env.MOCK) {
    require('@api/mock');
}

import CounterContainer from '@containers/Counter';
import Text from '@components/Text';
import Counter from '@components/Counter';

render(
    <CounterContainer.Provider>
        <Text />
        <Counter />
    </CounterContainer.Provider>,
    document.getElementById('root')
);
