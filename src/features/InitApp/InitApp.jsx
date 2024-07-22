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
import { getUpdatedMarkets, getUpdatedHeaders, getEventsToAdd, getEventToAddFromHeader, getEventToAddFromMarkets } from '../../utils/liveUpdates';
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

    // -----------------
    // console.log(incompleteDataRef.current);
    // -----------------

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
                    if (foundEvent) {
                        dispatch(liveActions.updateEventMarkets({ matchId: updateItem.Id, markets: updatedMarkets }));
                        dispatch(betslipActions.updateLiveSlipOdds({ matchId: updateItem.Id, markets: updatedMarkets }));
                    } else {
                        // console.log('onOddsUpdates');
                        // console.log(updatedMarkets);
                        // console.log('-------');

                        const processedEvent = getEventToAddFromMarkets(updatedMarkets, incompleteDataRef.current);
                        dispatch(liveActions.addIncomplete(processedEvent));
                    }
                });
            }
        });
        liveConnection.on('onOddsUpdate', (message) => {
            const decompressedString = lzString.decompressFromUTF16(message);
            const updateObj = JSON.parse(decompressedString);

            if (updateObj.length) {
                console.log('onOddsUpdate');
                console.log(updateObj);
                console.log('-------');

                const foundEvent = liveStateRef.current[updateObj.Id];
                if (foundEvent) {
                    const updatedMarkets = getUpdatedMarkets(updateObj, foundEvent.Markets);
                    dispatch(liveActions.updateEventMarkets({ matchId: updateObj.Id, markets: updatedMarkets }));
                    dispatch(betslipActions.updateLiveSlipOdds({ matchId: updateObj.Id, markets: updatedMarkets }));
                }
            }
        });
        liveConnection.on('onProgramUpdates', (message) => {
            const decompressedString = lzString.decompressFromUTF16(message);
            const updateObj = JSON.parse(decompressedString);
            if (!updateObj) return;

            if (updateObj.R) dispatch(liveActions.removeEvents(updateObj.R));
            if (updateObj.A && updateObj.A.length) {
                // console.log('onProgramUpdates A');
                // console.log(updateObj.A);
                // console.log('-------');

                const eventsToAdd = getEventsToAdd(updateObj.A, liveStateRef.current, incompleteDataRef.current);

                eventsToAdd.add.forEach((eventToAdd) => {
                    dispatch(liveActions.addEvent(eventToAdd));
                });
                eventsToAdd.incomplete.forEach((eventIncomplete) => {
                    dispatch(liveActions.addIncomplete(eventIncomplete));
                });
            }

            if (updateObj.U) {
                // console.log('onProgramUpdates U');
                // console.log(updateObj.U);
                // console.log('-------');

                const updatedHeaders = getUpdatedHeaders(updateObj.U, liveStateRef.current);

                Object.keys(updatedHeaders).forEach((key) => {
                    const matchId = parseInt(key);
                    const updatedHeader = updatedHeaders[key];
                    dispatch(liveActions.updateHeadersProps({ matchId: matchId, updatedHeader: updatedHeader }));
                });
            }
            if (updateObj.Alives) dispatch(liveActions.checkAlives(updateObj.Alives));
        });
        liveConnection.on('onMetaInfos', (message) => {
            const decompressedString = lzString.decompressFromUTF16(message);
            const updateObj = JSON.parse(decompressedString);
            if (!updateObj) return;

            // console.log('onMetaInfos');
            // console.log(updateObj);
            // console.log('-------');

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

            // console.log('onHeadersList');
            // console.log(updateObj);
            // console.log('-------');

            updateObj.forEach((headerItem) => {
                const matchId = headerItem.MatchId;
                if (liveStateRef.current[matchId]) {
                    dispatch(liveActions.updateLiveHeader(headerItem));
                } else {
                    const processedEvent = getEventToAddFromHeader(headerItem, incompleteDataRef.current);
                    if (processedEvent.toAdd) dispatch(liveActions.addEvent(processedEvent));
                    else dispatch(liveActions.addIncomplete(processedEvent));
                }
            });
        });
        // liveConnection.on('onOddsChangeFull', (message) => {
        //     const decompressedString = lzString.decompressFromUTF16(message);
        //     const updateObj = JSON.parse(decompressedString);
        //     if (!updateObj) return;
        // });

        liveConnection.start();
        dispatch(liveActions.setLiveConnection(liveConnection));
    };

    return initDataLoaded ? <Outlet /> : <Preloader />;
};

export default InitApp;
