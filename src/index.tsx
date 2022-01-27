// A polyfilled environment for React 16 using core-js to support older browsers
import 'core-js/es/map';
import 'core-js/es/set';
import React from 'react';
import ReactDOM from 'react-dom';
import Text from '@components/Text';
import '@sass/common.scss';

ReactDOM.render(<Text />, document.getElementById('root'));
