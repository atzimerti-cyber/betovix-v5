import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import classes from './ManualRewards.module.css';
import Calendar1dIcon from '../../../assets/svgs/calendar1d.svg?react';
import Calendar7dIcon from '../../../assets/svgs/calendar7d.svg?react';
import Calendar30dIcon from '../../../assets/svgs/calendar30d.svg?react';
import CoinsIcon from '../../../assets/svgs/coins.svg?react';
import { translate } from '../../../utils/translations';

const ManualRewards = (props) => {
    const lang = useSelector((state) => state.app.lang); // Necessary for rerendering translations
    const user = useSelector((state) => state.login.user);

    const instantRewards = useSelector((state) => state.gamification.manualRewards.instantRewards);
    const dailyRewards = useSelector((state) => state.gamification.manualRewards.dailyRewards);
    const weeklyRewards = useSelector((state) => state.gamification.manualRewards.weeklyRewards);
    const monthlyRewards = useSelector((state) => state.gamification.manualRewards.monthlyRewards);

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

    const descByKey = (key, value, symbol) => {
        let obj = [];
        switch (key) {
            case '1':
                return "Eric ";
            case '2':
                return "Nia";
            case '3':
                return "Jack";
            case '4':
                return "Lee";
            case '5':
                return "Lola";
            case '6':
                return "Sam";
            case '7':
                obj = ["Win", <CoinsIcon key="coinsIcon" style={{ marginLeft: '8px', marginRight: '1px' }} />, value];
                return <>{obj.map((item, index) => <span key={index}>{item}</span>)}</>;
            case '8':
                obj = ["Increase Bet Limits by ", value, symbol];
                return <>{obj.map((item, index) => <span key={index}>{item}</span>)}</>;
            case '9':
                obj = ["Cashback ", value, symbol];
                return <>{obj.map((item, index) => <span key={index}>{item}</span>)}</>;
            case '10':
                return "Kati";
            default:
                return "Reward Type Key not found";
        }
    };

    return (
        <>
            <div className={classes.ManualRewards}>
                <article className={classes.Card}>
                    <header>
                        <div className={classes.IconContainer}>
                            <Calendar7dIcon />
                        </div>
                        <p className={classes.Title}>{translate(instantRewards?.name)}</p>
                        {/* <p className={classes.Title}>{translate(weeklyRewards?.name)}</p> */}
                    </header>
                    <main className={classes.CardMain}>
                        {instantRewards && Object.keys(instantRewards).length > 0 ? (
                            <>
                                <p className={classes.Description}>
                                    {instantRewards.description}
                                </p>
                                <div className={classes.ProgressBarContainer}>
                                    <div className={classes.ProgressBar}>
                                        <div className={classes.Progress} style={{ '--progress': `${instantRewards.progress}%` }}></div>
                                    </div>
                                </div>

                                {instantRewards.completed ?
                                    (
                                        <div className={classes.ButtonContainer}>
                                            <button className={classes.TempButton} disabled>
                                                {translate('Completed')}
                                            </button>
                                        </div>
                                    ) : (
                                        <div className={classes.ButtonContainer}>
                                            <button className={classes.TempButton} disabled>
                                                {translate('')}
                                            </button>
                                        </div>
                                    )
                                }
                            </>
                        ) : (
                            null
                        )}
                    </main>
                </article>
                <article className={classes.Card}>
                    <header>
                        <div className={classes.IconContainer}>
                            <Calendar1dIcon />
                        </div>
                        {/* <p className={classes.Title}>{dailyRewards?.name}</p> */}
                        <p className={classes.Title}>{translate(dailyRewards?.name)}</p>
                    </header>
                    <main className={classes.CardMain}>
                        {dailyRewards ? (
                            <>
                                <p className={classes.Description}>
                                    {dailyRewards.description.replace(/<\/?p>/g, "")}
                                </p>
                                <div className={classes.ProgressBarContainer}>
                                    <div className={classes.ProgressBar}>
                                        <div className={classes.Progress} style={{ '--progress': `${dailyRewards.progress}%` }}></div>
                                    </div>
                                    {dailyRewards.completed ? (
                                        null
                                    ) : (
                                        null
                                        // <div className={classes.Level}>{dailyRewards.progress}%</div>
                                    )}
                                </div>
                                {dailyRewards.completed ?
                                    (
                                        <div className={classes.ButtonContainer}>
                                            <button className={classes.TempButton} disabled>
                                                {translate('Completed')}
                                            </button>
                                        </div>
                                    ) : (
                                        <>
                                            <p className={classes.ClaimIn}>
                                                {translate('Ends in')} {timeUntilEndOfDay}
                                            </p>


                                        </>

                                    )
                                }
                            </>
                        ) : (
                            null
                        )}
                    </main>
                </article>

                <article className={classes.Card}>
                    <header>
                        <div className={classes.IconContainer}>
                            <Calendar7dIcon />
                        </div>
                        <p className={classes.Title}>{translate(weeklyRewards?.name)}</p>
                        {/* <p className={classes.Title}>{translate(weeklyRewards?.name)}</p> */}
                    </header>
                    <main className={classes.CardMain}>
                        {weeklyRewards ? (
                            <>
                                <p className={classes.Description}>
                                    {weeklyRewards.description.replace(/<\/?p>/g, "")}
                                </p>
                                <div className={classes.ProgressBarContainer}>
                                    <div className={classes.ProgressBar}>
                                        <div className={classes.Progress} style={{ '--progress': `${weeklyRewards.progress}%` }}></div>
                                    </div>
                                    {weeklyRewards.completed ? (
                                        null
                                    ) : (
                                        null
                                        // <div className={classes.Level}>{weeklyRewards.progress}%</div>
                                    )}
                                </div>
                                {weeklyRewards.completed ?
                                    (
                                        <div className={classes.ButtonContainer}>
                                            <button className={classes.TempButton} disabled>
                                                {translate('Completed')}
                                            </button>
                                        </div>
                                    ) : (
                                        <>
                                            <p className={classes.ClaimIn}>
                                                {translate('Ends in')} {timeUntilNextSunday}
                                            </p>


                                        </>
                                    )
                                }
                            </>
                        ) : (
                            null
                        )}
                    </main>
                </article>

                <article className={classes.Card}>
                    <header>
                        <div className={classes.IconContainer}>
                            <Calendar30dIcon />
                        </div>
                        <p className={classes.Title}>{translate(monthlyRewards?.name)}</p>
                        {/* <p className={classes.Title}>{translate(monthlyRewards?.name)}</p> */}
                    </header>
                    <main className={classes.CardMain}>
                        {monthlyRewards ? (
                            <>
                                <p className={classes.Description}>
                                    {monthlyRewards.description.replace(/<\/?p>/g, "")}
                                </p>
                                <div className={classes.ProgressBarContainer}>

                                    <div className={classes.ProgressBar}>
                                        <div className={classes.Progress} style={{ '--progress': `${monthlyRewards.progress}%` }}></div>
                                    </div>
                                    {monthlyRewards.completed ? (
                                        null
                                    ) : (
                                        null
                                        // <div className={classes.Level}>{monthlyRewards.progress}%</div>
                                    )}

                                </div>


                                {monthlyRewards.completed ?
                                    (
                                        <div className={classes.ButtonContainer}>
                                            <button className={classes.TempButton} disabled>
                                                {translate('Completed')}
                                            </button>
                                        </div>
                                    ) : (
                                        <>
                                            <p className={classes.ClaimIn}>
                                                {translate('Ends in')} {timeUntilEndOfMonth}
                                            </p>


                                        </>
                                    )
                                }

                            </>
                        ) : (
                            null
                        )}
                    </main>
                </article>
            </div>

        </>
    );
};

export default ManualRewards;
