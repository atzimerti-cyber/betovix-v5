import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import MainButton from '../../features/UI/Buttons/MainButton';

const Lounge = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const addParamsToUrl = (modal, tab) => {
        const searchParams = new URLSearchParams(location.search);
        searchParams.set('modal', modal);
        if (tab) searchParams.set('tab', tab);

        navigate(`${location.pathname}?${searchParams.toString()}`, { replace: true });
    };

    return (
        <MainButton color='tomato' onClick={() => addParamsToUrl('achievement')}>
           
        </MainButton>
    )
};

export default Lounge;
