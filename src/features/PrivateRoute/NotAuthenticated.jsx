import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import classes from './NotAuthenticated.module.css';
import { useDispatch } from 'react-redux';
import { layoutActions } from '../Layout/layoutSlice';
import { translate } from '../../utils/translations';

const NotAuthenticated = () => {
    const dispatch = useDispatch();
    const lang = useSelector((state) => state.app.lang); // Necessary for rerendering translations

    useEffect(() => {
        dispatch(layoutActions.setPageNotAuthorized(true));

        return () => dispatch(layoutActions.setPageNotAuthorized(false));
    }, []);

    return (
        <div className={classes.NotAuthenticated}>
            <div>
                <h1>{translate('Not Authenticated')}</h1>
                <h2>{translate('Please sign in to view this page.')}</h2>
            </div>
        </div>
    );
};

export default NotAuthenticated;
