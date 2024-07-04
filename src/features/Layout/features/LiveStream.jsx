import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';

import classes from './LiveStream.module.css';
import DraggableBox from '../../UI/DraggableBox/DraggableBox';
import { sportsbookActions } from '../../../pages/SportsBook/sportsbookSlice';
import Warning3Icon from '../../../assets/svgs/warning3.svg?react';
import MainButton from '../../UI/Buttons/MainButton';
import { translate, translateNameWithLang } from '../../../utils/translations';

const LiveStream = (props) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const lang = useSelector((state) => state.app.lang); // Necessary for rerendering translations
    const user = useSelector((state) => state.login.user);

    const addParamsToUrl = (modal, tab) => {
        const searchParams = new URLSearchParams(location.search);
        searchParams.set('modal', modal);
        if (tab) searchParams.set('tab', tab);

        navigate(`${location.pathname}?${searchParams.toString()}`, { replace: true });
    };

    return (
        <DraggableBox
            title={
                props.showVideoFor.Info.AwayTeamName
                    ? `${translateNameWithLang(props.showVideoFor.Info.HomeTeamName)} vs ${translateNameWithLang(props.showVideoFor.Info.AwayTeamName)}`
                    : translateNameWithLang(props.showVideoFor.Info.HomeTeamName)
            }
            onClose={() => dispatch(sportsbookActions.setShowVideoFor(null))}
        >
            <div className={classes.Container}>
                <div className={classes.ContainerInner}>
                    {!user && (
                        <div className={classes.UnavailableStream}>
                            <Warning3Icon className={classes.WarningIcon} />
                            <p className={classes.UnavailableStreamText}>{translate('You must be logged-in to watch.')}</p>
                            <div className={classes.UnavailableStreamButtons}>
                                <MainButton color='primary' size='small' onClick={() => addParamsToUrl('auth', 'login')}>
                                    {translate('Login')}
                                </MainButton>
                                <MainButton color='dark' size='small' onClick={() => addParamsToUrl('auth', 'register')}>
                                    {translate('Register')}
                                </MainButton>
                            </div>
                        </div>
                    )}

                    {user && user.Wallet.Balance === 0 && (
                        <div className={classes.UnavailableStream}>
                            <Warning3Icon className={classes.WarningIcon} />
                            <p className={classes.UnavailableStreamText}>{translate('Your account has insufficient funds.')}</p>
                            <div className={classes.UnavailableStreamButtons}>
                                <MainButton color='primary' size='small' onClick={() => addParamsToUrl('cashier', 'deposit')}>
                                    {translate('Deposit now to watch')}
                                </MainButton>
                            </div>
                        </div>
                    )}

                    {user && user.Wallet.Balance > 0 && (
                        <video
                            id='video'
                            className={classes.VideoPlayer}
                            controls
                            src='blob:https://pick777.net/512772cd-0575-42a7-9ac6-bcdb9e086bab'
                            width='640'
                            height='480'
                        ></video>
                    )}
                </div>
            </div>
        </DraggableBox>
    );
};

export default LiveStream;
