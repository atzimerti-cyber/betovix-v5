import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import classes from './CryptoCard.module.css';
import { addThousandsSeparator } from '../../../utils/custom';

const CryptoCard = (props) => {
    const cryptoPrices = useSelector((state) => state.crypto.cryptoPrices);

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

    return (
        <>
            <div className={classes.ImageContainer}>
                <img src={props.item.icon} loading='lazy' alt='Ethereum' />
            </div>
            {props.item.network && <div className={classes.Network}>({props.item.network})</div>}
            <span>${currentPrice.price > 0.01 ? addThousandsSeparator(currentPrice.price) : currentPrice.price}</span>
            <span className={currentPrice.diff < 0 ? [classes.Delta, classes.Lower].join(' ') : classes.Delta}>
                {currentPrice.diff >= 0 && '+'}
                {addThousandsSeparator(currentPrice.diff)}%
            </span>
        </>
    );
};

export default CryptoCard;
