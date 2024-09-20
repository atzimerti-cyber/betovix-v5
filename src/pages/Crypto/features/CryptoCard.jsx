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

    const [currentPrice, setCurrentPrice] = useState({ price: 0.00, diff: 0.00 });

    return (
        <div className={classes.CryptoCard} style={{ '--crypto-color': '#2d6541a3', cursor: 'default' }}>
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
                {/* <p className={currentPrice.diff < 0 ? [classes.Delta, classes.Lower].join(' ') : classes.Delta}>
                    {currentPrice.diff >= 0 && '+'}
                    {addThousandsSeparator(currentPrice.diff)}%
                </p> */}
            </div>
        </div>
    );
};

export default CryptoCard;
