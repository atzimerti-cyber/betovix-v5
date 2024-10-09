import { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import _ from 'lodash';

import classes from './SportsHome.module.css';
import { sportsbookActions } from '../sportsbookSlice';
import { sportsUpcomingActions } from '../subpages/sportsUpcomingSlice';
import { getPregameData } from '../sportsbookAsyncActions';
import SportSelection from '../features/SportSelection';
import TournamentSearch from '../features/TournamentSearch';
import TournamentTimeSelection from '../features/TournamentTimeSelection';
import TournamentSort from '../features/TournamentSort';
import ShimmerIcon from '../../../features/UI/Shimmer/shimmer.svg?react';
import Category from '../features/Category';
import { getSportMarketTree } from '../sportsbookAsyncActions';
import { translate } from '../../../utils/translations';

const SportsUpcoming = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const params = useParams();

    const lang = useSelector((state) => state.app.lang); // Necessary for rerendering translations
    const tournamentSearchString = useSelector((state) => state.sportsbook.tournamentSearchString);
    const tournamentTimeFilter = useSelector((state) => state.sportsbook.tournamentTimeFilter);
    const sportMarketTree = useSelector((state) => state.sportsbook.sportMarketTree);
    const sportIcons = useSelector((state) => state.app.sportIcons);
    const sportSettings = useSelector((state) => state.app.sportSettings);
    const tournamentSort = useSelector((state) => state.sportsbook.tournamentSort);

    const categories = useSelector((state) => state.sportsUpcoming.categories);
    const sports = useSelector((state) => state.sportsbook.sports);
    const allSports = useSelector((state) => state.app.allSports);
    const selectedSport = useSelector((state) => state.sportsbook.selectedSport);

    const [categoriesArr, setCategoriesArr] = useState(null);
    const [loadingCategories, setLoadingCategories] = useState(true);
    const [axiosController, setAxiosController] = useState(null);

    const sportParam = params['*'].split('/')[1];

    const timePriority = useMemo(() => {
        return { '3H': 1, '6H': 2, '9H': 3, '12H': 4, '2D': 5, '3D': 6, '4D': 7, '5D': 8 };
    }, []);

    useEffect(() => {
        dispatch(sportsbookActions.setSelectedSport(null));
        dispatch(sportsbookActions.setSports(null));

        const controller = new AbortController();
        const signal = controller.signal;
        setAxiosController(controller);
        dispatch(getPregameData(sportIcons, signal));

        return () => {
            controller.abort();
            dispatch(sportsUpcomingActions.reset());
        };
    }, []);

    // Get the selected sport from the params
    useEffect(() => {
        if (!sports) return;

        // If did not come from the sportsMenu, select the first sport
        let sport;
        if (!sportParam) {
            sport = sports[0];
            navigate(`/sportsbook/upcoming/${sport.Name?.International.toLowerCase().replace(/ /g, '-')}`, { replace: true });
        } else sport = sports.find((s) => s.slug === sportParam);

        if (!sport) sport = allSports.find((s) => s.slug === sportParam);

        dispatch(sportsbookActions.setSelectedSport(sport));
    }, [sports?.length, sportParam]);

    useEffect(() => {
        if (!selectedSport) return;
        if (!axiosController) return;

        if (!sportMarketTree[selectedSport.Id]) dispatch(getSportMarketTree(selectedSport.Id, axiosController.signal));

        // Check timeframe and get the first timeframe which has events
        const closestTimeframe = findClosestTimeframe();
        dispatch(sportsbookActions.setTournamentTimeFilter(closestTimeframe));

        setLoadingCategories(true);

        let ca = [];

        selectedSport?.Categories?.forEach((category) => {
            // if (category.Counters['5D'] === 0) return; // Don't add categories which don't have any game (5D is the max Counters)

            let updatedTournaments = [];

            category.Tournaments.forEach((tournament) => {
                // if (tournament.Counters['5D'] === 0) return; // Don't add categories which don't have any game (5D is the max Counters)
                if (tournament.Name.International.includes('Outright') || tournament.Name.International.includes('Specials')) return; // Don' add outright here

                let updatedTournament = { ...tournament };
                updatedTournament.CategoryId = category.Id;
                updatedTournament.CategoryName = category.Name;
                updatedTournament.CategoryCounters = category.Counters;
                updatedTournaments.push(updatedTournament);
            });

            if (updatedTournaments.length) {
                ca.push({
                    ...category,
                    Tournaments: updatedTournaments,
                });
            }
        });

        dispatch(sportsUpcomingActions.setCategories(ca));

        const subset = getSubset(ca, closestTimeframe);
        const sorted = getSorted(subset);

        setCategoriesArr(sorted);

        setLoadingCategories(false);
    }, [selectedSport?.Id, axiosController]);

    useEffect(() => {
        if (!selectedSport) return;
        if (!categories) return;

        const subset = getSubset(categories, tournamentTimeFilter);
        const sorted = getSorted(subset);
        setCategoriesArr(sorted);
    }, [tournamentSearchString, tournamentTimeFilter]);

    const getSubset = (ca, counter) => {
        let updatedCategories = [];

        if (!tournamentSearchString && counter === 'All') updatedCategories = ca;
        else {
            ca.forEach((category) => {
                let updatedCategory = { ...category };
                let categoryTournaments = updatedCategory.Tournaments;

                // If there is a time filter, don't add the categories which have no events during the time period
                if (counter !== 'All' && category.Counters[counter] === 0) return;
                else if (counter !== 'All' && category.Counters[counter] > 0) {
                    categoryTournaments = updatedCategory.Tournaments.filter((t) => t.Counters[counter] > 0);
                }

                // If there is a search string, don't add the categories which their name does not include the string and they have no tournaments including the string
                if (tournamentSearchString) {
                    const categoryNameLower = category.Name.International.toLowerCase();
                    const searchStringLower = tournamentSearchString.toLowerCase();

                    const tournamentsWithSearchString = updatedCategory.Tournaments.filter((t) =>
                        t.Name.International.toLowerCase().includes(searchStringLower)
                    );

                    // Neither category nor tournament with this string
                    if (!categoryNameLower.includes(searchStringLower) && !tournamentsWithSearchString.length) return;
                    // Only tournaments with this string. Include only these tournaments
                    else if (!categoryNameLower.includes(searchStringLower) && tournamentsWithSearchString.length > 0)
                        categoryTournaments = tournamentsWithSearchString;
                }

                updatedCategory.Tournaments = categoryTournaments;
                updatedCategories.push(updatedCategory);
            });
        }

        return updatedCategories;
    };

    const findClosestTimeframe = () => {
        let closestTimeframe = 'All';
        closestTimeframe = Object.keys(selectedSport.Counters).reduce((closest, current) => {
            if (selectedSport.Counters[current] === 0) return closest;
            return timePriority[current] < timePriority[closest] || !closest ? current : closest;
        });

        if (!closestTimeframe || closestTimeframe.endsWith('D')) return 'All';

        return closestTimeframe;
    };

    const getSorted = (subset) => {
        let ca = _.cloneDeep(subset);
        if (tournamentSort === 'Default Sort') {
            const categsOrder = sportSettings.CategsOrder;

            ca.sort((a, b) => {
                // Check if is in tours order first
                if (categsOrder[a.Id] && categsOrder[a.Id] < 9999 && !categsOrder[b.Id]) {
                    return -1; // a comes first
                } else if (categsOrder[b.Id] && categsOrder[b.Id] < 9999 && !categsOrder[a.Id]) {
                    return 1; // b comes first
                } else if (categsOrder[a.Id] && categsOrder[a.Id] < 9999 && categsOrder[b.Id] && categsOrder[b.Id] < 9999) {
                    // Both have order, sort by order
                    return categsOrder[a.Id] - categsOrder[b.Id];
                } else {
                    // Neither has order, sort alphabetically
                    return a.Name.International.localeCompare(b.Name.International);
                }
            });
        } else if (tournamentSort === 'A - Z') ca.sort((a, b) => a.Name.International.localeCompare(b.Name.International));
        else if (tournamentSort === 'Z - A') ca.sort((a, b) => b.Name.International.localeCompare(a.Name.International));

        return ca;
    };

    useEffect(() => {
        if (!categoriesArr) return;
        if (!categoriesArr.length) return;

        let ca = getSorted(categoriesArr);

        setCategoriesArr(ca);
    }, [categoriesArr?.length, tournamentSort]);

    return (
        <>
            <SportSelection
                items={sports}
                selectedSport={selectedSport}
                onSelectSport={(sport) => {
                    dispatch(sportsbookActions.setSelectedSport(sport));
                    navigate(`/sportsbook/upcoming/${sport.slug}`);
                }}
            />

            <div className={classes.TopRowWrapper}>
                <div className={classes.Grouped}>
                    {selectedSport?.Name.International !== 'Football' && <TournamentSort />}
                    <TournamentSearch withMargin={selectedSport?.Name.International !== 'Football'} />
                </div>

                <TournamentTimeSelection />
            </div>

            <div className={classes.TournamentGroup}>
                {selectedSport && !loadingCategories ? (
                    categoriesArr.length === 0 ? (
                        <span className={classes.NoGames}>{translate('No games where found.')}</span>
                    ) : (
                        categoriesArr.map((category, catIndex) => (
                            <Category key={category.Id} category={category} initOpen={catIndex === 0} slice='sportsUpcoming' includePregame />
                        ))
                    )
                ) : (
                    <>
                        <ShimmerIcon className={classes.ShimmerIcon} />
                        <ShimmerIcon className={classes.ShimmerIcon} />
                        <ShimmerIcon className={classes.ShimmerIcon} />
                    </>
                )}
            </div>
        </>
    );
};

export default SportsUpcoming;
