import { useSelector } from 'react-redux';

import classes from './LiveBadge.module.css';
import { translate } from '../../utils/translations';

const LiveBadge = () => {
    const lang = useSelector((state) => state.app.lang); // Necessary for rerendering translations

    return <div className={classes.LiveBadge}>{translate('Live')}</div>;
};

export default LiveBadge;
