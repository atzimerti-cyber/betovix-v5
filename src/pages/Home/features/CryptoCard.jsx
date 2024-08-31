import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import classes from './CryptoCard.module.css';
import { addThousandsSeparator } from '../../../utils/custom';

const CryptoCard = (props) => {

    // const [currentPrice, setCurrentPrice] = useState({ price: 0.00, diff: 0.00 });

    // const calculateDiff = (prevPrice, newPrice) => {
    //     if (!prevPrice || !newPrice) return 0;
    //     return ((newPrice - prevPrice) / prevPrice) * 100;
    // };

    return (
        <>
            <div className={classes.ImageContainer}>
                <img src={props.item.Logo} loading='lazy' alt='Ethereum' />
            </div>
            {/* {props.item.Code && <div className={classes.Network}>({props.item.Code})</div>} */}
            {props.item.Rate &&
                // <span className={classes.Price}>{props.item.Id} €</span>}
                <span className={classes.Price}>{props.item.Rate > 0.01 ? addThousandsSeparator(props.item.Rate) : parseFloat((props.item.Rate).toFixed(6))} €</span>}
            {/* {currentPrice.price &&
                <span className={classes.Price}>${currentPrice.price > 0.01 ? addThousandsSeparator(currentPrice.price) : parseFloat((currentPrice.price).toFixed(6))}</span>} */}

            {/* <span className={currentPrice.diff < 0 ? [classes.Delta, classes.Lower].join(' ') : classes.Delta}>
                {currentPrice.diff >= 0 && '+'}
                {addThousandsSeparator(currentPrice.diff)}%
            </span> */}
            
        </>
    );
};

export default CryptoCard;
