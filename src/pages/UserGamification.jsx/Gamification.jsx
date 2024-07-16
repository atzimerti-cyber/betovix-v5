import React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import classes from './Gamification.module.css';
import { useNavigate, useLocation } from 'react-router-dom';
import MainButton from '../../features/UI/Buttons/MainButton';
import GamificationProgress from './features/GamificationProgress';
import DbTabs from '../../features/UI/Tabs/DbTabs';

const Gamification = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const addParamsToUrl = (modal, tab) => {
        const searchParams = new URLSearchParams(location.search);
        searchParams.set('modal', modal);
        if (tab) searchParams.set('tab', tab);

        navigate(`${location.pathname}?${searchParams.toString()}`, { replace: true });
    };

    const dispatch = useDispatch();
    const [showTab, setShowTab] = useState('heroes');

    // useEffect(() => {
    //     return () => dispatch(myBetsActions.reset());
    // }, []);

    return (

        <div className={classes.PageContent}>
            <div className={classes.SportsBook}>

                <div className={classes.Content}>
                    <DbTabs
                        tabs={[
                            { id: 'activeBets', label: 'Your Progress', active: showTab === 'heroes' },
                            // { id: 'settledBets', label: '', active: showTab === 'settledBets' },
                        ]}
                        onChangeTab={(tab) => setShowTab(tab)}
                        titleGroupStyle={{ justifyContent: 'flex-start' }}
                    >
                        
                        <GamificationProgress isActive={showTab === 'heroes' ? true : false} />
                    </DbTabs>
                </div>
            </div>
        </div>

    );
};

export default Gamification;
