import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import classes from './NotAuthenticated.module.css';
import { useDispatch } from 'react-redux';
import { layoutActions } from '../Layout/layoutSlice';
import { translate } from '../../utils/translations';

const NotAuthorized = () => {
    const dispatch = useDispatch();
    const lang = useSelector((state) => state.app.lang); // Necessary for rerendering translations

    useEffect(() => {
        dispatch(layoutActions.setPageNotAuthorized(true));

        return () => dispatch(layoutActions.setPageNotAuthorized(false));
    }, []);

    return (
        <div className={classes.NotAuthenticated}>
            <div>
                <h1>{translate('Not Authorized')}</h1>
                <h2>{translate('You cannot view this page.')}</h2>
            </div>
        </div>
    );
};

export default NotAuthorized;
