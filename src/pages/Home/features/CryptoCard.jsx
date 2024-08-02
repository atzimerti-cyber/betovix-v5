import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import classes from './CryptoCard.module.css';
import { addThousandsSeparator } from '../../../utils/custom';

const CryptoCard = (props) => {
    //const cryptoPrices = useSelector((state) => state.crypto.cryptoPrices);
    //const crypto = useSelector((state) => state.crypto.crypto);

    const [currentPrice, setCurrentPrice] = useState({ price: 0.00, diff: 0.00 });


    ////////////////////////k
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
    //         console.log("Updating state");
    //     }
    // }, [crypto]);

    // useEffect(() => {
    //     console.log("useEffect");
    //     if (crypto && Array.isArray(crypto)) {

    //         const cryptoCoin = crypto.find(cryptoItem => cryptoItem.Code === props.item.Code);

    //         if (cryptoCoin) {
    //             setCurrentPrice(prevState => {
    //                 const newPrice = cryptoCoin.Rate;
    //                 const newDiff = calculateDiff(prevState.price, newPrice);

    //                 return {
    //                     ...prevState,
    //                     price: newPrice,
    //                     diff: newDiff
    //                 };
    //             });
    //         }
    //     }
    // }, []);


    const calculateDiff = (prevPrice, newPrice) => {
        if (!prevPrice || !newPrice) return 0;
        return ((newPrice - prevPrice) / prevPrice) * 100;
    };
    /////////////////////////////////////////////////


    ///gk
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

    return (
        <>
            <div className={classes.ImageContainer}>
                <img src={props.item.Logo} loading='lazy' alt='Ethereum' />
            </div>
            {props.item.network && <div className={classes.Network}>({props.item.network})</div>}
            {props.item.Rate &&
                <span className={classes.Price}>${props.item.Rate > 0.01 ? addThousandsSeparator(props.item.Rate) : parseFloat((props.item.Rate).toFixed(6))}</span>}
            {/* {currentPrice.price &&
                <span className={classes.Price}>${currentPrice.price > 0.01 ? addThousandsSeparator(currentPrice.price) : parseFloat((currentPrice.price).toFixed(6))}</span>} */}

            <span className={currentPrice.diff < 0 ? [classes.Delta, classes.Lower].join(' ') : classes.Delta}>
                {currentPrice.diff >= 0 && '+'}
                {addThousandsSeparator(currentPrice.diff)}%
            </span>
        </>
    );
};

export default CryptoCard;
