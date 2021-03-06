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
import 'classnames';
import { enableES5 } from 'immer';

// import Index from '@pages/wap/Index';
if (process.env.MOCK) {
    import('@api/mock');
}
if (process.env.WAP) {
    import('@utils/flexible');
}
enableES5();
const Index = lazy(() => import(`@pages/${process.env.APP_TERMINAL}/Index`));

render(
    <Suspense fallback={'loading...'}>
        <Index />
    </Suspense>,
    document.getElementById('root')
);
