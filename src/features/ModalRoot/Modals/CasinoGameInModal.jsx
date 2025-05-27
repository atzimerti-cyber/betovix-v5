import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import classes from './CasinoGameInModal.module.css'

import CasinoGame from '../../../pages/CasinoGame/CasinoGame'


const CasinoGameInModal = (props) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
        return () => {
            searchParams.delete('modal');
            searchParams.delete('gameid');
            searchParams.delete('isBonus');
            searchParams.delete('ty');
            searchParams.delete('pn');
            searchParams.delete('bgid');
            searchParams.delete('name');
            setSearchParams(searchParams);
        };
    }, [searchParams, setSearchParams]);

    return (
        <div className={classes.GameModal}>
            <CasinoGame noMenu={true} />
        </div>
    );
};

export default CasinoGameInModal;
