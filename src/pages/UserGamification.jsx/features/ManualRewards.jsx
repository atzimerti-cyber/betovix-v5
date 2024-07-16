import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import classes from './ManualRewards.module.css';
import CalendarNowIcon from '../../../assets/svgs/calendar-now.svg?react';
import Calendar1dIcon from '../../../assets/svgs/calendar-1d.svg?react';
import Calendar7dIcon from '../../../assets/svgs/calendar-7d.svg?react';
import Calendar30dIcon from '../../../assets/svgs/calendar-30d.svg?react';
import InfinityIcon from '../../../assets/svgs/infinity.svg?react';
import { translate } from '../../../utils/translations';

const Bits = (props) => {
    const lang = useSelector((state) => state.app.lang); // Necessary for rerendering translations
    const rewards = useSelector((state) => state.modal.rewards);
    const user = useSelector((state) => state.login.user);

    const [timeUntilEndOfDay, setTimeUntilEndOfDay] = useState('');
    const [timeUntilNextSunday, setTimeUntilNextSunday] = useState('');
    const [timeUntilEndOfMonth, setTimeUntilEndOfMonth] = useState('');
    const [percentOfDay, setPercentOfDay] = useState(0);
    const [percentOfWeek, setPercentOfWeek] = useState(0);
    const [percentOfMonth, setPercentOfMonth] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            const now = new Date();

            const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
            const endOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59, 999);
            const timeToEndOfDay = endOfDay - now;
            const timeSinceStartOfDay = now - startOfDay;
            const totalDayTime = endOfDay - startOfDay;
            setTimeUntilEndOfDay(formatTime(timeToEndOfDay));
            setPercentOfDay(((timeSinceStartOfDay / totalDayTime) * 100).toFixed(2));

            const today = new Date();
            const startOfWeek = new Date(today.setDate(today.getDate() - today.getDay()));
            const endOfWeek = new Date(startOfWeek.getTime());
            endOfWeek.setDate(endOfWeek.getDate() + 7);
            endOfWeek.setHours(23, 59, 59, 999);
            const timeToNextSunday = endOfWeek - now;
            const totalWeekTime = endOfWeek - startOfWeek;
            setTimeUntilNextSunday(formatTime(timeToNextSunday));
            setPercentOfWeek((((now - startOfWeek) / totalWeekTime) * 100).toFixed(2));

            const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
            const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999);
            const timeToEndOfMonth = endOfMonth - now;
            const totalMonthTime = endOfMonth - startOfMonth;
            setTimeUntilEndOfMonth(formatTime(timeToEndOfMonth));
            setPercentOfMonth((((now - startOfMonth) / totalMonthTime) * 100).toFixed(2));
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const formatTime = (time) => {
        const days = Math.floor(time / (1000 * 60 * 60 * 24));
        const hours = Math.floor((time / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((time / 1000 / 60) % 60);
        const seconds = Math.floor((time / 1000) % 60);
        return `${days.toString().padStart(2, '0')}:${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds
            .toString()
            .padStart(2, '0')}`;
    };

    return (
        <>
            {/* <article className={classes.Card}>
                <header>
                    <div className={classes.IconContainer}>
                        <CalendarNowIcon />
                        <span className={classes.InstantDecoration}>
                            <span></span>
                            <span></span>
                            <span></span>
                        </span>
                    </div>
                    <p className={classes.Title}>{translate('Instant Bits')}</p>
                </header>
                <main className={classes.CardMain}>
                    {!user ? (
                        <button className={classes.TempButton} onClick={props.onGotoLogin}>
                            {translate('Claim')} <InfinityIcon /> {translate('Coins')}
                        </button>
                    ) : rewards?.rakeback.instant.claimable ? (
                        rewards?.rakeback.instant.available ? (
                            <button className={classes.TempButton}>{translate('Instant Claim')}</button>
                        ) : (
                            <p className={classes.NotAvailable}>
                                {translate('Not yet available')} 0.00 {translate('coins')}
                            </p>
                        )
                    ) : (
                        <button className={classes.TempButton} disabled>
                            {translate('Claimed')}
                        </button>
                    )}
                </main>
            </article> */}

            <article className={classes.Card}>
                <header>
                    <div className={classes.IconContainer}>
                        <Calendar1dIcon />
                    </div>
                    <p className={classes.Title}>{translate('Daily Rewards')}</p>
                </header>
                <main className={classes.CardMain}>
                    {rewards?.rakeback.daily.claimable ? (
                        rewards?.rakeback.daily.available ? (
                            <button className={classes.TempButton}>{translate('Claim')}</button>
                        ) : (
                            <>
                                <p className={classes.NotAvailable}>
                                    {/* {translate('Not yet available')} 0.00 {translate('coins')} */}
                                </p>
                                <p className={classes.ClaimIn}>
                                    {translate('Claim in')} {timeUntilEndOfDay}
                                </p>
                                <div className={classes.ProgressBar}>
                                    <div className={classes.Progress} style={{ '--progress': `${percentOfDay}%` }}></div>
                                </div>
                            </>
                        )
                    ) : (
                        <button className={classes.TempButton} disabled>
                            {translate('Claimed')}
                        </button>
                    )}
                </main>
            </article>

            <article className={classes.Card}>
                <header>
                    <div className={classes.IconContainer}>
                        <Calendar7dIcon />
                    </div>
                    <p className={classes.Title}>{translate('Weekly Rewards')}</p>
                </header>
                <main className={classes.CardMain}>
                    {rewards?.rakeback.weekly.claimable ? (
                        rewards?.rakeback.weekly.available ? (
                            <button className={classes.TempButton}>{translate('Claim')}</button>
                        ) : (
                            <>
                                <p className={classes.NotAvailable}>
                                    {/* {translate('Not yet available')} 0.00 {translate('coins')} */}
                                </p>
                                <p className={classes.ClaimIn}>
                                    {translate('Claim in')} {timeUntilNextSunday}
                                </p>
                                <div className={classes.ProgressBar}>
                                    <div className={classes.Progress} style={{ '--progress': `${percentOfWeek}%` }}></div>
                                </div>
                            </>
                        )
                    ) : (
                        <button className={classes.TempButton} disabled>
                            {translate('Claimed')}
                        </button>
                    )}
                </main>
            </article>

            <article className={classes.Card}>
                <header>
                    <div className={classes.IconContainer}>
                        <Calendar30dIcon />
                    </div>
                    <p className={classes.Title}>{translate('Monthly Rewards')}</p>
                </header>
                <main className={classes.CardMain}>
                    {rewards?.rakeback.monthly.claimable ? (
                        rewards?.rakeback.monthly.available ? (
                            <button className={classes.TempButton}>{translate('Claim')}</button>
                        ) : (
                            <>
                                <p className={classes.NotAvailable}>
                                    {/* {translate('Not yet available')} 0.00 {translate('coins')} */}
                                </p>
                                <p className={classes.ClaimIn}>
                                    {translate('Claim in')} {timeUntilEndOfMonth}
                                </p>
                                <div className={classes.ProgressBar}>
                                    <div className={classes.Progress} style={{ '--progress': `${percentOfMonth}%` }}></div>
                                </div>
                            </>
                        )
                    ) : (
                        <button className={classes.TempButton} disabled>
                            {translate('Claimed')}
                        </button>
                    )}
                </main>
            </article>
        </>
    );
};

export default Bits;
