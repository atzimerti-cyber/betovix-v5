import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

import classes from './PromotionModal.module.css';
import { translate } from '../../../utils/translations';
import MainButton from "../../UI/Buttons/MainButton";
import { getPromoPageById, getPromoPageBySlug  } from "../modalAsyncActions";
import { modalActions } from '../modalSlice';
import CloseButton from '../../UI/Buttons/CloseButton';

const PromotionModal = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
  
    const lang = useSelector((state) => state.app.lang);
    const promoPage = useSelector((state) => state.modal.promoPage);
  
    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;

        const searchParams = new URLSearchParams(location.search);
        const pageId = searchParams.get("pageId");
        const slug = searchParams.get("slug");

        if (pageId) dispatch(getPromoPageById(signal, pageId));
        if (slug) dispatch(getPromoPageBySlug(signal, slug));

        return () => dispatch(modalActions.setPromoPage(null));

    }, []);

    return (
        <div className={classes.PromotionModal}>
            <div className={classes.CloseButtonCont}>
            <CloseButton timesIcon color='transparent' onClick={() => navigate(location.pathname)} />

            </div>

            <div className={classes.ModalContent}>
                {promoPage && promoPage.Content ? (
                    <div
                        dangerouslySetInnerHTML={{ __html: promoPage.Content }}
                    ></div>
                ) : (
                    <div className={classes.NoPageContent}>
                        {translate("No Available Information")}
                    </div>
                )}
            </div>
        </div>
    );
};

export default PromotionModal;
