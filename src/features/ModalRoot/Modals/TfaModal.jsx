import classes from './TfaModal.module.css';
import { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { verifyTfa } from '../../../pages/Login/loginAsyncActions';
import MainButton from '../../UI/Buttons/MainButton';
import TimesIcon from '../../../assets/svgs/times.svg?react';
import { translate } from '../../../utils/translations';

const TfaModal = (props) => {
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    const token = useSelector((state) => state.login.tfaToken);
    const [code, setCode] = useState('');
    const controllerRef = useRef(null);

    useEffect(() => {
        return () => {
            if (controllerRef.current) controllerRef.current.abort();
        };
    }, []);

    const verifyTFA = () => {
        if (!code || !token) return;

        if (controllerRef.current) controllerRef.current.abort();
        controllerRef.current = new AbortController();

        dispatch(
            verifyTfa(controllerRef.current.signal, code, token, navigate, location.pathname, () => {
                setCode('');
                if (props.onSet) props.onSet(); 
            })
        );
    };

    return (
        <div className={classes.TfaModal}>
            <div className={classes.CloseButton} onClick={() => navigate(location.pathname)}>
                <TimesIcon />
            </div>

            <div className={classes.OtpCheck}>
                <div className={classes.OtpHeader}>
                    <h5>{translate('Two Factor Authentication')}</h5>
                </div>
                <div className={classes.OtpContent}>
                    <span>{translate('Verification Code')}</span>
                    <div className={classes.InputWrapper}>
                        <input value={code} onChange={(e) => setCode(e.target.value)} placeholder={translate('Code')} />
                        <div>
                            <MainButton color="primary" onClick={verifyTFA}>
                                {translate('VERIFY')}
                            </MainButton>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TfaModal;
