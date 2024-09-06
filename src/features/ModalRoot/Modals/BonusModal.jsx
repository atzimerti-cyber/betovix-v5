import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { getBonuses } from '../modalAsyncActions'; 
import CloseButton from '../../UI/Buttons/CloseButton';
import BonusIcon from '../../../assets/svgs/gift-box.svg?react';
import BonusItem from '../features/BonusItem';
import NoBonusItem from '../features/NoBonusItem';

import { modalActions } from '../modalSlice';
import { translate } from '../../../utils/translations';

import classes from './BonusModal.module.css';
 
const BonusModal = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const bonuses = useSelector(state => state.modal.bonuses) || []; 
    const [activeTab, setActiveTab] = useState('Available');
    const [loading, setLoading] = useState(false); // Add loading state

    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;

        const fetchBonuses = async () => {
            setLoading(true);
            await dispatch(getBonuses(signal, 1));
            setLoading(false);
        };

        fetchBonuses();
        return () => dispatch(modalActions.setBonuses(null));
    }, [dispatch]);

    const handleTabClick = (tab, status) => {
        setActiveTab(tab);

        const controller = new AbortController();
        const signal = controller.signal;

        const fetchBonuses = async () => {
            setLoading(true);
            await dispatch(getBonuses(signal, status));
            setLoading(false);
        };

        fetchBonuses();

        return () => {
            controller.abort();
        };
    };


    return (
        <div className={classes.BonusModal}>
              <div className={classes.bonusesContainer}>
            <div className={classes.bonusesWrapper}>
            <header style={{padding: 10}}>
                            <div className={classes.Center}>
                                <h1 className={classes.Title}>
                                <BonusIcon />
                                    {translate('Your Bonuses')}
                                </h1>
                            </div>
                            <div className={classes.Right}>
                                <CloseButton timesIcon onClick={() => navigate(location.pathname)} />
                            </div>
                        </header>
                <div className={classes.bonusesHeader}>
               
                <div className={classes.bonusesHeaderWrapper}>
            <div
                className={activeTab === 'Available' ? classes.active : ''}
                onClick={() => handleTabClick('Available', 1)}
            >
                {translate('Available')}
            </div>
            <div
                className={activeTab === 'Active' ? classes.active : ''}
                onClick={() => handleTabClick('Active', 2)}
            >
                {translate('Active')}
            </div>
            <div
                className={activeTab === 'Cancelled' ? classes.active : ''}
                onClick={() => handleTabClick('Cancelled', 3)}
            >
                {translate('Cancelled')}
            </div>
            <div
                className={activeTab === 'Expired' ? classes.active : ''}
                onClick={() => handleTabClick('Expired', 4)}
            >
                {translate('Expired')}
            </div>
            <div
                className={activeTab === 'Pending' ? classes.active : ''}
                onClick={() => handleTabClick('Pending', 5)}
            >
                {translate('Pending')}
            </div>
            <div
                className={activeTab === 'Redeemed' ? classes.active : ''}
                onClick={() => handleTabClick('Redeemed', 6)}
            >
                {translate('Redeemed')}
            </div>
        </div>
                </div>
                    <div className={classes.bonusesBody}>
                        <div className={classes.bonusesContainerSmall}>
                            {loading ? (<div className={classes.loader}></div>
                            ) : (
                                <div className={classes.bonusesBodyWrapper}>

                                    {bonuses.length === 0 ? (
                                        <NoBonusItem />
                                    ) : (
                                        <div className={classes.bonusesList}>
                                            {bonuses.map((bonus) => (
                                                <BonusItem key={bonus.Id} bonus={bonus} handleTabClick={handleTabClick} />
                                            ))}
                                        </div>
                                    )}

                                </div>
                            )}
                        </div>
                    </div>
            </div>
       
        </div>
       
        </div>
      
    );
};

export default BonusModal;
