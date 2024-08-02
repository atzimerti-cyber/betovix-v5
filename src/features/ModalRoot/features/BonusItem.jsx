import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import LoyaltyBonus from '../../../assets/svgs/loyaltyBonus.webp';
import RegisterBonus from '../../../assets/svgs/registerBonus.webp';
import DepositBonus from '../../../assets/svgs/depositBonus.webp';
import { claimBonus } from '../modalAsyncActions'; 
import RewardsCategory from '../features/RewardsCategory';

import { translate } from '../../../utils/translations';
import { formatDateTime, getTimeUntil } from '../../../utils/custom';

import classes from './BonusItem.module.css'; // Assuming you have some CSS for the BonusItem

const BonusItem = ({ bonus, handleTabClick }) => {
    const dispatch = useDispatch();
    const usernameSplit = bonus.Username ? bonus.Username.split(" ") : [];
    const bonusType = usernameSplit[0] || '';
   
    let color = 'var(--db-purple-box)' ;

    const { Status: status, Progress: initialProgress, Waggered, WinsLimit } = bonus;
    let progress = initialProgress;

    if (initialProgress === 0 && Waggered > 0) {
        progress = (100 * Waggered) / WinsLimit;
    }

    if(status === 1) color =  'var(--db-available)';
    if(status === 3 || status === 4) color =  'var(--db-cancelled)';
    if(status === 5) color =  'var(--db-pending)';
    if(status === 6) color =  'var(--db-brand-green)';

    const handleClaimBonus = (id) => {
        
        const controller = new AbortController();
        const signal = controller.signal;

        dispatch(claimBonus(signal, id, () => {
            handleTabClick('Active', 2);
        }));
    };

    return (
        <div key={bonus.Id} className={classes.bonusItem}>
             <div className={classes.bonusShadow} style={{ background: `linear-gradient(to right, ${color}, transparent)` }}></div>
             <div className={classes.bonusItemContent}>
                <div className={classes.bonusItemImage}>
                    {bonusType === 'Loyalty' && <img src={LoyaltyBonus} alt='bonus' loading='lazy' />}
                    {bonusType === 'Deposit' && <img src={DepositBonus} alt='bonus' loading='lazy' />}
                    {bonusType === 'Register' && <img src={RegisterBonus} alt='bonus' loading='lazy' />}
                    {bonus.imageUrl && <img src={bonus.imageUrl} alt='bonus' loading='lazy' />}
                    {!['Loyalty', 'Deposit', 'Register'].includes(bonusType) && <img src={LoyaltyBonus} alt='bonus' loading='lazy' />}
                </div>
                <div className={classes.bonusContentContainer}>
                    <div className={classes.contentTitle}>
                        <div className={classes.bonusTitle}>
                            <h3>{bonusType + ' '}{translate('Bonus')}</h3>
                            <div className={classes.BonusBlnc}>{translate('Balance') + ': '}{bonus.Balance.toFixed(2)}</div>
                        </div>
                        <div className={classes.bonusDate}>
                            {bonus.StartedAt && (
                                <div className={classes.startingDate}>
                                    {formatDateTime(bonus.StartedAt)}
                                </div>
                            )}
                            {bonus.ExpiresAt && (
                                 <>
                                <div>-</div>
                                <div className={classes.endingDate}>
                                  {formatDateTime(bonus.ExpiresAt)}
                                </div>
                                </>
                            )}
                        </div>
                    </div>
                    {status !== 1 ? (
                                <div className={classes.wageringContent}>
                                    <RewardsCategory label='0.00' progress={progress} bits={bonus.WinsLimit}/>
                                </div>
                          ) : (
                            <div className={classes.bonusWrapperBtns}>
                            <div className={classes.bonusItemClaim}>
                                <div className={classes.claimBtn} onClick={() => handleClaimBonus(bonus.Id)}>
                                    <div className={classes.claim}>{translate('Claim')}</div>
                                </div>
                            </div>
                        </div>
                          )}
                  
                </div>
            </div>
           
        </div>
    );
};

export default BonusItem;
