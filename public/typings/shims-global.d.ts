import lodash from 'lodash';
import classname from 'classnames';
declare global {
    const _: typeof lodash;
    const classnames: typeof classname;
}
