import { useSelector } from 'react-redux';
import classes from './TabsPill.module.css';
import Ripple from '../Ripple/Ripple';

const TabsPill = (props) => {
    const showRight = useSelector((state) => state.layout.showRight);

    return (
        <div role={props.role} className={classes.Tabs}>
            {props.tabs.map((tab) => {
                return (
                    <div
                        key={tab.id}
                        role='tab'
                        className={showRight === tab.id ? [classes.Tab, classes.Active].join(' ') : classes.Tab}
                        onClick={() => props.onChangeTab(tab.id)}
                    >
                        {tab.icon}
                        <p>{tab.label}</p>
                        <Ripple />
                    </div>
                );
            })}
        </div>
    );
};

export default TabsPill;
