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

    const [currentPrice, setCurrentPrice] = useState({ price: null, diff: null });

    useEffect(() => {
        //console.log(crypto);
        if (crypto && Array.isArray(crypto)) {
            const cryptoCoin = crypto.find((cryptoItem) => cryptoItem.Code === props.item.Code);

            if (cryptoCoin) {
                setCurrentPrice((prevState) => ({
                    ...prevState,
                    price: cryptoCoin.Rate,
                    diff: calculateDiff(prevState.price, cryptoCoin.Rate),
                }));
            }
        }
    }, [crypto]);

    //With getCryptoPrices
    // useEffect(() => {
    //     console.log(cryptoPrices);
    //     if (cryptoPrices && Array.isArray(cryptoPrices)) {
    //         const crypto = cryptoPrices.find(item => item.Code === props.item.short);

    //         if (crypto) {
    //             setCurrentPrice(prevState => ({
    //                 ...prevState,
    //                 price: crypto.Rate,
    //                 diff: calculateDiff(prevState.price, crypto.Rate)
    //             }));
    //         }
    //     }
    // }, [cryptoPrices, props.item.short]);

    ////////////////////////
    const calculateDiff = (prevPrice, newPrice) => {
        if (!prevPrice || !newPrice) return 0;
        return ((newPrice - prevPrice) / prevPrice) * 100;
    };
    /////////////////////////////////////////////////

    // useEffect(() => {
    //     if (props.item.id === 'ERC-20' || props.item.id === 'BEP-20') {
    //         setCurrentPrice({ price: 1, diff: 0 });
    //         return;
    //     }

    //     if (!cryptoPrices['1min'][props.item.id]) return;

    //     const price24hr = cryptoPrices['24hr'][props.item.id];
    //     const price1min = cryptoPrices['1min'][props.item.id];
    //     const diff = 100 * (1 - price24hr / price1min);

    //     setCurrentPrice({ price: price1min, diff: diff });
    // }, [cryptoPrices['1min'][props.item.id]]);

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
                {currentPrice.price && (
                    <p className={classes.Price}>
                        ${currentPrice.price > 0.01 ? addThousandsSeparator(currentPrice.price) : parseFloat(currentPrice.price.toFixed(6))}
                    </p>
                )}
                <p className={currentPrice.diff < 0 ? [classes.Delta, classes.Lower].join(' ') : classes.Delta}>
                    {currentPrice.diff >= 0 && '+'}
                    {addThousandsSeparator(currentPrice.diff)}%
                </p>
            </div>
        </div>
    );
};

export default CryptoCard;
