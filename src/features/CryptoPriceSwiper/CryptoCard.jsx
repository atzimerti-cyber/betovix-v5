import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import classes from './CryptoCard.module.css';
import { addThousandsSeparator } from '../../utils/custom';

const CryptoCard = (props) => {

    return (
        <>
            <div className={classes.ImageContainer}>
                <img src={props.item.Logo} loading='lazy' alt='Ethereum' />
            </div>
            {props.item.Rate &&
                <span className={classes.Price}>$ {props.item.Rate > 0.01 ? addThousandsSeparator(props.item.Rate) : parseFloat((props.item.Rate).toFixed(6))}</span>}

        </>
    );
};

export default CryptoCard;
