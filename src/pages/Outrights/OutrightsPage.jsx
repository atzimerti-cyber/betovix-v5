import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import classes from './OutrightsPage.module.css';
import SportsBookMenu from '../SportsBook/features/SportsBookMenu';
import Breadcrumb from '../Event/features/Breadcrumb';
import { outrightsActions } from './outrightsSlice';
import { getEvent } from './outrightsAsyncActions';
import MarketsMenu from './features/MarketsMenu';
import OutrightsMarket from './features/OutrightsMarket';
import InfoCircleIcon from '../../assets/svgs/info-circle.svg?react';
import { translate, translateNameWithLang } from '../../utils/translations';

const OutrightsPage = () => {
    const dispatch = useDispatch();

    const { sportname, sportid, categoryid, tournamentid, eventid } = useParams();

    const lang = useSelector((state) => state.app.lang); // Necessary for rerendering translations
    const selectedSport = useSelector((state) => state.sportsbook.selectedSport);
    const sports = useSelector((state) => state.outrights.sports);
    const sportsStatusParams = useSelector((state) => state.sportsbook.sportsStatusParams);
    const event = useSelector((state) => state.outrights.event);
    const selectedMarketCategory = useSelector((state) => state.outrights.selectedMarketCategory);

    const [sortedMarkets, setSortedMarkets] = useState(null);

    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;

        const sportIdInt = parseInt(sportid);
        const eventIdInt = parseInt(eventid);

        dispatch(getEvent(sportIdInt, eventIdInt, signal));

        return () => {
            controller.abort();
            dispatch(outrightsActions.reset());
        };
    }, []);

    useEffect(() => {
        if (!event) return;

        let sm = [];
        event.Markets.forEach((market) => {
            sm.push({ Id: market.MarketId, name: translateNameWithLang(market.MarketName) });
        });

        sm.sort((a, b) => a.Id - b.Id); // a.name.localeCompare(b.name));
        setSortedMarkets(sm);
    }, [event]);

    const getBackgroundImage = () => {
        if (!selectedSport) return null;

        const sportParams = sportsStatusParams[selectedSport.Name.International];
        if (sportParams && sportParams.fieldImage) return sportParams.fieldImage;
    };

    const getCategoryName = () => {
        if (!event) return '';
        let name = translateNameWithLang(event.Info.TournamentName);
        name = name.split('. Outright')[0];

        // const name = event.Info.TournamentName.International.split('. Outright')[0];
        return name;
    };

    const getMarket = () => {
        if (!event) return null;
        if (!selectedMarketCategory) return null;

        const market = event?.Markets.find((m) => m.MarketId === selectedMarketCategory.Id);

        return market;
    };

    return (
        <div className={classes.PageContent}>
            <div className={classes.Event}>
                <div className={classes.MenuWrapper}>
                    <SportsBookMenu />
                </div>

                <div className={classes.Content}>
                    <div className={classes.TopArea}>
                        {sports && selectedSport && (
                            <>
                                <Breadcrumb page='outrights' slice='outrights' />
                                <div className={classes.Box} style={{ backgroundImage: `url(${getBackgroundImage()})` }}>
                                    <div className={classes.OutrightsTitle}>{getCategoryName()}</div>
                                </div>
                            </>
                        )}
                    </div>

                    <div className={classes.EventArea}>
                        <div className={classes.Main}>
                            <div className={classes.MarketCollection}>
                                <div className={classes.Container}>
                                    {sortedMarkets && sortedMarkets.length > 0 && <MarketsMenu marketGroups={sortedMarkets} />}
                                </div>

                                <div className={classes.OutrightsInfo}>
                                    <InfoCircleIcon />
                                    {translate('Please note, some markets may not be combinable with others and as a result will be Singles only.')}
                                </div>

                                <div>
                                    <OutrightsMarket event={event} market={getMarket()} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OutrightsPage;
