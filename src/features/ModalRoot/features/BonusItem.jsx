import React from 'react';
import LoyaltyBonus from '../../../assets/svgs/loyaltyBonus.webp';
import RegisterBonus from '../../../assets/svgs/registerBonus.webp';
import DepositBonus from '../../../assets/svgs/depositBonus.webp';
import CoinsIcon from '../../../assets/svgs/coins.svg?react';

import { translate } from '../../../utils/translations';
import { formatDateTime, getTimeUntil } from '../../../utils/custom';

import classes from './BonusItem.module.css'; // Assuming you have some CSS for the BonusItem

const BonusItem = ({ bonus }) => {
    const usernameSplit = bonus.Username ? bonus.Username.split(" ") : [];
    const bonusType = usernameSplit[0] || '';
    // Destructure the bonus properties
    const { Status: status, Progress: initialProgress, Waggered, WinsLimit } = bonus;

    // Calculate progress and remaining values
    let progress = initialProgress;

    if (initialProgress === 0 && Waggered > 0) {
        progress = (100 * Waggered) / WinsLimit;
    }


    return (
        <div key={bonus.Id} className={classes.bonusItem}>
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
                            <div className={classes.BonusBlnc}>{translate('Balance') + ': '}{bonus.Balance}</div>
                        </div>
                        <div className={classes.bonusDate}>
                            <div className={classes.startingDate}>{formatDateTime(bonus.StartedAt)}</div>
                            <div> - </div>
                            <div className={classes.endingDate}>{formatDateTime(bonus.ExpiresAt)}</div>
                        </div>
                    </div>
                    {status !== 1 ? (
                                <div className={classes.wageringContent}>
                                <div className={classes.wageringLineWrapper}>
                                    <div className={classes.wageringLine}>
                                        <div className={classes.waged} style={{ width: `${progress}%` }}></div>
                                        <div className={classes.wageringDetails}>
                                            <p className={classes.startValue}>0.00</p>
                                            <p className={classes.progress}>{progress}%</p>
                                            <CoinsIcon />
                                            <p className={classes.endValue}>{bonus.WinsLimit.toFixed(2)}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                          ) : (
                            <div className={classes.bonusWrapperBtns}>
                            <div className={classes.bonusItemClaim}>
                                <div className={classes.claimBtn}>
                                    <div className={classes.claim}>{translate('Claim')}</div>
                                </div>
                            </div>
                            {/* <div className={classes.bonusItemError}>
                                <div className={classes.errorBtn}>
                                    <div>{}</div>
                                </div>
                            </div> */}
                        </div>
                          )}
                  
                </div>
            </div>
           
        </div>
    );
};

export default BonusItem;
