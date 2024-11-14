import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useMediaQuery } from "react-responsive";

import classes from './AnnouncementModal.module.css';
import { translate } from '../../../utils/translations';
import MainButton from "../../UI/Buttons/MainButton";
import SupportIcon from "../../../assets/svgs/livechat.svg?react";
import EmailIcon from "../../../assets/svgs/sentEmail.svg?react";

const AnnouncementModal = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const siteSettings = useSelector((state) => state.app.siteSettings);
    const [logo, setLogo] = useState(null);
    const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

    useEffect(() => {
        if (!siteSettings) {
            navigate(location.pathname);
        } else {
            if(isMobile) {
                setLogo(siteSettings.AnouncementImgMobile);
            } else {
                setLogo(siteSettings.AnouncementImg);
            }
        }
    }, [siteSettings, navigate, location.pathname, isMobile]);


    const addParamsToUrl = (modal, tab) => {
        const searchParams = new URLSearchParams(location.search);
        searchParams.set("modal", modal);
        if (tab) searchParams.set("tab", tab);
    
        navigate(`${location.pathname}?${searchParams.toString()}`, {
          replace: true,
        });
    };

     useEffect(() => {
         return () => {
             localStorage.setItem('promoShown', 'true');
           };
     }, []);

      

    return (
        <div className={classes.AnnouncementModal}>
            <div className={classes.ModalContent}>
                <div className={classes.AnnouncementForm}>
                    <div className={classes.PromoContainer}>
                        <div className={classes.ImageContainer}>
                            {logo && (
                                <div style={{ backgroundImage: `url(${logo})` }}></div>
                            )}                       
                        </div>
                    </div>
                    <div className={classes.FormSection}>
                        <div className={classes.ButtonWrapper}>
                            <label>
                                {translate("Don't have an account")}?
                            </label>
                            <MainButton
                                color="dark"
                                onClick={() => addParamsToUrl("auth", "register")}
                            >
                                {translate("REGISTER")}
                            </MainButton>
                          
                        </div>
                        <div className={classes.ButtonWrapper}>
                            <label>
                                {translate("Already have an account")}?
                            </label>
                            <MainButton
                                color="secondary"
                                onClick={() => addParamsToUrl("auth", "login")}
                            >
                                {translate("LOGIN")}
                            </MainButton>
                        </div>
                       
                    </div>
                    <div className={classes.ContactSection}>
                        <div className={classes.ButtonWrapper}>
                            <MainButton
                                color="dark"
                                onClick={() => navigate("/support")}
                            >
                                {translate("Live Chat")}                     
                                <SupportIcon />

                            </MainButton>

                        </div>
                        <div className={classes.ButtonWrapper}>
                            <MainButton

                                color="dark"
                                onClick={() => {
                                    window.location.href = "mailto:support@betovix.com";
                                }}
                            >
                                {translate("Email")}
                                <EmailIcon />
                            </MainButton>
                        </div>
                       
                    </div>
                    <div className={classes.InformationSection}>
                        <p>
                        {translate("Bet responsibly and stay in control. For more information")},{" "}
                            <span
                                style={{ color: "var(--db-gray-5)", textDecoration: "underline", cursor: "pointer" }}
                                onClick={() => navigate("/rpg")}
                            >
                                {translate("visit our Responsible Gaming Policy")}
                            </span>{" "}
                            {translate("to keep gaming fun and safe for everyone")}.
                        </p>
                    </div>
                </div>
                
            </div>
        </div>
    );
};

export default AnnouncementModal;
