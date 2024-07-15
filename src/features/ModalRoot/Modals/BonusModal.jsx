import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { getBonuses } from '../modalAsyncActions'; 
import CloseButton from '../../UI/Buttons/CloseButton';
import StarBonusIcon from '../../../assets/svgs/bonus.webp';

import { modalActions } from '../modalSlice';
import { translate } from '../../../utils/translations';

import classes from './BonusModal.module.css';

const BonusModal = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const bonuses = useSelector(state => state.modal.bonuses) || []; 

    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;

        dispatch(getBonuses(signal));

        return () => dispatch(modalActions.setBonuses(null));
    }, []);

    const [activeTab, setActiveTab] = useState('Active'); 

    const handleTabClick = (tab) => {
        setActiveTab(tab); 
    };

    return (
        <div className={classes.BonusModal}>
              <div className={classes.bonusesContainer}>
            <div className={classes.bonusesWrapper}>
            <header>
                            <div className={classes.Center}>
                                <h1 className={classes.Title}>
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
                onClick={() => handleTabClick('Available')}
            >
                {translate('Available')}
            </div>
            <div
                className={activeTab === 'Active' ? classes.active : ''}
                onClick={() => handleTabClick('Active')}
            >
                {translate('Active')}
            </div>
            <div
                className={activeTab === 'Cancelled' ? classes.active : ''}
                onClick={() => handleTabClick('Cancelled')}
            >
                {translate('Cancelled')}
            </div>
            <div
                className={activeTab === 'Expired' ? classes.active : ''}
                onClick={() => handleTabClick('Expired')}
            >
                {translate('Expired')}
            </div>
            <div
                className={activeTab === 'Pending' ? classes.active : ''}
                onClick={() => handleTabClick('Pending')}
            >
                {translate('Pending')}
            </div>
            <div
                className={activeTab === 'Redeemed' ? classes.active : ''}
                onClick={() => handleTabClick('Redeemed')}
            >
                {translate('Redeemed')}
            </div>
        </div>
                </div>
                <div className={classes.bonusesBody}>
                   <div className={classes.bonusesContainer}>
             
                        <div className={classes.bonusesBodyWrapper}>
                              {bonuses.length === 0 ? (
                        <div className={classes.noBonus}> {translate('No Available Bonus')}</div>
                    ) : (
                        <div className={classes.bonusesList}>
                        {bonuses.map((bonus) => (
                            <div key={bonus.id} className={classes.bonusItem}>
                                <div className={classes.bonusItemContent}>
                                    <div className={classes.bonusItemImage}>
                                        <img alt="" />
                                    </div>
                                    <div className={classes.bonusContentContainer}>
                                        <div className={classes.contentTitle}>
                                            <div className={classes.bonusTitle}>
                                                <h3>{bonus.title}</h3>
                                            </div>
                                            <div className={classes.bonusDate}>
                                                <div className={classes.startingDate}>{bonus.startWagering}</div>
                                                <div className={classes.endingDate}>{bonus.endWagering}</div>
                                            </div>
                                        </div>
                                        <div className={classes.wageringContent}>
                                            <div className={classes.wageringLineWrapper}>
                                                <div className={classes.startValue}>{bonus.startWagering}</div>
                                                <div className={classes.wageringLine}>
                                                    <div className={classes.waged} style={{ width: '0%' }}>
                                                        <div className={classes.wagedAmount}></div>
                                                        <div className={classes.progressMob}></div>
                                                    </div>
                                                    <div className={classes.remaining} style={{ width: '100%' }}>
                                                        <div className={classes.remainingAmount}></div>
                                                    </div>
                                                </div>
                                                <div className={classes.endValue}>{bonus.endWagering}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className={classes.bonusWrapperBtns}>
                                    <div className={classes.bonusItemClaim}>
                                        <div className={classes.claimBtn}>
                                            <div className={classes.claim}>Claim</div>
                                        </div>
                                    </div>
                                    <div className={classes.bonusItemError}>
                                        <div className={classes.errorBtn}>
                                            <div>{/* Display error message if necessary */}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    )}
                </div>
            </div>
        </div>
            </div>
       
        </div>
        
        <div className={classes.ImageContainer}>
                <img src={StarBonusIcon} alt='bonus' loading='lazy' />
            </div>
        </div>
      
    );
};

export default BonusModal;
