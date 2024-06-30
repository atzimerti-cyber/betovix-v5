import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import { HubConnectionBuilder } from '@microsoft/signalr';
import lzString from 'lz-string';
import _ from 'lodash';

import Preloader from '../UI/Loaders/Preloader';
import { loadInitData } from './initAppAsyncActions';
import { liveActions } from './liveSlice';
import { getUpdatedMarkets, getUpdatedHeaders, getEventsToAdd } from '../../utils/liveUpdates';
import { betslipActions } from '../Betslip/betslipSlice';
import { getUser } from '../../pages/Login/loginAsyncActions';

const InitApp = () => {
    const dispatch = useDispatch();
    const isMobile = useMediaQuery({ query: '(max-width: 768px)' });

    const initDataLoaded = useSelector((state) => state.app.initDataLoaded);
    const liveState = useSelector((state) => state.live.liveState);
    const liveConnectionStored = useSelector((state) => state.live.liveConnection);
    const incompleteDataEvents = useSelector((state) => state.live.incompleteDataEvents);
    const user = useSelector((state) => state.login.user);
    const permissions = useSelector((state) => state.login.permissions);

    const liveStateRef = useRef(liveState);
    const incompleteDataRef = useRef(incompleteDataEvents);
    const timerIdRef = useRef(null);

    // Loads once on start
    useEffect(() => {
        dispatch(loadInitData(isMobile));
    }, []);

    // Connection. Reruns on change permissions for sports
    useEffect(() => {
        if (permissions.AllowToSports) connectToWs();

        return () => {
            if (liveConnectionStored) {
                liveConnectionStored.off('onOddsUpdates');
                liveConnectionStored.off('onOddsUpdate');
                liveConnectionStored.off('onProgramUpdates');
                liveConnectionStored.off('onMetaInfos');
                liveConnectionStored.off('onHeadersList');
            }
        };
    }, [permissions.AllowToSports]);

    // For loading initial data. Loads on change log in
    useEffect(() => {
        if (!initDataLoaded) return;

        dispatch(loadInitData(isMobile));
    }, [user?.AccountId]);

    // For setting timer for getting user. Loads on change log in
    useEffect(() => {
        // Get user every 5 seconds...
        clearInterval(timerIdRef.current);
        const pollingCallback = () => {
            dispatch(getUser());
        };
        if (user) timerIdRef.current = setInterval(pollingCallback, 5000);

        return () => {
            if (!user) clearInterval(timerIdRef.current);
        };
    }, [user?.AccountId]);

    useEffect(() => {
        liveStateRef.current = liveState;
    }, [liveState]);
    useEffect(() => {
        incompleteDataRef.current = incompleteDataEvents;
    }, [incompleteDataEvents]);

    // Web socket
    const connectToWs = () => {
        const liveConnection = new HubConnectionBuilder().withUrl('https://livenode.pick500.net:60010/liveOddsHub').withAutomaticReconnect().build();

        liveConnection.on('onOddsUpdates', (message) => {
            const decompressedString = lzString.decompressFromUTF16(message);
            const updateObj = JSON.parse(decompressedString);

            if (updateObj.length) {
                updateObj.forEach((updateItem) => {
                    const foundEvent = liveStateRef.current[updateItem.Id];
                    const updatedMarkets = getUpdatedMarkets(updateItem, foundEvent.Markets);
                    dispatch(liveActions.updateEventMarkets({ matchId: updateItem.Id, markets: updatedMarkets }));
                    dispatch(betslipActions.updateLiveSlipOdds({ matchId: updateItem.Id, markets: updatedMarkets }));
                });
            }
        });
        liveConnection.on('onOddsUpdate', (message) => {
            const decompressedString = lzString.decompressFromUTF16(message);
            const updateObj = JSON.parse(decompressedString);

            if (updateObj.length) {
                const foundEvent = liveStateRef.current[updateObj.Id];
                const updatedMarkets = getUpdatedMarkets(updateObj, foundEvent.Markets);
                dispatch(liveActions.updateEventMarkets({ matchId: updateObj.Id, markets: updatedMarkets }));
                dispatch(betslipActions.updateLiveSlipOdds({ matchId: updateObj.Id, markets: updatedMarkets }));
            }
        });
        liveConnection.on('onProgramUpdates', (message) => {
            const decompressedString = lzString.decompressFromUTF16(message);
            const updateObj = JSON.parse(decompressedString);
            if (!updateObj) return;

            if (updateObj.R) dispatch(liveActions.removeEvents(updateObj.R));
            if (updateObj.A && updateObj.A.length) {
                const eventsToAdd = getEventsToAdd(updateObj.A, liveStateRef.current, incompleteDataRef.current);

                eventsToAdd.add.forEach((eventToAdd) => {
                    dispatch(liveActions.addEvent(eventToAdd));
                });
                eventsToAdd.incomplete.forEach((eventIncomplete) => {
                    dispatch(liveActions.addIncomplete(eventIncomplete));
                });
            }

            if (updateObj.U) {
                const updatedHeaders = getUpdatedHeaders(updateObj.U, liveState);
                dispatch(liveActions.updateHeadersProps(updatedHeaders));
            }
            if (updateObj.Alives) dispatch(liveActions.checkAlives(updateObj.Alives));
        });
        liveConnection.on('onMetaInfos', (message) => {
            const decompressedString = lzString.decompressFromUTF16(message);
            const updateObj = JSON.parse(decompressedString);
            if (!updateObj) return;

            const eventsToAdd = getEventsToAdd(updateObj, liveStateRef.current, incompleteDataRef.current, true);

            eventsToAdd.add.forEach((eventToAdd) => {
                dispatch(liveActions.addEvent(eventToAdd));
            });
            eventsToAdd.incomplete.forEach((eventIncomplete) => {
                dispatch(liveActions.addIncomplete(eventIncomplete));
            });
        });
        liveConnection.on('onHeadersList', (message) => {
            const decompressedString = lzString.decompressFromUTF16(message);
            const updateObj = JSON.parse(decompressedString);
            if (!updateObj) return;
            dispatch(liveActions.updateLiveHeader(updateObj));
        });

        liveConnection.start();
        dispatch(liveActions.setLiveConnection(liveConnection));
    };

    return initDataLoaded ? <Outlet /> : <Preloader />;
};

export default InitApp;
