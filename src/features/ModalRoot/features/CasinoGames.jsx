import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import classes from './CasinoGames.module.css';
import CasinoGameCard from './CasinoGameCard';
import SkeletonGameCardRow from '../../UI/Skeletons/SkeletonGameCardRow';
import diceAnimation from '../../../assets/images/dice_animation_2.webp';
import MainButton from '../../UI/Buttons/MainButton';
import { loadMoreSearch } from '../../../pages/Search/searchAsyncActions';

const CasinoGames = (props) => {
    const dispatch = useDispatch();

    const moreLoading = useSelector((state) => state.search.moreLoading);

    const [axiosController, setAxiosController] = useState(null);

    useEffect(() => {
        return () => {
            if (axiosController) axiosController.abort();
        };
    }, [axiosController]);

    const addToGames = () => {
        if (axiosController) axiosController.abort();

        const controller = new AbortController();
        const signal = controller.signal;
        setAxiosController(controller);

        dispatch(loadMoreSearch(signal, 24, [], props.searchString, 'Default'));
    };

    return (
        <div className={classes.ResultsContainer}>
            {(props.collection?.Total > 0 || props.loading) && (
                <p className={classes.CategoryTitle}>{props.searchString === '' ? 'Slot Games' : 'Search results'}</p>
            )}

            <ul className={classes.CardsContainer}>
                {props.collection?.Data.map((game) => {
                    return <CasinoGameCard key={game.Data.Id} game={game} />;
                })}

                {props.loading || props.collection === null || moreLoading
                    ? Array.from({ length: 10 }, (_, index) => <SkeletonGameCardRow key={index} />)
                    : null}
            </ul>

            {props.collection?.Total === 0 && (
                <p className={classes.NoResults}>{props.searchString ? `No results with '${props.searchString}'` : 'No results'}</p>
            )}

            {props.searchString !== '' && props.collection?.Total > props.collection?.Data.length && (
                <div className={classes.LoadMore}>
                    {moreLoading ? (
                        <img src={diceAnimation} className={classes.MoreLoadingAnimation}></img>
                    ) : (
                        <MainButton color='primary' onClick={addToGames}>
                            <span>Load More</span>
                        </MainButton>
                    )}
                </div>
            )}
        </div>
    );
};

export default CasinoGames;
