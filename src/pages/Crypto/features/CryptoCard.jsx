import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';

import classes from './CryptoCard.module.css';
import { addThousandsSeparator } from '../../../utils/custom';
import { cryptoActions } from '../cryptoSlice';

const CryptoCard = (props) => {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();

    const cryptoPrices = useSelector((state) => state.crypto.cryptoPrices);
    const user = useSelector((state) => state.login.user);

    const [currentPrice, setCurrentPrice] = useState({ price: null, diff: null });

    useEffect(() => {
        if (props.item.id === 'ERC-20' || props.item.id === 'BEP-20') {
            setCurrentPrice({ price: 1, diff: 0 });
            return;
        }

        if (!cryptoPrices['1min'][props.item.id]) return;

        const price24hr = cryptoPrices['24hr'][props.item.id];
        const price1min = cryptoPrices['1min'][props.item.id];
        const diff = 100 * (1 - price24hr / price1min);

        setCurrentPrice({ price: price1min, diff: diff });
    }, [cryptoPrices['1min'][props.item.id]]);

    const navigateToModal = (modal, tab, method) => {
        const searchParams = new URLSearchParams(location.search);
        searchParams.set('modal', modal);
        searchParams.set('tab', tab);

        if (method) searchParams.set('method', method);

        navigate(`${location.pathname}?${searchParams.toString()}`, { replace: true });
    };

    const onClick = () => {
        if (user) {
            dispatch(cryptoActions.setSelectedCurrency(props.item));
            navigateToModal('cashier', 'deposit', 'crypto');
        } else navigateToModal('auth', 'login');
    };

    return (
        <div className={classes.CryptoCard} style={{ '--crypto-color': props.item.color }} onClick={onClick}>
            <div className={classes.LogoContainer}>
                <div className={classes.ImageContainer}>
                    <img src={props.item.icon} loading='lazy' alt={props.item.label} />
                </div>
                <p>
                    {props.item.label} {props.item.network && `(${props.item.network})`}
                </p>
            </div>

            <div className={classes.PriceContainer}>
                <p className={classes.Price}>${currentPrice.price > 0.01 ? addThousandsSeparator(currentPrice.price) : currentPrice.price}</p>
                <p className={currentPrice.diff < 0 ? [classes.Delta, classes.Lower].join(' ') : classes.Delta}>
                    {currentPrice.diff >= 0 && '+'}
                    {addThousandsSeparator(currentPrice.diff)}%
                </p>
            </div>
        </div>
    );
};

export default CryptoCard;
