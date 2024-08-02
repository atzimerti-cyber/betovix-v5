import { useSelector } from 'react-redux';
import { SwiperSlide } from 'swiper/react';

import classes from './Rewards.module.css';
import Bits from '../../../features/ModalRoot/features/Bits';
import ManualRewards from './ManualRewards';

const Rewards = (props) => {
    const displayedHeroLevels = useSelector((state) => state.gamification.displayedHero.levels);
    //console.log("rewards", props.activeLevel);

    return (
        <div className={classes.Rewards}>
            <section className={classes.ClaimRewardsSection}>
                <ManualRewards/>
            </section>
        </div>
    );
};

export default Rewards;
