import { useDispatch, useSelector } from 'react-redux';

import classes from './ChatContainer.module.css';
import Chat2Icon from '../../../assets/svgs/chat2.svg?react';
import CloseButton from '../../UI/Buttons/CloseButton';
import Chat from '../../Chat/Chat';
import { layoutActions } from '../layoutSlice';
import { translate } from '../../../utils/translations';

const ChatContainer = () => {
    const dispatch = useDispatch();
    const lang = useSelector((state) => state.app.lang); // Necessary for rerendering translations

    return (
        <div className={classes.ChatContainer}>
            <header>
                <Chat2Icon />
                <p>{translate('Chat')}</p>
                <CloseButton
                    timesIcon
                    onClick={() => {
                        dispatch(layoutActions.setShowRight('betslip'));
                        dispatch(layoutActions.setShowRightContainer(false));
                    }}
                />
            </header>

            <Chat />
        </div>
    );
};

export default ChatContainer;
