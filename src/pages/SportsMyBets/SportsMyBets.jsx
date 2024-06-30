import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import classes from './SportsMyBets.module.css';
import SportsBookMenu from '../SportsBook/features/SportsBookMenu';
import DbTabs from '../../features/UI/Tabs/DbTabs';
import MyBets from './features/MyBets';
import { myBetsActions } from './myBetsSlice';

const SportsMyBets = () => {
    const dispatch = useDispatch();
    const [showTab, setShowTab] = useState('activeBets');

    useEffect(() => {
        return () => dispatch(myBetsActions.reset());
    }, []);

    return (
        <div className={classes.PageContent}>
            <div className={classes.SportsBook}>
                <div className={classes.MenuWrapper}>
                    <SportsBookMenu />
                </div>

                <div className={classes.Content}>
                    <DbTabs
                        tabs={[
                            { id: 'activeBets', label: 'Active Bets', active: showTab === 'activeBets' },
                            { id: 'settledBets', label: 'Settled Bets', active: showTab === 'settledBets' },
                        ]}
                        onChangeTab={(tab) => setShowTab(tab)}
                    >
                        <MyBets isActive={showTab === 'activeBets' ? true : false} />
                    </DbTabs>
                </div>
            </div>
        </div>
    );
};

export default SportsMyBets;
