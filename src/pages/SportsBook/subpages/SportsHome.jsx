import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import classes from './SportsHome.module.css';
import { sportsbookActions } from '../sportsbookSlice';
import { sportsHomeActions } from '../subpages/sportsHomeSlice';
import { getPregameData, getLiveStreams } from '../sportsbookAsyncActions';
import SportSelection from '../features/SportSelection';
import TournamentSearch from '../features/TournamentSearch';
import TournamentTimeSelection from '../features/TournamentTimeSelection';
import TournamentSort from '../features/TournamentSort';
import ShimmerIcon from '../../../features/UI/Shimmer/shimmer.svg?react';
import Category from '../features/Category';
import CategoriesTournaments from '../features/CategoriesTournaments';
import { getSportMarketTree } from '../sportsbookAsyncActions';
import { translate } from '../../../utils/translations';

const SportsHome = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const params = useParams();

    const lang = useSelector((state) => state.app.lang); // Necessary for rerendering translations
    const liveState = useSelector((state) => state.live.liveState);
    const addedRemovedEvent = useSelector((state) => state.live.addedRemovedEvent);
    const topLeagues = useSelector((state) => state.sportsbook.topLeagues);
    const tournamentSearchString = useSelector((state) => state.sportsbook.tournamentSearchString);
    const tournamentTimeFilter = useSelector((state) => state.sportsbook.tournamentTimeFilter);
    const sportMarketTree = useSelector((state) => state.sportsbook.sportMarketTree);
    const sportIcons = useSelector((state) => state.app.sportIcons);

    const categories = useSelector((state) => state.sportsHome.categories);
    const sports = useSelector((state) => state.sportsbook.sports);
    const selectedSport = useSelector((state) => state.sportsbook.selectedSport);

    const [categoriesArr, setCategoriesArr] = useState(null);
    const [loadingCategories, setLoadingCategories] = useState(true);
    const [axiosController, setAxiosController] = useState(null);

    const sportsWithCategories = ['Football', 'Tennis'];
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

        dispatch(sportsbookActions.setTournamentTimeFilter('All'));
        dispatch(getPregameData(sportIcons, signal));
        dispatch(getLiveStreams(signal));

        // Reget the live streams every 1 minute
        const pollingCallback = () => {
            dispatch(getLiveStreams(signal));
        };
        const getLiveStreamsInterval = setInterval(pollingCallback, 60000);

        return () => {
            controller.abort();
            if (getLiveStreamsInterval) clearInterval(getLiveStreamsInterval);
            dispatch(sportsHomeActions.reset());
        };
    }, []);

    // Get the selected sport from the params
    useEffect(() => {
        if (!sports) return;

        // If did not come from the sportsMenu, select the first sport
        let sport;
        if (!sportParam || sportParam === 'undefined') {
            sport = sports[0];
            navigate(`/sportsbook/home/${sport.Name?.International.toLowerCase().replace(/ /g, '-')}`, { replace: true });
        } else sport = sports.find((s) => s.slug === sportParam);

        dispatch(sportsbookActions.setSelectedSport(sport));
    }, [sports?.length, sportParam]);

    // Get the categories and Tournaments
    useEffect(() => {
        if (!selectedSport) return;
        if (!topLeagues) return;
        if (!axiosController) return;

        if (!sportMarketTree[selectedSport.Id]) dispatch(getSportMarketTree(selectedSport.Id, axiosController.signal));

        // Check timeframe and get the first timeframe which has events
        let closestTimeframe = 'All';
        if (tournamentTimeFilter !== 'All') {
            closestTimeframe = findClosestTimeframe();
            dispatch(sportsbookActions.setTournamentTimeFilter(closestTimeframe));
        }

        setLoadingCategories(true);

        setCategoriesAndTournaments(closestTimeframe);

        setLoadingCategories(false);
    }, [selectedSport?.Id, topLeagues, axiosController]);

    // If a live event was added or removed re-evaluate the categories and tournaments (run after the initial categories where loaded)
    useEffect(() => {
        if (loadingCategories) return;

        setCategoriesAndTournaments(tournamentTimeFilter);
    }, [loadingCategories, addedRemovedEvent]);

    const setCategoriesAndTournaments = (closestTimeframe) => {
        let ca = [];

        const topLeaguesForSport = topLeagues.SubCategs.find((t) => t.SubCateg.Name === selectedSport.Name.International);
        let topCategories = [];
        if (topLeaguesForSport) {
            topCategories = topLeaguesForSport.Items.map((item) => {
                const itemValuesArr = item.Value.split(',');
                const categoryId = parseInt(itemValuesArr[1]);
                return categoryId;
            });
        }

        selectedSport.Categories.forEach((category) => {
            if (category.Counters['5D'] === 0) return; // Don't add categories which don't have any game (5D is the max Counters)

            const isPopular = topCategories.includes(category.Id);
            const isPopularIndex = topCategories.indexOf(category.Id);

            let updatedTournaments = [];

            category.Tournaments.forEach((tournament) => {
                if (tournament.Counters['5D'] === 0) return; // Don't add categories which don't have any game (5D is the max Counters)
                if (tournament.Name.International.includes('Outright')) return; // Don' add outright here

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
                    IsPopular: isPopular,
                    IsPopularIndex: isPopularIndex,
                });
            }
        });

        // Add categories and tournaments in live, that are not in pregame
        let withLiveCategories = addLiveCategories(ca, topCategories);

        // Sort categories
        withLiveCategories.sort((a, b) => {
            // Check the IsPopular flag first
            if (a.IsPopular && !b.IsPopular) {
                return -1; // a comes first if a is popular and b is not
            } else if (!a.IsPopular && b.IsPopular) {
                return 1; // b comes first if b is popular and a is not
            } else if (a.IsPopular && b.IsPopular) {
                // Both are popular, sort by IndexOf
                return a.IsPopularIndex - b.IsPopularIndex;
            } else if (selectedSport.Name.International === 'Football') {
                // Neither is popular, if football, sort by Name
                return a.Name.International.localeCompare(b.Name.International);
            } else {
                // Neither is popular, if not football sort by id
                return a.Id - b.Id;
            }
        });

        dispatch(sportsHomeActions.setCategories(withLiveCategories));

        const subset = getSubset(withLiveCategories, closestTimeframe);

        setCategoriesArr(subset);
    };

    const addLiveCategories = (ca, topCategories) => {
        let newCategories = [];

        Object.values(liveState).forEach((event) => {
            const { CategoryId, TournamentId, TournamentName, CategoryName, SportId } = event.Info;
            if (SportId !== selectedSport.Id) return;

            const newTournament = {
                CategoryCounters: { '3H': 1 },
                CategoryId: CategoryId,
                CategoryName: CategoryName,
                Count: 0,
                Counters: { '3H': 1 },
                Id: TournamentId,
                Name: TournamentName,
                Tags: '',
            };

            let foundCategory = ca.find((category) => category.Id === CategoryId);
            if (!foundCategory) foundCategory = newCategories.find((category) => category.Id === CategoryId);

            if (!foundCategory) {
                const isPopular = topCategories.includes(CategoryId);
                const isPopularIndex = topCategories.indexOf(CategoryId);

                newCategories.push({
                    Count: 0,
                    Counters: { '3H': 1 },
                    Id: CategoryId,
                    IsPopular: isPopular,
                    IsPopularIndex: isPopularIndex,
                    Name: CategoryName,
                    Tags: '',
                    Tournaments: [newTournament],
                });
            } else {
                // If Category found but Tournament not found, add Tournament to existing Category
                let foundTournament = foundCategory.Tournaments.find((tournament) => tournament.Id === TournamentId);

                if (!foundTournament) {
                    foundCategory.Tournaments.push(newTournament);
                }
            }
        });

        // Combine original Categories with newCategories
        const updatedCategories = ca.concat(newCategories);

        return updatedCategories;
    };

    // Update categories and tournaments when time or search is changed
    useEffect(() => {
        if (!selectedSport) return;
        if (!categories) return;

        const subset = getSubset(categories, tournamentTimeFilter);
        setCategoriesArr(subset);
    }, [tournamentSearchString, tournamentTimeFilter]);

    // Get subset of categories and tournaments, based on searchString and time
    const getSubset = (ca, counter) => {
        if (!tournamentSearchString && counter === 'All') return ca;
        else {
            let updatedCategories = [];

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

            return updatedCategories;
        }
    };

    // Find the closest timeframe which has events
    const findClosestTimeframe = () => {
        let closestTimeframe = 'All';
        closestTimeframe = Object.keys(selectedSport.Counters).reduce((closest, current) => {
            if (selectedSport.Counters[current] === 0) return closest;
            return timePriority[current] < timePriority[closest] || !closest ? current : closest;
        });

        if (!closestTimeframe || closestTimeframe.endsWith('D')) return 'All';

        return closestTimeframe;
    };

    return (
        <>
            <SportSelection
                items={sports}
                selectedSport={selectedSport}
                onSelectSport={(sport) => {
                    dispatch(sportsbookActions.setSelectedSport(sport));
                    navigate(`/sportsbook/home/${sport.slug}`);
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
                        <>
                            {categoriesArr.filter((c) => c.IsPopular).length > 0 && selectedSport?.Name.International === 'Football' && (
                                <h3 className={classes.SectionGroupTitle}>
                                    <span className={classes.SectionGroupText}>{translate('Popular')}</span>
                                </h3>
                            )}
                            {sportsWithCategories.includes(selectedSport.Name.International) ? (
                                categoriesArr
                                    .filter((c) => c.IsPopular)
                                    .map((category, catIndex) => (
                                        <Category
                                            key={category.Id}
                                            category={category}
                                            initOpen={catIndex === 0}
                                            slice='sportsHome'
                                            includePregame
                                            includeLive
                                        />
                                    ))
                            ) : (
                                <CategoriesTournaments categories={categoriesArr.filter((c) => c.IsPopular)} slice='sportsHome' includePregame includeLive />
                            )}

                            {categoriesArr.filter((c) => !c.IsPopular).length > 0 && selectedSport?.Name.International === 'Football' && (
                                <h3 className={classes.SectionGroupTitle}>
                                    <span className={classes.SectionGroupText}>{translate('Alphabetical')}</span>
                                </h3>
                            )}
                            {sportsWithCategories.includes(selectedSport.Name.International) ? (
                                categoriesArr
                                    .filter((c) => !c.IsPopular)
                                    .map((category, catIndex) => (
                                        <Category
                                            key={category.Id}
                                            category={category}
                                            initOpen={catIndex === 0}
                                            slice='sportsHome'
                                            includePregame
                                            includeLive
                                        />
                                    ))
                            ) : (
                                <CategoriesTournaments categories={categoriesArr.filter((c) => !c.IsPopular)} slice='sportsHome' includePregame includeLive />
                            )}
                        </>
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

export default SportsHome;
