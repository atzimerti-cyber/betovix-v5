import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import StarIcon from '../../../assets/svgs/star.svg?react';
import TransactionIcon from '../../../assets/svgs/transaction.svg?react';
import VaultIcon from '../../../assets/svgs/vault.svg?react';
import LiveSupportIcon from '../../../assets/svgs/live-support.svg?react';
import LogoutIcon from '../../../assets/svgs/logout.svg?react';
import UserIcon from '../../../assets/svgs/user.svg?react';
import { loginActions } from '../../../pages/Login/loginSlice';
import classes from './MenuItems.module.css';
import { translate } from '../../../utils/translations';

const MenuItems = (props) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

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
                        navigate(`lounge`);
                        props.onClick();
                    }}
                >
                    <StarIcon />
                    <span>{translate('My Rewards')}</span>
                    <div className={classes.NumberBadge}>2</div>
                </a>
            </li>
            <li>
                <a>
                    <TransactionIcon />
                    <span>{translate('Transactions')}</span>
                </a>
            </li>
            <li>
                <a>
                    <VaultIcon />
                    <span>{translate('Vault')}</span>
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
