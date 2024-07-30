import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import StarIcon from '../../../assets/svgs/star.svg?react';
import TransactionIcon from '../../../assets/svgs/transaction.svg?react';
import VaultIcon from '../../../assets/svgs/vault.svg?react';
import LiveSupportIcon from '../../../assets/svgs/live-support.svg?react';
import PaperIcon from '../../../assets/svgs/paper2.svg?react';
import LogoutIcon from '../../../assets/svgs/logout.svg?react';
import UserIcon from '../../../assets/svgs/user.svg?react';
import { loginActions } from '../../../pages/Login/loginSlice';
import classes from './MenuItems.module.css';
import { translate } from '../../../utils/translations';

const MenuItems = (props) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const newRewards = useSelector((state) => state.gamification.newRewards);

    return (
        <>
            <li>
                <a
                    onClick={() => {
                        navigate(`profile?tab=overview`);
                        props.onClick();
                    }}
                >
                    <UserIcon />
                    <span>{translate('Profile')}</span>
                </a>
            </li>
            <li>
                <a
                    onClick={() => {
                        navigate(`rewards`);
                        props.onClick();
                    }}
                >
                    <StarIcon />
                    <span>{translate('My Rewards')}</span>
                    {newRewards.length > 0 &&
                        <div className={classes.NumberBadge}>{newRewards.length}</div>
                    }

                </a>
            </li>
            {/* <li>
                <a>
                    <TransactionIcon />
                    <span>{translate('Transactions')}</span>
                </a>
            </li> */}
            {/* <li>
                <a>
                    <VaultIcon />
                    <span>{translate('Vault')}</span>
                </a>
            </li> */}
            <li>
                <a
                    onClick={() => {
                        navigate(`sportsbook/mybets`);
                        props.onClick();
                    }}
                >
                    <PaperIcon fill="#527491"/>
                    <span>{translate('My Bets')}</span>
                </a>
            </li>
            <li>
                <a>
                    <LiveSupportIcon />
                    <span>{translate('Live Support')}</span>
                </a>
            </li>
            <li>
                <a
                    onClick={() => {
                        dispatch(loginActions.logout());
                        props.onClick();
                        window.location.reload();
                    }}
                >
                    <LogoutIcon />
                    <span>{translate('Log Out')}</span>
                </a>
            </li>
        </>
    );
};

export default MenuItems;
