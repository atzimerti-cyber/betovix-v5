import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';

import { getCasinoByTags, getCasinoTags } from '../casinoAsyncActions';
import classes from './GamesByTag.module.css';

import LogoSmallIcon from '../../../assets/svgs/logo-small.svg?react';

import GridGames from '../features/GridGames';
import { translate } from '../../../utils/translations';
import { casinoActions } from '../casinoSlice';
import { layoutActions } from '../../../features/Layout/layoutSlice';



const GamesByTag = () => {
    const dispatch = useDispatch();
    const lang = useSelector((state) => state.app.lang); // Necessary for rerendering translations
    const location = useLocation();
    const { label } = location.state || {};

    const user = useSelector((state) => state.login.user);

    const [menuTag, setMenuTag] = useState(null);
    const [items, setItems] = useState({ Data: null });

    const casinoByTags = useSelector((state) => state.casino.casinoByTags);
    const loading = useSelector((state) => state.layout.loading);

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
        dispatch(layoutActions.setLoading(true));

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
                setTimeout(() => {

                dispatch(layoutActions.setLoading(false));

                setItems({ Data: casinoByTags[menuTag] });
            }, 1500);
            }
        }

    }, [casinoByTags]);

    return (
        <>
            {!loading ? (
                <div className={classes.TagGames}>
                    {items?.Data ? (
                        <GridGames
                            collection={items}
                            icon={''}
                            title={translate(`${label}`)}
                            loading={false}
                        />
                    ) : null}
                </div>
            ) : (
            <div className={classes.Loading}>
                <span> <LogoSmallIcon /> </span>
            </div>
            )}
        </>
    );
};

export default GamesByTag;
