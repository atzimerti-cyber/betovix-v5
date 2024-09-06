import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams, useNavigate } from 'react-router-dom';

import classes from './Leaderboard.module.css';
import { translate } from '../../utils/translations';
import { getLeaderboard } from './leaderboardAsyncActions';
import { leaderboardActions } from './leaderboardSlice';
import Tabs from '../../features/UI/Tabs/Tabs';
import LeaderboardRow from './features/LeaderboardRow';
import LoaderPlaceholder from '../../features/UI/Skeletons/LoaderPlaceholder';
import { addThousandsSeparator } from '../../utils/custom';

const Leaderboard = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const params = useParams();

    const leaderboard = useSelector((state) => state.leaderboard.leaderboard);
    const loadingLeaderboard = useSelector((state) => state.leaderboard.loadingLeaderboard);

    const [selectedTab, setSelectedTab] = useState('Daily');

    // const [timeUntilEndOfDay, setTimeUntilEndOfDay] = useState('');
    // const [timeUntilNextSunday, setTimeUntilNextSunday] = useState('');
    // const [rewardsSum, setRewardsSum] = useState(null);

    useEffect(() => {
        dispatch(getLeaderboard());

        if (!params['*']) {
            navigate(`/leaderboard/Daily`, { replace: true });
        } else {
            const type = params['*'];
            setSelectedTab(type);
        }

        // const timer = setInterval(() => {
        //     const now = new Date();

        //     const endOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59, 999);
        //     const timeToEndOfDay = endOfDay - now;
        //     setTimeUntilEndOfDay(formatTime(timeToEndOfDay));

        //     const today = new Date();
        //     const startOfWeek = new Date(today.setDate(today.getDate() - today.getDay()));
        //     const endOfWeek = new Date(startOfWeek.getTime());
        //     endOfWeek.setDate(endOfWeek.getDate() + 7);
        //     endOfWeek.setHours(23, 59, 59, 999);
        //     const timeToNextSunday = endOfWeek - now;
        //     setTimeUntilNextSunday(formatTime(timeToNextSunday));
        // }, 1000);

        return () => {
            //clearInterval(timer);
            dispatch(leaderboardActions.reset());
        };
    }, []);

    // useEffect(() => {
    //     if (loadingLeaderboard) return;
    //     if (!leaderboard) return;

    //     let sums = {};
    //     Object.keys(leaderboard.rewards).forEach((rewardsSection) => {
    //         const sum = Object.values(leaderboard.rewards[rewardsSection])
    //             .map((value) => value / 100) // TODO: this / 100 is because of duelbits way of sending the values
    //             .reduce((acc, value) => acc + value, 0);

    //         sums[rewardsSection] = sum;
    //     });
    //     setRewardsSum(sums);
    // }, [loadingLeaderboard]);

    // const formatTime = (time) => {
    //     const days = Math.floor(time / (1000 * 60 * 60 * 24));
    //     const hours = Math.floor((time / (1000 * 60 * 60)) % 24);
    //     const minutes = Math.floor((time / 1000 / 60) % 60);
    //     const seconds = Math.floor((time / 1000) % 60);

    //     const datetimeObj = {
    //         days: days.toString().padStart(2, '0'),
    //         hours: hours.toString().padStart(2, '0'),
    //         minutes: minutes.toString().padStart(2, '0'),
    //         seconds: seconds.toString().padStart(2, '0'),
    //     };

    //     return datetimeObj;
    // };

    return (
        <div className={classes.PageContent}>
            <div className={classes.Banner}>
                <h1 className={classes.BannerTitle}>
                    <span>{translate('TOP 10 LAST WINS')}</span> {translate('LEADERBOARD')}
                </h1>

                {/* <Link to='#' className={classes.BannerBoost}>
                    <span>{translate('3x BOOST ON')}</span> {translate('SPORTS WAGERS')}
                </Link> */}
            </div>

            {/* <div className={classes.TotalGiveaway}>
                {!rewardsSum ? (
                    <div className={classes.LoadingTotalPlaceholder}>
                        <LoaderPlaceholder extraStyles={{ backgroundColor: '#213140', borderRadius: '0.375rem' }} />
                    </div>
                ) : (
                    <>
                        <span>${addThousandsSeparator(rewardsSum[selectedTab.toLowerCase()], 2)}</span> {translate(`${selectedTab} Giveaway`)}
                    </>
                )}
            </div> */}

            <div className={classes.Container}>
                {/* <div className={classes.Timer}>
                    <div className={classes.DigitsWrapper}>
                        <div className={classes.Digit}>{selectedTab === 'Daily' ? timeUntilEndOfDay.days : timeUntilNextSunday.days}</div>
                        <div className={classes.DigitLabel}>{translate('Days')}</div>
                    </div>
                    <span className={classes.Colon}>:</span>
                    <div className={classes.DigitsWrapper}>
                        <div className={classes.Digit}>{selectedTab === 'Daily' ? timeUntilEndOfDay.hours : timeUntilNextSunday.hours}</div>
                        <div className={classes.DigitLabel}>{translate('Hours')}</div>
                    </div>
                    <span className={classes.Colon}>:</span>
                    <div className={classes.DigitsWrapper}>
                        <div className={classes.Digit}>{selectedTab === 'Daily' ? timeUntilEndOfDay.minutes : timeUntilNextSunday.minutes}</div>
                        <div className={classes.DigitLabel}>{translate('Mins')}</div>
                    </div>
                    <span className={classes.Colon}>:</span>
                    <div className={classes.DigitsWrapper}>
                        <div className={classes.Digit}>{selectedTab === 'Daily' ? timeUntilEndOfDay.seconds : timeUntilNextSunday.seconds}</div>
                        <div className={classes.DigitLabel}>{translate('Sec')}</div>
                    </div>
                    <span className={classes.Colon}>:</span>
                </div> */}

                <Tabs
                    tabs={[
                        { id: 'Daily', label: translate('Daily'), active: selectedTab === 'Daily' },
                        // { id: 'Weekly', label: translate('Weekly'), active: selectedTab === 'Weekly' },
                    ]}
                    onChangeTab={(tab) => {
                        setSelectedTab(tab);
                        navigate(`/leaderboard/${tab}`, { replace: true });
                    }}
                    type='buttons'
                    noMargin
                />

                <div className={classes.TabPanel}>
                    <table className={classes.LeaderboardTable}>
                        <thead>
                            <tr className={classes.TableHeader}>
                                <th>
                                    <span>#</span>
                                </th>
                                <th>{translate('Winnings')}</th>
                                <th>
                                    {/* {translate(selectedTab)} */}
                                    {translate('Stake')}
                                </th>
                                <th>{translate('Date')}</th>
                            </tr>
                        </thead>

                        {leaderboard ? (
                            <tbody>
                                {selectedTab === 'Daily' &&
                                    leaderboard?.standings?.daily?.standings?.map((standing, index) => {
                                        let reward = null;
                                        //let property = selectedTab.toLowerCase();
                                        //if (index <= 4) reward = leaderboard.rewards[property][index + 1] / 100; // TODO: this / 100 is because of duelbits way of sending the values

                                        return <LeaderboardRow key={standing.ticket.id} standing={standing} position={index + 1} reward={reward} />;
                                        // return <LeaderboardRow key={standing.user.id} standing={standing} position={index + 1} reward={reward} />;
                                    })}
                                {/* {selectedTab === 'Weekly' &&
                                    leaderboard?.standings?.weekly?.standings?.map((standing, index) => {
                                        let reward = null;
                                        let property = selectedTab.toLowerCase();
                                        if (index <= 4) reward = leaderboard.rewards[property][index + 1] / 100; // TODO: this / 100 is because of duelbits way of sending the values

                                        return <LeaderboardRow key={standing.user.id} standing={standing} position={index + 1} reward={reward} />;
                                    })} */}
                            </tbody>
                        ) : (
                            <tbody>
                                {Array.from({ length: 10 }, (_, index) => (
                                    <tr key={index} className={classes.LoadingPlaceholder}>
                                        <td colSpan={4}>
                                            <LoaderPlaceholder extraStyles={{ borderRadius: '0.375rem' }} />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        )}
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Leaderboard;
