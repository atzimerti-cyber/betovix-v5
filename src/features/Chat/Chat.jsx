import Chat2Icon from '../../assets/svgs/chat2.svg?react';
import { translate } from '../../utils/translations';
import classes from './Chat.module.css';

const Chat = () => {
    return (
        <div className={classes.Chat}>
            <div className={classes.Divider}></div>

            <div className={classes.ClosedWrapper}>
                <div className={classes.Closed}>
                    <Chat2Icon />
                    <div className={classes.ClosedTitle}>{translate('Chat is currently closed')}</div>
                    <div className={classes.ClosedText}>{translate('Please try again at a later time')}</div>
                </div>
            </div>
        </div>
    );
};

export default Chat;
