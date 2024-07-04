import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import classes from './SportsHome.module.css';
import SportSelection from '../features/SportSelection';
import TournamentSearch from '../features/TournamentSearch';
import TournamentSort from '../features/TournamentSort';
import { sportsbookActions } from '../sportsbookSlice';
import { sportsOutrightsActions } from '../subpages/sportsOutrightsSlice';
import { getPregameData } from '../sportsbookAsyncActions';
import { getSportMarketTree } from '../sportsbookAsyncActions';
import ShimmerIcon from '../../../features/UI/Shimmer/shimmer.svg?react';
import OutrightCategory from '../features/OutrightCategory';
import OutrightCategoriesTournaments from '../features/OutrightCategoriesTournaments';
import { translate } from '../../../utils/translations';

const SportsOutrights = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const params = useParams();

    const lang = useSelector((state) => state.app.lang); // Necessary for rerendering translations
    const topLeagues = useSelector((state) => state.sportsbook.topLeagues);
    const tournamentSearchString = useSelector((state) => state.sportsbook.tournamentSearchString);
    const categories = useSelector((state) => state.sportsOutrights.categories);
    const sports = useSelector((state) => state.sportsbook.sports);
    const allSports = useSelector((state) => state.app.allSports);
    const selectedSport = useSelector((state) => state.sportsbook.selectedSport);
    const sportIcons = useSelector((state) => state.app.sportIcons);
    const sportMarketTree = useSelector((state) => state.sportsbook.sportMarketTree);

    const sportsWithCategories = ['Football', 'Tennis'];
    const sportParam = params['*'].split('/')[1];

    const [categoriesArr, setCategoriesArr] = useState(null);
    const [loadingCategories, setLoadingCategories] = useState(true);
    const [axiosController, setAxiosController] = useState(null);

    useEffect(() => {
        dispatch(sportsbookActions.setSelectedSport(null));
        dispatch(sportsbookActions.setSports(null));

        const controller = new AbortController();
        const signal = controller.signal;
        setAxiosController(controller);
        dispatch(getPregameData(sportIcons, signal, true));

        return () => {
            controller.abort();
            dispatch(sportsOutrightsActions.reset());
        };
    }, []);

    // Get the selected sport from the params
    useEffect(() => {
        if (!sports) return;

        // If did not come from the sportsMenu, select the first sport
        let sport;
        if (!sportParam) {
            sport = sports[0];
            navigate(`/sportsbook/outrights/${sport.Name?.International.toLowerCase().replace(/ /g, '-')}`, { replace: true });
        } else sport = sports.find((s) => s.slug === sportParam);

        if (!sport) sport = allSports.find((s) => s.slug === sportParam);

        dispatch(sportsbookActions.setSelectedSport(sport));
    }, [sports?.length, sportParam]);

    useEffect(() => {
        if (!selectedSport) return;
        if (!topLeagues) return;
        if (!axiosController) return;

        if (!sportMarketTree[selectedSport.Id]) dispatch(getSportMarketTree(selectedSport.Id, axiosController.signal));

        setLoadingCategories(true);

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

        selectedSport?.Categories?.forEach((category) => {
            //if (category.Counters['5D'] === 0) return; // Don't add categories which don't have any game (5D is the max Counters)

            const isPopular = topCategories.includes(category.Id);
            const isPopularIndex = topCategories.indexOf(category.Id);

            let updatedTournaments = [];

            category.Tournaments.forEach((tournament) => {
                if (!tournament.Name.International.includes('Outright')) return; // Add only outright here

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

        // Sort categories
        ca.sort((a, b) => {
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

        dispatch(sportsOutrightsActions.setCategories(ca));

        const subset = getSubset(ca);

        setCategoriesArr(subset);

        setLoadingCategories(false);
    }, [selectedSport?.Id, topLeagues, axiosController]);

    useEffect(() => {
        if (!selectedSport) return;
        if (!categories) return;

        const subset = getSubset(categories);
        setCategoriesArr(subset);
    }, [tournamentSearchString]);

    const getSubset = (ca) => {
        let updatedCategories = [];

        if (!tournamentSearchString) updatedCategories = ca;
        else {
            ca.forEach((category) => {
                let updatedCategory = { ...category };
                let categoryTournaments = updatedCategory.Tournaments;

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

    return (
        <>
            <SportSelection
                items={sports}
                selectedSport={selectedSport}
                onSelectSport={(sport) => {
                    dispatch(sportsbookActions.setSelectedSport(sport));
                    navigate(`/sportsbook/outrights/${sport.slug}`);
                }}
            />

            <div className={classes.TopRowWrapper}>
                <div className={classes.Grouped}>
                    {selectedSport?.Name.International !== 'Football' && <TournamentSort />}
                    <TournamentSearch withMargin={selectedSport?.Name.International !== 'Football'} />
                </div>
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
                                        <OutrightCategory
                                            key={category.Id}
                                            category={category}
                                            initOpen={catIndex === 0}
                                            slice='sportsOutrights'
                                            includePregame
                                        />
                                    ))
                            ) : (
                                <OutrightCategoriesTournaments categories={categoriesArr.filter((c) => c.IsPopular)} slice='sportsOutrights' />
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
                                        <OutrightCategory key={category.Id} category={category} initOpen={catIndex === 0} slice='sportsOutrights' />
                                    ))
                            ) : (
                                <OutrightCategoriesTournaments categories={categoriesArr.filter((c) => !c.IsPopular)} slice='sportsOutrights' />
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

export default SportsOutrights;
