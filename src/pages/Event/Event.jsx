import { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import _ from 'lodash';
import { useMediaQuery } from 'react-responsive';

import classes from './Event.module.css';
import SportsBookMenu from '../SportsBook/features/SportsBookMenu';
import { getEvent, getLiveEvent } from './eventAsyncActions';
import { eventActions } from './eventSlice';
import Breadcrumb from './features/Breadcrumb';
import BreadcrumbLive from './features/BreadcrumbLive';
import MarketsMenu from './features/MarketsMenu';
import MarketGroup from './features/MarketGroup';
import Board from './features/Board';
import BarLoading from '../../features/UI/BarLoading/BarLoading';
import { appActions } from '../../features/InitApp/appSlice';
import lzString from 'lz-string';
import { getUpdatedMarkets } from '../../utils/liveUpdates';
import { translate, translateNameWithLang } from '../../utils/translations';
import { betslipActions } from '../../features/Betslip/betslipSlice';
import { layoutActions } from '../../features/Layout/layoutSlice';

const Event = () => {
    const dispatch = useDispatch();
    const eventRef = useRef(null);
    const { sportname, sportid, eventid } = useParams();

    const liveState = useSelector((state) => state.live.liveState);
    const liveConnection = useSelector((state) => state.live.liveConnection);
    const liveEvent = useSelector((state) => state.event.liveEvent);
    const selectedMarketCategory = useSelector((state) => state.event.selectedMarketCategory);
    const selectedMarketCategoryIndex = useSelector((state) => state.event.selectedMarketCategoryIndex);
    const changedMarkets = useSelector((state) => state.event.changedMarkets);

    const pregameEvent = useSelector((state) => state.event.event);
    const barLoading = useSelector((state) => state.app.barLoading);
    const eventIdInt = parseInt(eventid);
    const isLive = liveState[eventIdInt] ? true : false;

    const event = isLive ? liveEvent : pregameEvent;
    eventRef.current = event;

    const lang = useSelector((state) => state.app.lang); // Necessary for rerendering translations
    const sports = useSelector((state) => state.event.sports);
    const selectedSport = useSelector((state) => state.sportsbook.selectedSport);
    const sportsStatusParams = useSelector((state) => state.sportsbook.sportsStatusParams);

    const sportMarketTreeObj = useSelector((state) => state.event.sportMarketTreeObj);

    const [marketGroups, setMarketGroups] = useState(null);
    const [marketGroupsChanged, setMarketGroupsChanged] = useState(1);
    const [height, setHeight] = useState();

    const isMobile = useMediaQuery({ query: '(max-width: 768px)' });

    useEffect(() => {
        let handleResizeMessage = null;

        if (isLive) {
            // For the field
            handleResizeMessage = (event) => {
                if (event.origin === 'https://widget.feedmaker.live') {
                    const message = event.data ? JSON.parse(event.data) : null;
                    let h = message ? message['body-height'] : null;
                    h = h ? h : 330;
                    setHeight(h);
                }
            };
            window.addEventListener('message', handleResizeMessage);
        }

        return () => {
            if (handleResizeMessage) window.removeEventListener('message', handleResizeMessage);
            dispatch(eventActions.reset());
            dispatch(appActions.setBarLoading(false));
            dispatch(layoutActions.setShowLiveListContainer(false));

            if (liveConnection) {
                liveConnection.invoke('SubscribeToEvent', eventid, 0);
                liveConnection.invoke('UnSubscribeToEvent', eventid);
            }
        };
    }, []);

    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;

        const sportIdInt = parseInt(sportid);
        const eventIdInt = parseInt(eventid);

        if (isLive) {
            dispatch(getLiveEvent(sportIdInt, eventIdInt, signal));
            dispatch(eventActions.setShowingLiveEvent(true));
        } else {
            dispatch(getEvent(sportIdInt, eventIdInt, signal));
        }

        return () => {
            controller.abort();

            if (liveConnection) {
                liveConnection.invoke('SubscribeToEvent', eventid, 0);
                liveConnection.invoke('UnSubscribeToEvent', eventid);
            }
        };
    }, [eventid]);

    useEffect(() => {
        if (!isMobile && isLive) {
            dispatch(layoutActions.setShowLiveListContainer(true));
            dispatch(layoutActions.setFullLeftContainer(true));
        }
    }, [isMobile]);

    // If Live, subscribe to live event
    useEffect(() => {
        if (!isLive) return;
        if (!liveConnection) return;
        if (!eventid) return;

        //Subscribe
        liveConnection
            .invoke('SubscribeToEvent', eventid, eventid)
            .then(() => {
                console.log(`Subscribed to ${eventid}`);
            })
            .catch((err) => {
                console.error(`Subscription to ${eventid} failed :`, err);
            });

        liveConnection.on('onOddsUpdate', (message) => {
            const decompressedString = lzString.decompressFromUTF16(message);
            const updateObj = JSON.parse(decompressedString);
            handleOddsUpdate(updateObj);
        });
        liveConnection.on('onHeadersList', (message) => {
            const decompressedString = lzString.decompressFromUTF16(message);
            const updateObj = JSON.parse(decompressedString);
            const found = updateObj.find((e) => e.MatchId == eventid);
            if (found) {
                dispatch(eventActions.updateLiveEventHeader(found));
            }
        });
        // liveConnection.on('onOddsChangeFull', (message) => {
        //     const decompressedString = lzString.decompressFromUTF16(message);
        //     const updateObj = JSON.parse(decompressedString);
        // });

        return () => {
            liveConnection.off('onOddsUpdate');
            liveConnection.off('onHeadersList');
        };
    }, [isLive, liveConnection, eventid]);

    // Create the market groups, based on event markets
    useEffect(() => {
        if (!event) return;
        if (!event.Markets) return;
        if (!sportMarketTreeObj) return;

        let groupsObj = {};

        event.Markets.forEach((market) => {
            if (!sportMarketTreeObj[market.MarketTypeId]) {
                const groupIndex = 9999;
                groupsObj[groupIndex] = { Id: groupIndex, name: 'Other' };
            } else {
                sportMarketTreeObj[market.MarketTypeId].groups.forEach((group) => {
                    const groupName = group.name;
                    const groupIndex = group.groupIndex;
                    groupsObj[groupIndex] = { Id: groupIndex, name: groupName };
                });
            }
        });

        let groups = Object.values(groupsObj);
        groups.sort((a, b) => a.id - b.id);

        setMarketGroups(groups);
        setMarketGroupsChanged((prev) => prev + 1);
    }, [changedMarkets, sportMarketTreeObj]);

    // Update selected market group, if the showing market group is removed
    useEffect(() => {
        if (!marketGroups) return;
        if (!selectedMarketCategory) return;
        if (selectedMarketCategoryIndex === null) return;

        // const marketGroupExists = marketGroups.find((g) => g.Id === selectedMarketCategory.Id);
        const marketGroupExists = marketGroups[selectedMarketCategoryIndex];
        if (!marketGroupExists) {
            dispatch(eventActions.setSelectedMarketCategory(marketGroups[0]));
            dispatch(eventActions.setSelectedMarketCategoryIndex(0));
        }
    }, [marketGroupsChanged]);

    const getBackgroundImage = () => {
        if (!selectedSport) return null;

        const sportParams = sportsStatusParams[selectedSport.Name.International];
        if (sportParams && sportParams.fieldImage) return sportParams.fieldImage;
    };

    const handleOddsUpdate = (updateObj) => {
        if (!isLive) return;
        if (!updateObj) return;
        if (!eventRef.current) return;

        const updatedMarkets = getUpdatedMarkets(updateObj, eventRef.current.Markets);
        dispatch(eventActions.updateLiveMarkets(updatedMarkets));
        dispatch(betslipActions.updateLiveSlipOdds({ matchId: updateObj.Id, markets: updatedMarkets }));
    };

    return (
        <>
            <AnimatePresence>{barLoading && <BarLoading />}</AnimatePresence>

            <div className={classes.PageContent}>
                <div className={classes.Event}>
                    <div className={classes.MenuWrapper}>
                        <SportsBookMenu />
                    </div>

                    <div className={classes.Content}>
                        <div className={classes.TopArea}>
                            {sports &&
                                selectedSport &&
                                (isLive ? (
                                    <>
                                        <BreadcrumbLive event={event} page={isLive ? 'live' : 'home'} slice='event' />
                                        <div className={classes.Box} style={{ backgroundImage: `url(${getBackgroundImage()})` }}>
                                            {event && <Board event={event} />}
                                        </div>
                                    </>
                                ) : (
                                    <Breadcrumb page={isLive ? 'live' : 'home'} slice='event' />
                                ))}
                        </div>

                        {!event && !barLoading ? (
                            <span>{translate('Event not found or has ended')}</span>
                        ) : (
                            <div className={classes.EventPage}>
                                <h1 className={classes.EventTitle}>
                                    {event?.Info.AwayTeamName
                                        ? `${translateNameWithLang(event?.Info.HomeTeamName)} vs ${translateNameWithLang(event?.Info.AwayTeamName)}`
                                        : translateNameWithLang(event?.Info.HomeTeamName)}
                                </h1>

                                <aside className={isLive ? classes.Side : [classes.Side, classes.Pregame].join(' ')}>
                                    <div className={classes.EventTracker} style={height ? { height: height + 'px' } : null}>
                                        {event && isLive && (
                                            <iframe
                                                id='FMTracker'
                                                run='iLive.initTracker'
                                                src={`https://widget.feedmaker.live/?event=${event.MatchId}&amp;lang=${lang.id}`}
                                            />
                                        )}
                                        {event && !isLive && (
                                            <iframe
                                                src={`${import.meta.env.VITE_SPORTS_URL}/stats/stats.html?styles=#${lang.id}/external/page/h2h/${
                                                    event.Info.HomeTeamId
                                                }/${event.Info.AwayTeamId}`}
                                            />
                                        )}
                                    </div>
                                </aside>

                                {marketGroups && (
                                    <div className={classes.Main}>
                                        {marketGroups.length > 0 && <MarketsMenu marketGroups={marketGroups} />}

                                        <div>
                                            <MarketGroup marketGroups={marketGroups} event={event} marketGroupsChanged={marketGroupsChanged} />
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Event;
