import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';

import classes from './Topbar.module.css';
import UserIcon from '../../../assets/svgs/user.svg?react';
import GiftIcon from '../../../assets/svgs/gift.svg?react';
import BellIcon from '../../../assets/svgs/bell.svg?react';
import WalletIcon from '../../../assets/svgs/wallet.svg?react';
import CreditCardIcon from '../../../assets/svgs/credit-card.svg?react';
import CoinsIcon from '../../../assets/svgs/coins.svg?react';

import LogoBig from '../../../assets/svgs/logo-big.svg?react';
import LogoSmall from '../../../assets/svgs/logo-small.svg?react';
import MenuBurgerIcon from '../../../assets/svgs/menu-burger.svg?react';
import MainButton from '../../UI/Buttons/MainButton';
import Dropdown from '../../UI/Dropdown/Dropdown';
import NumberBadge from '../../UI/Badges/NumberBudge';
import { translate } from '../../../utils/translations';
import { layoutActions } from '../layoutSlice';
import MenuItems from './MenuItems';
import { addThousandsSeparator } from '../../../utils/custom';


const Topbar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const isDesktop = useMediaQuery({ query: '(min-width: 1024px)' });

    // const unreadNotifications = useSelector((state) => state.app.unreadNotifications);
    const fullLeftContainer = useSelector((state) => state.layout.fullLeftContainer);
    const userDropdownVisible = useSelector((state) => state.layout.userDropdownVisible);
    const user = useSelector((state) => state.login.user);
    const availableBonus = useSelector((state) => state.layout.availableBonus);

    const [balanceInteger, setBalanceInteger] = useState(0);
    const [balanceDecimal, setBalanceDecimal] = useState('00');

    useEffect(() => {
        if (!user) {
            setBalanceInteger(0);
            setBalanceDecimal('00');
            return;
        }

        getBalance();
    }, [user?.Wallet.Balance]);

    const addParamsToUrl = (modal, tab) => {
        const searchParams = new URLSearchParams(location.search);
        searchParams.set('modal', modal);
        if (tab) searchParams.set('tab', tab);

        navigate(`${location.pathname}?${searchParams.toString()}`, { replace: true });
    };

    const getBalance = () => {
        let integer = Math.floor(user.Wallet.Balance);
        integer = addThousandsSeparator(integer, 0);

        const decimal = ((user.Wallet.Balance % 1) * 100).toFixed(0);

        setBalanceInteger(integer);
        setBalanceDecimal(decimal.padStart(2, '0'));
    };

    const inCasinoGame = location.pathname.includes('/casino/game/');

    return (
        <div className={classes.Topbar}>
            <div className={classes.TopbarLeftWrapper}>
                <div className={classes.TopbarLeft}>
                    <div className={classes.HeaderHamburger}>
                        <MainButton color='transparent' onClick={() => dispatch(layoutActions.setFullLeftContainer(!fullLeftContainer))}>
                            <MenuBurgerIcon />
                        </MainButton>
                    </div>
                    <MainButton color='transparent' onClick={() => navigate('/')}>
                        {isDesktop ? <LogoBig /> : <LogoSmall />}
                    </MainButton>
                </div>
            </div>

            <div className={classes.TopbarCenterWrapper}>
                {user && (
                    <>
                        <div className={classes.BalanceContainer}>
                            <CoinsIcon />
                            <div className={inCasinoGame ? [classes.HeaderBalanceWrap, classes.IsInPlay].join(' ') : classes.HeaderBalanceWrap}>
                                <div className={classes.HeaderBalance}>
                                    {balanceInteger}
                                    <span>.{balanceDecimal}</span>
                                </div>
                                <div className={classes.InPlay}>(In Play)</div>
                            </div>
                        </div>
                        <MainButton color='secondary' size='small' onClick={() => addParamsToUrl('cashier', 'deposit')}>
                            <WalletIcon />
                            <span>{translate('Cashier')}</span>
                        </MainButton>
                    </>
                )}

                {/* <MainButton color='bv-light-green' size='small' onClick={() => addParamsToUrl('cashier', 'buy-crypto')}>
                    <CreditCardIcon />
                    <span>Buy crypto</span>
                </MainButton> */}
            </div>

            <div className={classes.TopbarRightWrapper}>
                <div className={user ? [classes.HeaderRight, classes.UserHeaderRight].join(' ') : [classes.HeaderRight, classes.NoUserHeaderRight].join(' ')}>
                    {user ? (
                        <>
                            <MainButton color='transparent' onClick={() => addParamsToUrl('your-progress')}>
                                <div className={classes.VipProgressBar}>
                                    <div className={classes.VipProgressColor} style={{ width: '0%' }}></div>
                                </div>
                                <div className={classes.VipIconContainer}></div>
                            </MainButton>
                            <div className={classes.BonusButtonContainer}>
                                    <MainButton className={classes.BonusButton} color='transparent' onClick={() => addParamsToUrl('bonus')}>
                                        <GiftIcon />
                                        <div className={classes.BonusButtonColor}>{translate('Bonus')}</div>
                                    </MainButton>
                                    {availableBonus > 0 && <NumberBadge number={availableBonus} floating justifyRight />}
                            </div>
                            <div className={classes.DropDownWrapper}>
                                <div className={classes.DropDownLabel} onClick={() => dispatch(layoutActions.setUserDropdownVisible(!userDropdownVisible))}>
                                    <MainButton color='transparent'>
                                        <UserIcon />
                                        <span>{user?.Username}</span>
                                    </MainButton>
                                    <div className={[classes.NumberBadge, classes.FloatingBadge].join(' ')}>2</div>
                                </div>

                                {isDesktop && (
                                    <Dropdown show={userDropdownVisible} onClickOutside={() => dispatch(layoutActions.setUserDropdownVisible(false))}>
                                        <ul className={classes.DropdownMenu}>
                                            <MenuItems onClick={() => dispatch(layoutActions.setUserDropdownVisible(false))} />
                                        </ul>
                                    </Dropdown>
                                )}
                            </div>

                            <div className={classes.HeaderRightDivider}></div>

                            <div className={classes.Container}>
                                <MainButton color='transparent'>
                                    <BellIcon />
                                </MainButton>
                            </div>
                        </>
                    ) : (
                        <>
                            <MainButton color='transparent' onClick={() => addParamsToUrl('auth', 'login')}>
                                {translate('LOGIN')}
                            </MainButton>
                            <MainButton color='secondary' onClick={() => addParamsToUrl('auth', 'register')}>
                                {translate('REGISTER')}
                            </MainButton>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Topbar;
