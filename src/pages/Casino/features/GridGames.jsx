import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import classes from './GridGames.module.css';
import diceAnimation from '../../../assets/images/dice_animation_1.webp';
import CasinoGameCard from '../features/CasinoGameCard';
import MainButton from '../../../features/UI/Buttons/MainButton';
import { addToGamesWithFilter } from '../casinoAsyncActions';
import LoaderPlaceholder from '../../../features/UI/Skeletons/LoaderPlaceholder';
import { translate } from '../../../utils/translations';

const GridGames = (props) => {
    const dispatch = useDispatch();
    const lang = useSelector((state) => state.app.lang); // Necessary for rerendering translations

    const moreLoading = useSelector((state) => state.casino.moreLoading);

    const [axiosController, setAxiosController] = useState(null);

    useEffect(() => {
        return () => axiosController && axiosController.abort();
    }, [axiosController]);

    const addToGames = () => {
        if (axiosController) axiosController.abort();

        const controller = new AbortController();
        const signal = controller.signal;
        setAxiosController(controller);

        dispatch(addToGamesWithFilter(props.property, signal));
    };

    return (
        <div className={classes.VendorGames}>
            <div className={classes.Header}>
                {props.icon}
                <p className={classes.Title}>{translate(props.title)}</p>
                {props.collection?.Total > 0 && (
                    <p className={classes.Total}>
                        {props.collection?.Total} {translate('Games')}
                    </p>
                )}
            </div>

            <div className={classes.GameGrid}>
                {props.collection?.Data.map((game) => {
                    return <CasinoGameCard key={game.Data.Id} game={game} />;
                })}

                {props.loading || props.collection === null || moreLoading
                    ? Array.from({ length: 24 }, (_, index) => (
                          <div key={index} className={classes.ImageContainer}>
                              <LoaderPlaceholder />
                          </div>
                      ))
                    : null}
            </div>

            {props.collection?.Total === 0 || props.collection?.Data.length === 0 && (
                <p className={classes.NoResults}>{props.searchString ? `${translate('No results with')} '${props.searchString}'` : translate('No results')}</p>
            )}

            {props.collection?.Total > props.collection?.Data.length && props.collection?.Data.length > 0 && (
                <div className={classes.LoadMore}>
                    {moreLoading ? (
                        <img src={diceAnimation} className={classes.MoreLoadingAnimation}></img>
                    ) : (
                        <MainButton color='primary' onClick={addToGames}>
                            <span>{translate('Load More')}</span>
                        </MainButton>
                    )}
                </div>
            )}
        </div>
    );
};

export default GridGames;
