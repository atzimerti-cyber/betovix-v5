import { useSelector, useDispatch } from 'react-redux';

import TabsPill from '../../UI/Tabs/TabsPill';
import { layoutActions } from '../layoutSlice';
import Betslip from '../../Betslip/Betslip';
import Chat from '../../Chat/Chat';
import CloseButton from '../../UI/Buttons/CloseButton';
import classes from './RightContainer.module.css';
import BetslipIcon from '../../../assets/svgs/betslip.svg?react';
import ChatIcon from '../../../assets/svgs/chat.svg?react';
import { translate } from '../../../utils/translations';

const RightContainer = () => {
    const dispatch = useDispatch();

    const showRight = useSelector((state) => state.layout.showRight);

    return (
        <div className={classes.RightContainer}>
            <div className={classes.InnerContainer}>
                <div className={classes.TabsWrapper}>
                    <TabsPill
                        role='tablist'
                        tabs={[
                            { id: 'betslip', icon: <BetslipIcon />, label: translate('Betslip') },
                            { id: 'chat', icon: <ChatIcon />, label: translate('Chat') },
                        ]}
                        onChangeTab={(tab) => dispatch(layoutActions.setShowRight(tab))}
                    />

                    <div className={classes.TabContent}>{showRight === 'betslip' ? <Betslip /> : <Chat />}</div>
                </div>
                <CloseButton color='transparent' onClick={() => dispatch(layoutActions.setShowRightContainer(false))} />
            </div>
        </div>
    );
};

export default RightContainer;
