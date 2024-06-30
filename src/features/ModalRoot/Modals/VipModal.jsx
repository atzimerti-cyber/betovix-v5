import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';

import classes from './VipModal.module.css';
import aceSurprised from '../../../assets/images/ace_surprised.webp';
import StarOutlineIcon from '../../../assets/svgs/star-outline.svg?react';
import CoinsIcon from '../../../assets/svgs/coins.svg?react';
import CloseButton from '../../UI/Buttons/CloseButton';
import { getVip } from '../modalAsyncActions';
import { modalActions } from '../modalSlice';
import Milestones from '../features/Milestones';
import Levels from '../features/Levels';
import Bits from '../features/Bits';
import DecorationDiv from '../../DecorationDiv/DecorationDiv';
import RewardsCategory from '../features/RewardsCategory';
import { translate } from '../../../utils/translations';
import DsButton from '../../UI/Buttons/DsButton';

const VipModal = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const user = useSelector((state) => state.login.user);
    const [activeLevel, setActiveLevel] = useState(user?.level);

    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;

        dispatch(getVip(signal));

        return () => dispatch(modalActions.setLevels(null));
    }, []);

    const gotoLogin = () => {
        const searchParams = new URLSearchParams(location.search);
        searchParams.set('modal', 'auth');
        searchParams.set('tab', 'login');

        dispatch(modalActions.setOnCloseModal({ modal: 'vip', tab: null }));
        navigate(`${location.pathname}?${searchParams.toString()}`, { replace: true });
    };

    return (
        <div className={classes.VipModal}>
            <div className={classes.ModalContent}>
                <div className={classes.BackgroundContainer}>
                    <div className={classes.TopContent}>
                        <header>
                            <div className={classes.Center}>
                                <h1 className={classes.Title}>
                                    <StarOutlineIcon />
                                    {translate('Ace’s Rewards')}
                                </h1>
                            </div>
                            <div className={classes.Right}>
                                <CloseButton timesIcon onClick={() => navigate(location.pathname)} />
                            </div>
                        </header>
                    </div>
                </div>

                <div className={classes.MainContent}>
                    <section className={classes.LevelUpSection}>
                        <div className={classes.LevelUpMilestone}>
                            <Levels activeLevel={activeLevel} onChangeLevel={(level) => setActiveLevel(level)} />
                            <Milestones activeLevel={activeLevel} onGotoLogin={gotoLogin} />
                        </div>
                    </section>

                    <section className={classes.ClaimRewardsSection}>
                        <Bits onGotoLogin={gotoLogin} />
                    </section>

                    <section className={classes.BreakdownSection}>
                        <div className={!user ? [classes.BreakdownGrid, classes.NotLoggedIn].join(' ') : classes.BreakdownGrid}>
                            <DecorationDiv color='secondary'>
                                <>
                                    <p className={classes.TotalName}>Total Rewards</p>
                                    <p className={classes.TotalBits}>
                                        <CoinsIcon />
                                        0.00
                                    </p>
                                </>
                            </DecorationDiv>

                            <div className={classes.Container}>
                                <RewardsCategory label='Instant' progress={0} bits={0} />
                                <RewardsCategory label='Daily' progress={50} bits={100} />
                                <RewardsCategory label='Weekly' progress={0} bits={0} />
                                <RewardsCategory label='Monthly' progress={0} bits={0} />
                                <RewardsCategory label='Leaderboard' progress={0} bits={0} />
                                <RewardsCategory label='Level up bonus' progress={0} bits={0} />
                                <RewardsCategory label='Other' progress={0} bits={0} />
                            </div>
                        </div>

                        {!user && (
                            <div className={classes.LoginButtonContainer}>
                                <DsButton active={true} color='transparent' onClick={gotoLogin}>
                                    {translate('Login to join VIP')}
                                </DsButton>
                            </div>
                        )}
                    </section>
                </div>
            </div>

            <div className={classes.ImageContainer}>
                <img src={aceSurprised} alt='ace maskot' loading='lazy' />
            </div>
        </div>
    );
};

export default VipModal;
