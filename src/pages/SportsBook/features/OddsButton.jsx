import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useMediaQuery } from 'react-responsive';
import _ from 'lodash';

import classes from './OddsButton.module.css';
import IndicatorDownIcon from '../../../assets/svgs/indicator-down.svg?react';
import IndicatorUpIcon from '../../../assets/svgs/indicator-up.svg?react';
import { betslipActions } from '../../../features/Betslip/betslipSlice';
import { layoutActions } from '../../../features/Layout/layoutSlice';

const OddsButton = (props) => {
    const dispatch = useDispatch();
    const isMobile = useMediaQuery({ query: '(max-width: 768px)' });

    const betType = useSelector((state) => state.betslip.betType);
    const ticketSettings = useSelector((state) => state.ticket.ticketSettings);
    const selectedOddsFormat = useSelector((state) => state.app.selectedOddsFormat);
    const slips = useSelector((state) => state.betslip.slips);
    const liveState = useSelector((state) => state.live.liveState);
    const placingBetLoading = useSelector((state) => state.betslip.placingBetLoading);

    const [isSelected, setIsSelected] = useState(false);

    const [currentValue, setCurrentValue] = useState(props.odds);
    const [previousValue, setPreviousValue] = useState(null);
    const [showIndicator, setShowIndicator] = useState(false);

    useEffect(() => {
        if (props.marketField) {
            const found = slips.find((s) => s.FieldId === props.marketField.FieldId);
            if (found) setIsSelected(true);
            else setIsSelected(false);
        }
    }, [slips.length]);

    const onClick = (e) => {
        e.stopPropagation();
        e.preventDefault();

        if (isSelected) {
            dispatch(betslipActions.removeFromSlips(props.marketField.FieldId));
        } else {
            const isLive = liveState[props.event.MatchId] ? true : false;

            const newSlip = {
                HomeTeamId: props.event.Info.HomeTeamId,
                HomeTeamName: props.event.Info.HomeTeamName,
                AwayTeamId: props.event.Info.AwayTeamId,
                AwayTeamName: props.event.Info.AwayTeamName,
                Active: props.market.Active && props.marketField.Active,
                CategoryId: props.event.Info.CategoryId,
                CategoryName: props.event.Info.CategoryName,
                DateOfMatch: isLive ? new Date() : props.event.Info.DateOfMatch, // "2024-06-10T13:40:58.136Z",
                FieldId: props.marketField.FieldId,
                FieldName: props.marketField.FieldName,
                FieldTypeId: props.marketField.FieldTypeId,
                Line: props.marketField.Line || props.market.MainLine || '',
                Live: isLive,
                MarketName: props.market.MarketName,
                MarketTypeId: props.market.MarketTypeId,
                MatchId: props.event.MatchId,
                // MatchName: "Equatorial Guinea - Malawi",
                Odd: props.odds,
                SportId: props.event.Info.SportId,
                SportName: props.event.Info.SportName,
                TournamentId: props.event.Info.TournamentId,
                TournamentName: props.event.Info.TournamentName,
            };

            const allowed = allowedToAdd(newSlip);
            if (!allowed) return;

            if (slips.length === 0 && !isMobile) {
                dispatch(layoutActions.setShowRight('betslip'));
                dispatch(layoutActions.setShowRightContainer(true));
            }

            dispatch(betslipActions.addToSlips(newSlip));
        }
    };

    const convertOdds = (decimalOdds) => {
        if (!decimalOdds || decimalOdds === '-' || decimalOdds <= 1) {
            return '-';
        }

        switch (selectedOddsFormat) {
            case 'Decimal':
                return decimalOdds.toFixed(2);
            case 'American':
                return decimalOdds >= 2.0 ? `+${Math.round((decimalOdds - 1) * 100)}` : `-${Math.round(100 / (decimalOdds - 1))}`;

            case 'Fractional':
                const numerator = Math.round((decimalOdds - 1) * 100);
                const denominator = 100;
                // Simplify the fraction using a helper function
                const gcd = (a, b) => (b ? gcd(b, a % b) : a);
                const divisor = gcd(numerator, denominator);
                return `${numerator / divisor}/${denominator / divisor}`;

            case 'Hong Kong':
                return (decimalOdds - 1).toFixed(2);

            case 'Indonesian':
                return decimalOdds >= 2.0 ? (decimalOdds - 1).toFixed(2) : (-1 / (decimalOdds - 1)).toFixed(2);

            case 'Malay':
                return decimalOdds >= 2.0 ? (-1 / (decimalOdds - 1)).toFixed(2) : (decimalOdds - 1).toFixed(2);

            default:
                return 'Unknown format type';
        }
    };

    const allowedToAdd = (newSlip) => {
        if (!ticketSettings) return false;

        let allowed = ticketSettings.TicketSettings.MAX_ALLOWED_ODDS_POINTS;
        if (betType === 'System' || hasAnEventMoreThanOnePoint(newSlip)) {
            if (allowed > ticketSettings.TicketSettings.MAX_ALLOWED_SYSTEM_POINTS) allowed = ticketSettings.TicketSettings.MAX_ALLOWED_SYSTEM_POINTS;
        }
        if (slips.length >= allowed) return false;

        return true;
    };

    const hasAnEventMoreThanOnePoint = (newSlip) => {
        let hash = {};
        hash[newSlip.MatchId] = true;
        for (let i = 0; i < slips.length; i++) {
            if (hash[slips[i].MatchId]) return true;
            hash[slips[i].MatchId] = true;
        }
        return false;
    };

    useEffect(() => {
        let timer;

        if (
            !props.odds ||
            !props.market ||
            props.market.Active === false ||
            props.event.PreviousMarkets === undefined ||
            props.event.PreviousMarkets === null ||
            _.isEmpty(props.event.PreviousMarkets)
        ) {
            return;
        }

        const foundMarket = props.event.PreviousMarkets.find((m) => m.MarketId === props.market.MarketId);
        if (foundMarket && foundMarket.MarketFields) {
            const foundMarketField = foundMarket.MarketFields.find((f) => f.FieldId === props.marketField.FieldId);
            if (foundMarketField && props.odds !== currentValue) {
                if (previousValue !== null && props.odds !== previousValue) {
                    const ind = props.odds > previousValue ? 'up' : 'down';
                    setShowIndicator(ind);

                    timer = setTimeout(() => {
                        setShowIndicator(false);
                    }, 7000);
                }

                setPreviousValue(currentValue);
                setCurrentValue(props.odds);
            }
        }

        return () => {
            clearTimeout(timer);
            if (showIndicator) setShowIndicator(false);
        };
    }, [props.odds, props.market, props.marketField, props.event.PreviousMarkets]);

    let elClasses = [classes.OddsButton];
    let elCardClasses = [classes.CardButton];
    if (isSelected) {
        elClasses.push(classes.Selected);
        elCardClasses.push(classes.Selected);
    }
    if (placingBetLoading) {
        elClasses.push(classes.TempDisabled);
        elCardClasses.push(classes.TempDisabled);
    }

    return props.style === 'card' ? (
        <button
            data-field={props.marketField ? `Field:${props.marketField.FieldId}` : `Field:0`}
            className={elCardClasses.join(' ')}
            disabled={props.disabled}
            onClick={(e) => onClick(e)}
        >
            <span className={classes.OddsLabel}>{props.label}</span>
            {convertOdds(props.odds)}
        </button>
    ) : (
        <button
            data-field={props.marketField ? `Field:${props.marketField.FieldId}` : `Field:0`}
            className={elClasses.join(' ')}
            disabled={props.disabled}
            onClick={(e) => onClick(e)}
        >
            <div className={classes.OddsLabel}>{props.label}</div>
            <div className={classes.OddsDelta}>
                <div className={classes.Indicator}>
                    {showIndicator === 'up' && (
                        <div className={classes.Placeholder}>
                            <IndicatorUpIcon className={classes.IndicatorUp} />
                        </div>
                    )}
                    {showIndicator === 'down' && (
                        <div className={classes.Placeholder}>
                            <IndicatorDownIcon className={classes.IndicatorDown} />
                        </div>
                    )}
                </div>
                <div className={classes.Odds}>{convertOdds(props.odds)}</div>
            </div>
        </button>
    );
};

export default OddsButton;
