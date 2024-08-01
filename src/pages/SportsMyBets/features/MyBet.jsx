import { useEffect, useState, useRef, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import classes from './MyBet.module.css';
import CoinsIcon from '../../../assets/svgs/coins.svg?react';
import Copy2Icon from '../../../assets/svgs/copy2.svg?react';
import AngleDown2Icon from '../../../assets/svgs/angle-down2.svg?react';
import Warning4Icon from '../../../assets/svgs/warning4.svg?react';
import SuccessIcon from '../../../assets/svgs/success.svg?react';
import { addThousandsSeparator, formatDateTime2 } from '../../../utils/custom';
import { translate } from '../../../utils/translations';
import { cashout } from '../myBetsAsyncActions';
import MyBetDetails from './MyBetDetails';
import Spinner from '../../../features/UI/Spinner/Spinner';
import { getTicketCashouts } from '../myBetsAsyncActions';
import { myBetsActions } from '../myBetsSlice';
import GiftIcon from '../../../assets/svgs/gift.svg?react';

const MyBet = (props) => {
    const dispatch = useDispatch();
    const lang = useSelector((state) => state.app.lang); // Necessary for rerendering translations
    const timeoutRef = useRef(null);
    const timeoutShowCashoutRef = useRef(null);

    const ticketCashouts = useSelector((state) => state.myBets.ticketCashouts);
    const cashedOutResult = useSelector((state) => state.myBets.cashedOutResult);

    const [betStatus, setBetStatus] = useState();
    const [isOpen, setIsOpen] = useState(true);
    const [copied, setCopied] = useState(false);
    const [showConfirmCashout, setShowConfirmCashout] = useState(false);
    const [axiosController, setAxiosController] = useState(null);

    useEffect(() => {
        let bs;

        // const isCashedOut = props.item.TicketEvents[0].Wins === 'R' ? true : false;
        const lost = props.item.TicketEvents.filter((e) => e.Wins === 'L');
        const isLoss = lost.length ? true : false;

        if (props.item.Status === -1) bs = 'Active';
        else if (props.item.Cashout) bs = 'Cashed Out';
        else if (isLoss) bs = 'Loss';
        else bs = 'Win';

        setBetStatus(bs);

        const controller = new AbortController();
        setAxiosController(controller);

        return () => {
            if (axiosController) axiosController.abort();
        };
    }, []);

    const onCopy = useCallback(() => {
        clearTimeout(timeoutRef.current);

        navigator.clipboard.writeText(props.item.TicketId);
        setCopied(true);

        timeoutRef.current = setTimeout(() => {
            setCopied(false);
        }, 3000);
    }, []);

    const getCircleStyle = () => {
        if (betStatus === 'Active') return { background: 'rgb(255, 207, 82)' };
        else if (betStatus === 'Win' || betStatus === 'Cashed Out') return { background: 'rgb(51, 193, 108)' };
        else if (betStatus === 'Loss') return { background: 'rgb(255, 40, 40)' };
    };

    const onShowConfirmCashout = () => {
        clearTimeout(timeoutShowCashoutRef.current);

        setShowConfirmCashout(true);

        timeoutShowCashoutRef.current = setTimeout(() => {
            setShowConfirmCashout(false);
        }, 10000);
    };

    const onCashout = () => {
        clearTimeout(timeoutShowCashoutRef.current);

        dispatch(cashout(props.item.TicketId, ticketCashouts[props.item.TicketId]?.Metrics.Cashout, axiosController.signal));
        setShowConfirmCashout(false);
    };

    const getTotalOdds = () => {
        let totalOdds = props.item.TicketEvents[0].Odd;
        if (props.item.TicketEvents.length > 1) totalOdds = props.item.TicketEvents.reduce((acc, cur) => acc * cur.Odd, 1);

        totalOdds = addThousandsSeparator(totalOdds);
        return totalOdds;
    };

    useEffect(() => {
        if (cashedOutResult[props.item.TicketId] === 'success') {
            setTimeout(() => {
                let cashoutType = 3;
                if (props.isActive) cashoutType = 1;

                dispatch(getTicketCashouts(cashoutType, props.page, axiosController.signal));
                dispatch(myBetsActions.deleteCashedOutResult(props.item.TicketId));
            }, 3000);
        }
    }, [cashedOutResult[props.item.TicketId]]);

    let elClasses = [classes.MyBet, classes[betStatus]];
    if (isOpen) elClasses.push(classes.IsOpen);

    return (
        <div className={elClasses.join(' ')}>
            <section className={classes.HeaderSection} onClick={() => setIsOpen((prev) => !prev)}>
                <div className={classes.Title}>
                    <CoinsIcon />
                    <span className={classes.Stake}>{addThousandsSeparator(props.item.Stake)}</span>
                    <span className={classes.Type}> {props.item.Type === 'Singles' ? 'Single' : 'Multi'} </span>
                    <span className={classes.OddsWrapper}>
                        @ <span className={classes.Odds}>{getTotalOdds()}</span>
                    </span>
                </div>

                {props.item.IsBonus && (
                    <div className={classes.IsBonus}>
                        <span>Played with bonus</span>
                        <div className={classes.GiftIconWrapper}>
                            <GiftIcon />
                        </div>
                    </div>
                )}

                <div className={classes.BetStatusContainer}>
                    <div className={classes.Circle} style={getCircleStyle()}></div>
                    <span className={classes.Status}>{translate(betStatus)}</span>
                    <div className={classes.ArrowIcon}>
                        <AngleDown2Icon />
                    </div>
                </div>
            </section>

            {isOpen && (
                <div className={classes.DetailsContainer}>
                    <section className={classes.CashoutSection}>
                        <div className={classes.PotentialReturnsSection}>
                            {betStatus === 'Win' && (
                                <>
                                    <span className={classes.Payout}>{translate('Payout')}</span>
                                    <div className={classes.CoinsContainer}>
                                        <CoinsIcon />
                                        <span>{addThousandsSeparator(props.item.TotalWins)}</span>
                                    </div>
                                </>
                            )}
                            {betStatus === 'Cashed Out' && (
                                <>
                                    <span className={classes.Payout}>{translate('Payout')}</span>
                                    <div className={classes.CoinsContainer}>
                                        <CoinsIcon />
                                        <span>{addThousandsSeparator(props.item.TotalWins)}</span>
                                    </div>
                                </>
                            )}
                            {betStatus === 'Active' && (
                                <div className={classes.PotentialReturns}>
                                    <span>{translate('Potential Returns')}</span>
                                    <div className={classes.CoinsContainer}>
                                        <CoinsIcon />
                                        <span>{addThousandsSeparator(props.item.MaxWins)}</span>
                                    </div>

                                    {/* {props.item.BonusParoli.WinAmount > 0 && (
                                        <div className={classes.PotentialBonus}>
                                            <span>
                                                {translate('Bonus')} {props.item.BonusParoli.BoostPercent}%
                                            </span>
                                            <div className={classes.CoinsContainer}>
                                                <CoinsIcon />
                                                <span>{addThousandsSeparator(props.item.BonusParoli.WinAmount)}</span>
                                            </div>
                                        </div>
                                    )} */}
                                </div>
                            )}

                            <div className={classes.TicketContainer}>
                                <span className={classes.TicketContainerLabel}>{translate('Bet Placed at')}</span>
                                <span className={classes.TicketContainerValue}>{formatDateTime2(props.item.Placement)}</span>
                            </div>
                            <div className={classes.TicketContainer}>
                                <span className={classes.TicketContainerLabel}>{translate('Ticket ID')}</span>
                                <span className={classes.TicketContainerValue}>{props.item.TicketId}</span>
                            </div>
                        </div>

                        <div
                            className={
                                ticketCashouts && ticketCashouts[props.item.TicketId]
                                    ? classes.CashoutButtonSection
                                    : [classes.CashoutButtonSection, classes.NoCashoutButton].join(' ')
                            }
                        >
                            {/* Different cashout options */}
                            {cashedOutResult[props.item.TicketId] && cashedOutResult[props.item.TicketId] === 'loading' && (
                                <div className={classes.SpinnerWrapper}>
                                    <Spinner />
                                </div>
                            )}

                            {cashedOutResult[props.item.TicketId] && cashedOutResult[props.item.TicketId] === 'success' && (
                                <div className={classes.CashoutSuccess}>
                                    {translate('Cashout Successful')} {addThousandsSeparator(ticketCashouts[props.item.TicketId]?.Metrics?.Cashout)}
                                    <SuccessIcon />
                                </div>
                            )}

                            {!cashedOutResult[props.item.TicketId] &&
                                ticketCashouts &&
                                ticketCashouts[props.item.TicketId] &&
                                !ticketCashouts[props.item.TicketId]?.Metrics?.Cashout && (
                                    <div className={classes.CashoutSuspendedWrapper}>
                                        <div className={classes.CashoutSuspended}>
                                            {translate('Cashout Suspended')}
                                            <Warning4Icon />

                                            <span className={classes.BreakReason}>{ticketCashouts[props.item.TicketId]?.BreakReason}</span>
                                        </div>
                                    </div>
                                )}

                            {!cashedOutResult[props.item.TicketId] &&
                                ticketCashouts &&
                                ticketCashouts[props.item.TicketId] &&
                                ticketCashouts[props.item.TicketId]?.Metrics?.Cashout &&
                                !showConfirmCashout && (
                                    <button className={classes.CashoutButton} onClick={onShowConfirmCashout}>
                                        {translate('Cashout')} {addThousandsSeparator(ticketCashouts[props.item.TicketId]?.Metrics?.Cashout)}
                                    </button>
                                )}

                            {!cashedOutResult[props.item.TicketId] &&
                                ticketCashouts &&
                                ticketCashouts[props.item.TicketId] &&
                                ticketCashouts[props.item.TicketId]?.Metrics?.Cashout &&
                                showConfirmCashout && (
                                    <div className={classes.ConfirmCashoutWrapper}>
                                        <button
                                            className={classes.CancelButton}
                                            onClick={() => {
                                                clearTimeout(timeoutShowCashoutRef.current);
                                                setShowConfirmCashout(false);
                                            }}
                                        >
                                            {translate('Cancel')}
                                        </button>
                                        <button className={classes.ConfirmButton} onClick={onCashout}>
                                            {translate('Confirm')} {addThousandsSeparator(ticketCashouts[props.item.TicketId]?.Metrics?.Cashout)}
                                        </button>
                                    </div>
                                )}

                            {copied ? (
                                <div className={classes.Copied}>{translate('Copied')}!</div>
                            ) : (
                                <Copy2Icon className={classes.CopyIcon} onClick={onCopy} />
                            )}
                        </div>
                    </section>

                    <div className={classes.Separator}></div>

                    <div className={classes.BetDetailsWrapper}>
                        <MyBetDetails item={props.item} />
                    </div>
                </div>
            )}
        </div>
    );
};

export default MyBet;
