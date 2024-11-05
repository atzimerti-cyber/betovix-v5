import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';

import { casinoActions } from '../casinoSlice';
import classes from './Providers.module.css';
import Providers from '../../../assets/svgs/providers.svg?react';
import { translate } from '../../../utils/translations';
import GridVendors from '../features/GridVendors';
import { getAllVendors } from '../casinoAsyncActions';

const FavoriteGames = () => {
    const dispatch = useDispatch();
    const lang = useSelector((state) => state.app.lang); // Necessary for rerendering translations

    const allCasinoVendors = useSelector((state) => state.casino.casinoVendors);
    const user = useSelector((state) => state.login.user);

    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;
        dispatch(getAllVendors(signal));

        return () => {
            controller.abort();
            dispatch(casinoActions.resetLobby());
        };
    }, []);

    return (
        <>
            <div className={classes.SlotGames}>
                {allCasinoVendors && allCasinoVendors.length === 0 && (
                    null
                )}

                {allCasinoVendors && allCasinoVendors.length > 1 && (
                    <GridVendors
                        title={translate('Our Providers')}
                        icon={<Providers />}
                        collection={allCasinoVendors}
                    />
                )}
            </div>
        </>
    );
};

export default FavoriteGames;
