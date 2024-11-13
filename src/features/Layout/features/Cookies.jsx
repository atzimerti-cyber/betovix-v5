import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import classes from './Cookies.module.css'; // Your custom styles
import MainButton from "../../UI/Buttons/MainButton";
import { translate } from '../../../utils/translations';

const Cookies = () => {
    const navigate = useNavigate();
    const [isVisible, setIsVisible] = useState(false);

    // Check localStorage when the component mounts
    useEffect(() => {
        const isAccepted = localStorage.getItem('cookiesAccepted');
        if (!isAccepted) {
            setIsVisible(true); // Show the modal if not accepted
        }
    }, []);

    // Function to handle accept button click
    const handleAccept = () => {
        localStorage.setItem('cookiesAccepted', 'true'); // Save acceptance to localStorage
        setIsVisible(false); // Hide the modal
    };

    if (!isVisible) return null;

    return (
        <div className={classes.Cookies}>
            <div className={classes.Content}>
                <div className={classes.CookiesContent}>
                    <p>
                    {translate('We use only the necessary cookies to ensure the proper functioning of our website and the safety of your browsing experience. By using our website, you agree to the use of cookies.')}{' '}
                        <span
                            className={classes.MoreInfo}
                            onClick={() => navigate('/terms-and-conditions')}
                            style={{ color: 'var(--db-gray-5)', textDecoration: 'underline', cursor: 'pointer' }}
                        >
                          {translate('More Info')}
                                                
                        </span>
                    </p>
                    <MainButton

                        color="secondary"
                        onClick={handleAccept}
                        className={classes.AcceptButton}
                    >
                        {translate('Accept')}
                    </MainButton>
                </div>
            </div>
        </div>
    );
};

export default Cookies;
