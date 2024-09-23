import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import classes from './BreadcrumbLive.module.css';
import AngleDownIcon from '../../../assets/svgs/angle-down.svg?react';
import Arrow2LeftIcon from '../../../assets/svgs/arrow2-left.svg?react';
import Dropdown2 from '../../../features/UI/Dropdown/Dropdown2';
import { translateNameWithLang, translate } from '../../../utils/translations';
import TeamLogo from '../../../features/TeamLogo/TeamLogo';
import { getBreadcrumbData } from '../eventAsyncActions';
import { eventActions } from '../eventSlice';

const Breadcrumb = (props) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const lang = useSelector((state) => state.app.lang); // Necessary for rerendering translations
    const selectedSport = useSelector((state) => state.sportsbook.selectedSport);
    const sportPregameCategories = useSelector((state) => state.event.sportPregameCategories);
    const tournamentEvents = useSelector((state) => state.event.tournamentEvents);

    const [showCategories, setShowCategories] = useState(false);
    const [showEvents, setShowEvents] = useState(false);

    const [allCategories, setAllCategories] = useState([]);

    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedEvent, setSelectedEvent] = useState(null);

    const [firstLoad, setFirstLoad] = useState(true);

    useEffect(() => {
        if (!selectedSport?.Id) return;
        if (!props.event) return;

        setFirstLoad(true);
        setSelectedCategory({ CategoryId: props.event.Info.CategoryId, CategoryName: props.event.Info.CategoryName });
        setSelectedEvent(props.event.Info);

        const controller = new AbortController();
        const signal = controller.signal;

        const isOutright = props.slice === 'outrights' ? true : false;
        dispatch(getBreadcrumbData(selectedSport.Id, props.event.Info.CategoryId, props.event.Info.TournamentId, isOutright, signal));

        return () => {
            controller.abort();
            dispatch(eventActions.setSportPregameCategories(null));
        };
    }, [selectedSport?.Id]);

    useEffect(() => {
        if (!props.event) return;
        if (!sportPregameCategories) return;

        let categories = [];

        sportPregameCategories.forEach((category) => {
            if (category.Tournaments.length === 0) return;

            const outrightsTournaments = category.Tournaments.filter(
                (t) => t.Name.International.includes('Outright') || t.Name.International.includes('Specials')
            );
            if (outrightsTournaments.length) {
                categories.push({ CategoryId: category.Id, CategoryName: category.Name });
            }
        });

        categories.sort((a, b) => a.CategoryName.International.localeCompare(b.CategoryName.International));

        setAllCategories(categories);
        setFirstLoad(false);
    }, [sportPregameCategories]);

    useEffect(() => {
        if (!selectedCategory) return;
        if (firstLoad) {
            setFirstLoad(false);
            return;
        }
        setSelectedEvent(null);
        const controller = new AbortController();
        const signal = controller.signal;

        dispatch(getBreadcrumbData(selectedSport.Id, selectedCategory.CategoryId, null, true, signal));

        setShowCategories(false);
    }, [selectedCategory?.CategoryId]);

    return (
        <div className={classes.Breadcrumb}>
            <div className={[classes.Crumb, classes.BackButton].join(' ')} onClick={() => navigate(`/sportsbook/${props.page}/${selectedSport.slug}`)}>
                <Arrow2LeftIcon className={classes.BackIcon} />
                {translate('Back')}
            </div>

            <div className={showCategories ? [classes.NoPaddingCrumb, classes.DropdownOpen].join(' ') : classes.NoPaddingCrumb}>
                <div className={classes.Crumb} onClick={() => setShowCategories(!showCategories)}>
                    <div className={classes.SportIcon}>{selectedSport?.icon}</div>
                    <div className={classes.SportName}>{translateNameWithLang(selectedCategory?.CategoryName)}</div>
                    <AngleDownIcon className={classes.ArrowIcon} />
                </div>

                <AnimatePresence>
                    {showCategories && (
                        <Dropdown2 onClickOutside={() => setShowCategories(false)}>
                            <div className={classes.DropdownMenu}>
                                {allCategories?.map((category) => {
                                    return (
                                        <div
                                            key={category.CategoryId}
                                            className={
                                                selectedCategory.CategoryId === category.CategoryId
                                                    ? [classes.DropdownItem, classes.Active].join(' ')
                                                    : classes.DropdownItem
                                            }
                                            onClick={() => setSelectedCategory(category)}
                                        >
                                            <div className={classes.SportItemIcon}>{selectedSport?.icon}</div>
                                            <div className={classes.SportItemName}>{translateNameWithLang(category.CategoryName)}</div>
                                        </div>
                                    );
                                })}
                            </div>
                        </Dropdown2>
                    )}
                </AnimatePresence>
            </div>

            <div className={showEvents ? [classes.NoPaddingCrumb, classes.DropdownOpen].join(' ') : classes.NoPaddingCrumb}>
                <div className={classes.Crumb} onClick={() => setShowEvents(!showEvents)}>
                    {selectedEvent ? (
                        <div className={classes.TeamsContainer}>
                            <div className={classes.TeamsContainer}>
                                <TeamLogo teamId={selectedEvent?.HomeTeamId} isHome={true} sportName={selectedEvent?.SportName.International} />
                                <div className={[classes.TeamName, classes.First, classes.Second, classes.Outright].join(' ')}>
                                    {translateNameWithLang(selectedEvent?.HomeTeamName)}
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className={classes.SportName}>{translate('Match')}</div>
                    )}

                    <AngleDownIcon className={classes.ArrowIcon} />
                </div>

                <AnimatePresence>
                    {showEvents && (
                        <Dropdown2 onClickOutside={() => setShowEvents(false)}>
                            <div className={classes.DropdownMenu}>
                                {tournamentEvents?.map((event) => {
                                    return (
                                        <Link
                                            key={event.MatchId}
                                            className={
                                                selectedEvent?.MatchId === event.Info.MatchId
                                                    ? [classes.DropdownItem, classes.Active].join(' ')
                                                    : classes.DropdownItem
                                            }
                                            to={`/sportsbook/outrights/${event.Info.SportName.International.toLowerCase().replace(/ /g, '-')}/${
                                                event.Info.SportId
                                            }/${event.Info.CategoryId}/${event.Info.TournamentId}/${event.MatchId}`}
                                            onClick={() => {
                                                setSelectedEvent(event.Info);
                                                setShowEvents(false);
                                            }}
                                        >
                                            <div className={classes.TeamsContainer}>
                                                <div className={classes.TeamsContainer}>
                                                    <TeamLogo teamId={event.Info.HomeTeamId} isHome={true} sportName={event.Info.SportName.International} />
                                                    <div className={[classes.TeamName, classes.First, classes.Second, classes.Outright].join(' ')}>
                                                        {translateNameWithLang(event.Info.HomeTeamName)}
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    );
                                })}
                            </div>
                        </Dropdown2>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default Breadcrumb;
