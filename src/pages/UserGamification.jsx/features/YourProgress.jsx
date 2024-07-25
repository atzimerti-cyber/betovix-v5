import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';

import classes from './YourProgress.module.css';
import StarOutlineIcon from '../../../assets/svgs/star-outline.svg?react';
import CoinsIcon from '../../../assets/svgs/coins.svg?react';
import CloseButton from '../../../features/UI/Buttons/CloseButton';
import MainButton from '../../../features/UI/Buttons/MainButton';

import { getUserAchievements } from '../gamificationAsyncActions';
import { gamificationActions } from '../userGamificationSlice';

import { modalActions } from '../../../features/ModalRoot/modalSlice';

import { translate } from '../../../utils/translations';

import Levels from './Levels';
import Milestones from './Milestones';
import Rewards from './Rewards';

const YourProgress = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const lang = useSelector((state) => state.app.lang); // Necessary for rerendering translations

    //const user = useSelector((state) => state.login.user);
    const selectedHero = useSelector((state) => state.gamification.selectedHero);
    const selectedHeroLevels = useSelector((state) => state.gamification.heroLevels);
    const currentUserLevel = useSelector((state) => state.gamification.currentLevel);

    const [activeLevel, setActiveLevel] = useState(null);

    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;

        dispatch(getUserAchievements(signal));

        return () => { };
    }, [dispatch]);

    useEffect(() => {
        if (currentUserLevel && Object.keys(selectedHero).length > 0) {
            setActiveLevel(currentUserLevel);
        } else if (!currentUserLevel && Object.keys(selectedHero).length > 0) {
            setActiveLevel(selectedHeroLevels[0]);
        };
    }, [selectedHeroLevels]);

    useEffect(() => {
        console.log("TWRINO LEVEL:", activeLevel);
    }, [activeLevel]);

    const gotoLogin = () => {
        const searchParams = new URLSearchParams(location.search);
        searchParams.set('modal', 'auth');
        searchParams.set('tab', 'login');

        dispatch(modalActions.setOnCloseModal({ modal: 'your-progress', tab: null }));
        navigate(`${location.pathname}?${searchParams.toString()}`, { replace: true });
    };

    const addParamsToUrl = (tab) => {
        const searchParams = new URLSearchParams();
        if (tab) searchParams.set('tab', tab);

        navigate(`/profile?${searchParams.toString()}`, { replace: true });
    };

    return (
        <div className={classes.Modal}>
            <div className={classes.ModalContent}>
                {selectedHero && Object.keys(selectedHero).length > 0 ? (
                    <div className={classes.BackgroundContainer}>
                        <div className={classes.TopContent}>
                            <header>
                                <div className={classes.Center}>
                                    <h1 className={classes.Title}>
                                        {translate('Your Progress')}
                                    </h1>
                                </div>
                                <div className={classes.Right}>
                                    <CloseButton timesIcon onClick={() => navigate(location.pathname)} />
                                </div>
                                <div className={classes.Center}>
                                    <h1 className={classes.Hero}>
                                        {translate(selectedHero.name + ' ' + selectedHero.subName)}
                                    </h1>
                                </div>
                            </header>
                        </div>
                    </div>
                ) : (
                    <div className={classes.BackgroundContainer}>
                        <div className={classes.TopContent}>
                            <header>
                                <div className={classes.Center}>
                                    <h1 className={classes.Title} style={{ width: '100%' }}>
                                        {translate('No hero has been selected.')}
                                    </h1>
                                </div>
                                <div className={classes.Right}>
                                    <CloseButton timesIcon onClick={() => navigate(location.pathname)} />
                                </div>
                            </header>
                        </div>
                    </div>
                )}

                <div className={classes.MainContent}>
                    {selectedHero && Object.keys(selectedHero).length > 0 ? (
                        <div className={classes.GridContainer}>
                            <section className={classes.LevelUpSection}>
                                <Levels activeLevel={activeLevel} onChangeLevel={(level) => setActiveLevel(level)} />
                                <div className={classes.LevelUpMilestone}>
                                    <Milestones activeLevel={activeLevel} progressBar />
                                </div>
                                <Rewards />
                            </section>
                        </div>
                    ) : (
                        <div className={classes.GoToButton}>
                            <MainButton color='primary' size='small' onClick={() => addParamsToUrl('heroes')}>
                                {translate('Select a Hero')}
                            </MainButton>
                        </div>

                    )}
                </div>
            </div>

            <div className={classes.ImageContainer}>
                <img src={selectedHero.banner} loading="lazy" alt={selectedHero.name} />
            </div>
            {/* <div className={classes.ImageContainer}>
                <img src={aceSurprised} alt="ace maskot" loading="lazy" />
            </div> */}
        </div>
    );
};

export default YourProgress;
