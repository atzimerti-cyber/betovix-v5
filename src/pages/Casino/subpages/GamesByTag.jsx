import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';

import { getCasinoByTags, getCasinoTags } from '../casinoAsyncActions';
import classes from './GamesByTag.module.css';
import HeartIcon from '../../../assets/svgs/heart.svg?react';
import GridGames from '../features/GridGames';
import { translate } from '../../../utils/translations';
import { casinoActions } from '../casinoSlice';

const GamesByTag = () => {
    const dispatch = useDispatch();
    const lang = useSelector((state) => state.app.lang); // Necessary for rerendering translations
    const location = useLocation();
    const { label } = location.state || {};

    const user = useSelector((state) => state.login.user);

    const [menuTag, setMenuTag] = useState(null);
    const [items, setItems] = useState({ Data: null });

    const casinoByTags = useSelector((state) => state.casino.casinoByTags);

    useEffect(() => {
        return () => {
            dispatch(casinoActions.reset());
        };

    }, []);

    useEffect(() => {

        const searchParams = new URLSearchParams(location.search);
        const tag = searchParams.get('tag');

        if (tag) {
            setMenuTag(tag);
        }

    }, [location.search]);

    useEffect(() => {
        if (!menuTag) return;

        const controller = new AbortController();
        const signal = controller.signal;

        dispatch(getCasinoByTags(signal, menuTag));

        return () => {
            controller.abort();
        }

    }, [menuTag]);

    useEffect(() => {
        if (casinoByTags) {
            if (casinoByTags[menuTag]) {
                setItems({ Data: casinoByTags[menuTag] });
            }
        }

    }, [casinoByTags]);

    return (
        <div className={classes.TagGames}>

            {items.Data != null ? (
                <GridGames
                    collection={items}
                    icon={''}
                    title={translate(`${label}`)}
                    loading={false}
                />
            ) : (
                null
            )}



        </div>
    )
};

export default GamesByTag;
