// A polyfilled environment for React 16 using core-js to support older browsers
// import 'core-js/es/map';
// import 'core-js/es/set';
// import 'core-js/features/object/assign';
// import 'core-js/stable/promise';
import 'core-js/stable';
import 'regenerator-runtime/runtime';

import React, { lazy, Suspense } from 'react';
import { render } from 'react-dom';
import 'lodash';
// import IndexPC from '@pages/pc/Index';
// import IndexWAP from '@pages/wap/Index';
import CounterContainer from '@containers/Counter';
if (process.env.MOCK) {
    import('@api/mock');
}
if (process.env.WAP) {
    import('@utils/flexible');
}
const Index = lazy(() => import(`@pages/${process.env.APP_TERMINAL}/Index`));

render(
    <Suspense fallback={'加载中...'}>
        <CounterContainer.Provider>
            <Index />
        </CounterContainer.Provider>
    </Suspense>,
    document.getElementById('root')
);
