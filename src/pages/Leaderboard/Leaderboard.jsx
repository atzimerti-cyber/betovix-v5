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

        return () => {
            dispatch(leaderboardActions.reset());
        };
    }, []);

    return (
        <div className={classes.PageContent}>
            <div className={classes.Banner}>
                <h1 className={classes.BannerTitle}>
                    <span>{translate('TOP 10 LAST WINS')}</span> {translate('LEADERBOARD')}
                </h1>
            </div>

            <div className={classes.Container}>
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

                                        return <LeaderboardRow key={standing.ticket.id} standing={standing} position={index + 1} reward={reward} />;
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
