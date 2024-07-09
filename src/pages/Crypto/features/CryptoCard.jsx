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

    const crypto = useSelector((state) => state.crypto.crypto);
    const user = useSelector((state) => state.login.user);
    // const cryptoPrices = useSelector((state) => state.crypto.cryptoPrices);

    const [currentPrice, setCurrentPrice] = useState({ price: 0.00, diff: 0.00 });

    // useEffect(() => {
    //     console.log("useEffect triggered", crypto);
    //     if (crypto && Array.isArray(crypto)) {
    //         console.log("crypto array", crypto);
    //         const cryptoCoin = crypto.find(cryptoItem => cryptoItem.Code === props.item.Code);
    //         console.log("Found cryptoCoin", cryptoCoin);

    //         if (cryptoCoin) {
    //             setCurrentPrice(prevState => ({
    //                 ...prevState,
    //                 price: cryptoCoin.Rate,
    //                 diff: calculateDiff(prevState.price, cryptoCoin.Rate)
    //             }));
    //         }
    //     }
    // }, [crypto]);
    
    const calculateDiff = (prevPrice, newPrice) => {
        if (!prevPrice || !newPrice) return 0;
        return ((newPrice - prevPrice) / prevPrice) * 100;
    };

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
            dispatch(cryptoActions.setSelectedNetwork(props.Code));
            navigateToModal('cashier', 'deposit', 'crypto');
        } else navigateToModal('auth', 'login');
    };

    return (
        <div className={classes.CryptoCard} style={{ '--crypto-color': '#2d6541a3' }} onClick={onClick}>
            <div className={classes.LogoContainer}>
                <div className={classes.ImageContainer}>
                    <img src={props.item.Logo} loading='lazy' alt={props.item.Code} />
                </div>
                <p>
                    {props.item.Name} {props.item.network && `(${props.item.network})`}
                </p>
            </div>

            <div className={classes.PriceContainer}>
            {props.item.Rate &&
                <span className={classes.Price}>${props.item.Rate > 0.01 ? addThousandsSeparator(props.item.Rate) : parseFloat((props.item.Rate).toFixed(6))}</span>}
                {/* {currentPrice.price && 
                <p className={classes.Price}>€{currentPrice.price > 0.01 ? addThousandsSeparator(currentPrice.price) : parseFloat((currentPrice.price).toFixed(6))}</p>} */}
                <p className={currentPrice.diff < 0 ? [classes.Delta, classes.Lower].join(' ') : classes.Delta}>
                    {currentPrice.diff >= 0 && '+'}
                    {addThousandsSeparator(currentPrice.diff)}%
                </p>
            </div>
        </div>
    );
};

export default CryptoCard;
