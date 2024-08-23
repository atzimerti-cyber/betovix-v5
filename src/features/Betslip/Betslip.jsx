import { useEffect, useState, useMemo, useRef, memo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';
import classNames from 'classnames'; // You can use the classnames library for conditional class names

import classes from './Betslip.module.css';
import Tabs from '../UI/Tabs/Tabs';
import Empty from './features/Empty';
import BetCalculation from './features/BetCalculation';
import BetError from './features/BetError';
import BetslipControl from './features/BetslipControl';
import Slip from './features/Slip';
import { betslipActions } from './betslipSlice';
import { getTicketUpdates, placeBet, saveBet } from './betslipAsyncActions';
import { translate } from '../../utils/translations';
import Systems from './features/Systems';
import { layoutActions } from '../Layout/layoutSlice';
import { addThousandsSeparator } from '../../utils/custom';
import { getTicketFromStorage, getTicketChangesSettings } from '../../utils/storage';
import BetReceipt from './features/BetReceipt';
import CoinsIcon from '../../assets/svgs/coins.svg?react';
import SaveIcon from '../../assets/svgs/save.svg?react';
import Spinner from '../UI/Spinner/Spinner';

const Betslip = memo(function (props) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const timerIdRef = useRef(null);

    const lang = useSelector((state) => state.app.lang); // Necessary for rerendering translations
    const slips = useSelector((state) => state.betslip.slips);
    const amounts = useSelector((state) => state.betslip.amounts);
    const slipUpdated = useSelector((state) => state.betslip.slipUpdated);
    const betError = useSelector((state) => state.betslip.betError);
    const betType = useSelector((state) => state.betslip.betType);
    const user = useSelector((state) => state.login.user);
    const ticketUpdated = useSelector((state) => state.ticket.ticketUpdated);
    const betslip = useSelector((state) => state.betslip.betslip);
    const showReceiptFor = useSelector((state) => state.betslip.showReceiptFor);
    const liveState = useSelector((state) => state.live.liveState);
    const placingBetLoading = useSelector((state) => state.betslip.placingBetLoading);
    const savingBetLoading = useSelector((state) => state.betslip.savingBetLoading);
    const bonusBalance = useSelector((state) => state.layout.bonusBalance);
    const selectedAccount = useSelector((state) => state.login.selectedAccount);
    const triggerPlaceBet = useSelector((state) => state.betslip.triggerPlaceBet);

    const [isBonus, setIsBonus] = useState(false);

    const addParamsToUrl = (modal, tab) => {
        const searchParams = new URLSearchParams(location.search);
        searchParams.set('modal', modal);
        if (tab) searchParams.set('tab', tab);
      
        navigate(`${location.pathname}?${searchParams.toString()}`, { replace: true });
    };

    useEffect(() => {
        return () => clearInterval(timerIdRef.current);
    }, []);

    useEffect(() => {
        if (triggerPlaceBet) {
            onPlaceBet();
        }
    }, [triggerPlaceBet]);

    useEffect(() => {
        const storageTicket = getTicketFromStorage();
        if (!storageTicket) return;

        let totalStake = storageTicket.stakes.total;
        let totalPayout = storageTicket.metrics.finalWins;
        let bonusParoliExtra = storageTicket.metrics.bonusParoliExtra;
        let totalPayoutWithoutBonus = totalPayout - bonusParoliExtra;

        // Add thousands separators
        totalStake = addThousandsSeparator(totalStake);
        totalPayout = addThousandsSeparator(totalPayout);
        bonusParoliExtra = addThousandsSeparator(bonusParoliExtra);
        totalPayoutWithoutBonus = addThousandsSeparator(totalPayoutWithoutBonus);

        dispatch(
            betslipActions.setBetslip({
                totalStake: totalStake,
                totalPayout: totalPayout,
                totalPayoutWithoutBonus: totalPayoutWithoutBonus,
                slipsNum: slips.length,
                bonusParoliCateg: storageTicket.metrics.bonusParoliCateg,
                bonusParoliExtra: bonusParoliExtra,
            })
        );
    }, [ticketUpdated]);

    // TODO: Rerun on changed live? (To get the game as live if it was pregame before)
    useEffect(() => {
        clearInterval(timerIdRef.current);

        let points = [];
        let notLiveSlips = [];
        slips.forEach((slip) => {
            const isLive = liveState[slip.MatchId] ? true : false;

            const point = {
                MatchId: slip.MatchId,
                MarketTypeId: slip.MarketTypeId,
                Line: slip.Line,
                FieldId: slip.FieldId,
                Odd: slip.Odd,
                Live: isLive,
            };

            points.push(point);

            if (!isLive) notLiveSlips.push(point);
        });
        const pointsStr = JSON.stringify(notLiveSlips);

        const pollingCallback = () => {
            const payload = `{"Points":${pointsStr}}`;

            dispatch(getTicketUpdates(payload));
        };

        if (notLiveSlips.length > 0) {
            timerIdRef.current = setInterval(pollingCallback, 5000);
        } else {
            clearInterval(timerIdRef.current);
        }

        // Reset amounts
        if (slips.length === 0) dispatch(betslipActions.setAmounts({}));
        else if (betType === 'System' && slips.length < 2) dispatch(betslipActions.setAmounts({}));
    }, [slips?.length, slipUpdated]);

    const betButton = useMemo(() => {
        if (!user)
            return (
                <button className={classes.BetButton} onClick={() => addParamsToUrl('auth', 'login')}>
                    <span>{translate('Login to Place Bet')}</span>
                </button>
            );
        else if (betError === 'acceptChanges')
            return (
                <button className={classes.BetButton} onClick={() => dispatch(betslipActions.acceptChanges())}>
                    <span>{translate('Accept changes')}</span>
                </button>
            );
        else if (betError === 'balance')
            return (
                <button className={classes.BetButton} onClick={() => addParamsToUrl('cashier', 'deposit')}>
                    <span>{translate('Deposit to Place Bet')}</span>
                </button>
            );
        else if (betError || slips?.length === 0)
            return (
                <button className={classes.BetButton} disabled>
                    <span>{translate('Place Bet')}</span>
                </button>
            );
        else {
            return (
                <button className={classes.BetButton} onClick={() => onPlaceBet()} disabled={placingBetLoading}>
                    {placingBetLoading ? (
                        <Spinner />
                    ) : (
                        <span>
                            {translate('Place Bet')} <CoinsIcon className={classes.CoinsIcon} /> {addThousandsSeparator(betslip?.totalStake, 2)}
                        </span>
                    )}
                </button>
            );
        }
    }, [user?.AccountId, betError, slips?.length, betslip?.totalStake, placingBetLoading, savingBetLoading, isBonus]);

    const onChangeTab = (tab) => {
        slips.forEach((slip, index) => {
            dispatch(betslipActions.updateSlipAmount({ index: index, value: 0 }));
        });
        dispatch(betslipActions.setBetType(tab));
        dispatch(betslipActions.setAmounts({}));
    };

    const getTicketPayload = () => {

        const ticket = getTicketFromStorage();
        const ticketChangesSettings = getTicketChangesSettings();
        if (!ticket) return;

        let points = [];
        ticket.points.forEach((point) => {
            points.push({
                HomeTeamId: point.HomeTeamId,
                HomeTeamName: point.HomeTeamName,
                AwayTeamId: point.AwayTeamId,
                AwayTeamName: point.AwayTeamName,
                MatchName: point.AwayTeamName?.International
                    ? point.HomeTeamName.International + ' - ' + point.AwayTeamName.International
                    : point.HomeTeamName.International,
                MatchId: point.MatchId,
                MarketName: point.MarketName,
                MarketTypeId: point.MarketTypeId,
                Line: point.Line,
                FieldName: point.FieldName,
                FieldId: point.FieldId,
                FieldTypeId: point.FieldTypeId,
                Odd: point.Odd,
                Active: point.Active,
                Live: point.Live,
                DateOfMatch: point.DateOfMatch,
                SportName: point.SportName,
                CategoryName: point.CategoryName,
                TournamentName: point.TournamentName,
                TournamentId: point.TournamentId,
                CategoryId: point.CategoryId,
                SportId: point.SportId,
            });
        });

        const betObj = {
            stakes: ticket.stakes,
            points: points,
            acceptChanges: ticketChangesSettings.oddChanges === '2' ? true : false,
            IsBonus: isBonus,
            providerId: 1, // TODO: should this come from settings?
        };

        const payload = JSON.stringify(betObj);

        return payload;

    };

    const onSaveBet = () => {
        const payload = getTicketPayload();
        const data = JSON.stringify(payload);
    
        dispatch(saveBet(data))
            .then(() => {
                addParamsToUrl('booked-bet')
            })
            .catch((error) => {
                toast.error(error?.message);
            });
    };

    const onPlaceBet = () => {

        const ticket = getTicketFromStorage();
        const ticketChangesSettings = getTicketChangesSettings();
        if (!ticket) return;

        let points = [];
        ticket.points.forEach((point) => {
            points.push({
                MatchName: point.AwayTeamName?.International
                    ? point.HomeTeamName.International + ' - ' + point.AwayTeamName.International
                    : point.HomeTeamName.International,
                MatchId: point.MatchId,
                MarketName: point.MarketName.International,
                MarketTypeId: point.MarketTypeId,
                Line: point.Line,
                FieldName: point.FieldName.International,
                FieldId: point.FieldId,
                FieldTypeId: point.FieldTypeId,
                Odd: point.Odd,
                Active: point.Active,
                Live: point.Live,
                DateOfMatch: point.DateOfMatch,
                SportName: point.SportName.International,
                CategoryName: point.CategoryName.International,
                TournamentName: point.TournamentName.International,
                TournamentId: point.TournamentId,
                CategoryId: point.CategoryId,
                SportId: point.SportId,
            });
        });

        const betObj = {
            stakes: ticket.stakes,
            points: points,
            acceptChanges: ticketChangesSettings.oddChanges === '2' ? true : false,
            IsBonus: isBonus,
            providerId: 1, // TODO: should this come from settings?
        };

        if (selectedAccount && selectedAccount !== null && selectedAccount?.AccountId) {
            betObj.ForPlayer = selectedAccount.AccountId;
       }

        const payload = JSON.stringify(betObj);

        dispatch(placeBet(payload, slips, amounts, betType))
           
    };

    const bonusButton = useMemo(() => {
        if (user && slips.length && betslip.totalStake && betslip.totalStake > 0 && bonusBalance && bonusBalance >= betslip.totalStake) {
            return (
                <div className={classNames(classes.BonusButton, { [classes.selected]: isBonus })}>
                    <label className={classes.bonusContainer}>
                        <input
                            checked={isBonus} 
                            onChange={e => setIsBonus(e.target.checked)} 
                            type="checkbox"
                        />
                        <span className={classes.checkMark} />
                        {translate('Play With Bonus')}
                    </label>
                </div>
            );
        }
        return null;
    }, [user?.AccountId, slips?.length, betslip?.totalStake, bonusBalance, isBonus]);

    const saveButton = useMemo(() => {
        if (slips.length) {
            return (
                <button className={classes.SaveButton} onClick={() => onSaveBet()} disabled={savingBetLoading}>
                    {savingBetLoading ? (
                        <Spinner />
                    ) : (
                        <span>
                           <SaveIcon className={classes.CoinsIcon} /> {translate('SHARE')}
                        </span>
                    )}
                </button>
            );
        }
        return null;
    }, [slips?.length]);

    return (
        <section className={classes.Betslip}>
            <div className={classes.TabsWrapper}>
                <Tabs
                    tabs={[
                        { id: 'Single', label: translate('Single'), active: betType === 'Single' },
                        { id: 'Multiple', label: translate('Multi'), active: betType === 'Multiple' },
                        { id: 'System', label: translate('System'), active: betType === 'System' },
                    ]}
                    onChangeTab={(tab) => onChangeTab(tab)}
                    type='buttons'
                    onClose={props.onClose || null}
                />

                <div className={classes.Content}>
                    <div className={classes.BetContent}>
                        <BetslipControl />

                        <div className={classes.BetGroup}>
                            <AnimatePresence>
                                {slips.length > 0 &&
                                    slips.map((s, index) => {
                                        return <Slip key={s.FieldId} slip={s} index={index} />;
                                    })}
                            </AnimatePresence>
                        </div>

                        {betType === 'System' && <Systems />}

                        <div className={classes.BetOverview}>
                            <BetError />
                            {slips.length > 0 && <BetCalculation />}
                            {bonusButton}
                            {saveButton}
                            {betButton}
                        </div>

                        {showReceiptFor && <BetReceipt />}

                        {slips.length === 0 && <Empty />}
                    </div>
                </div>
            </div>
        </section>
    );
});

export default Betslip;
