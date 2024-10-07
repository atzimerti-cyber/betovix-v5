import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { HubConnectionBuilder } from '@microsoft/signalr';
import lzString from 'lz-string';
import _ from 'lodash';
import { toast } from 'react-toastify';
import { liveActions } from '../../InitApp/liveSlice';
import { getUpdatedMarkets, getUpdatedHeaders, getEventsToAdd, getEventToAddFromHeader, getEventToAddFromMarkets } from '../../../utils/liveUpdates';
import { betslipActions } from '../../Betslip/betslipSlice';
import axiosApi from '../../../axios-api';
import config from '../../../config';
const LiveLoader = () => {
    const dispatch = useDispatch();

    const liveState = useSelector((state) => state.live.liveState);
    const liveConnectionStored = useSelector((state) => state.live.liveConnection);
    const incompleteDataEvents = useSelector((state) => state.live.incompleteDataEvents);
    const permissions = useSelector((state) => state.login.permissions);

    const liveStateRef = useRef(liveState);
    const incompleteDataRef = useRef(incompleteDataEvents);

    // Connection. Reruns on change permissions for sports
    useEffect(() => {
        if (permissions.AllowToSports) {
            const address = getAddress();
        }

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

    useEffect(() => {
        liveStateRef.current = liveState;
    }, [liveState]);

    useEffect(() => {
        incompleteDataRef.current = incompleteDataEvents;
    }, [incompleteDataEvents]);

    const getAddress = async () => {
        try {
            const resp = await axiosApi.get(`LiveCluster/getAnAddress`, {
                baseURLOverride: config.VITE_SPORTS_API_BASE,
            });

            if (resp.status !== 200 || resp.data == '') throw Error();

            if (resp?.data == '') return;

            connectToWs(resp?.data);
            //connectToWs('https://livenode.pick500.net:60010/');
        } catch (error) {
            toast.error(error?.message);
        }
    };
    // Web socket
    const connectToWs = (address) => {
        const liveConnection = new HubConnectionBuilder()
            .withUrl(address + 'liveOddsHub')
            // .withUrl('https://livenode.pick500.net:60010/liveOddsHub')
            .withAutomaticReconnect()
            .build();

        liveConnection.on('onOddsUpdates', (message) => {
            const decompressedString = lzString.decompressFromUTF16(message);
            const updateObj = JSON.parse(decompressedString);

            if (updateObj.length) {
                updateObj.forEach((updateItem) => {
                    const foundEvent = liveStateRef.current[updateItem.Id];
                    if (foundEvent) {
                        const updatedMarkets = getUpdatedMarkets(updateItem, foundEvent.Markets);
                        dispatch(liveActions.updateEventMarkets({ matchId: updateItem.Id, markets: updatedMarkets }));
                        dispatch(betslipActions.updateLiveSlipOdds({ matchId: updateItem.Id, markets: updatedMarkets }));
                    } else {
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
                const eventsToAdd = getEventsToAdd(updateObj.A, liveStateRef.current, incompleteDataRef.current);

                eventsToAdd.add.forEach((eventToAdd) => {
                    dispatch(liveActions.addEvent(eventToAdd));
                });
                eventsToAdd.incomplete.forEach((eventIncomplete) => {
                    dispatch(liveActions.addIncomplete(eventIncomplete));
                });
            }

            if (updateObj.U) {
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

    return <div></div>;
};

export default LiveLoader;
