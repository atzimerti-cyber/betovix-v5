import classes from './Tabs.module.css';
import Ripple from '../Ripple/Ripple';
import CloseButton from '../Buttons/CloseButton';

const Tabs = (props) => {
    let elClasses = [classes.Tabs];
    if (props.type === 'buttons') elClasses.push(classes.AsButtons);
    else elClasses.push(classes.AsTabs);

    if (props.noMargin) elClasses.push(classes.NoMargin);
    if (props.Width100) elClasses.push(classes.Width100);
    if (props.withUnderline) elClasses.push(classes.WithUnderline);
    if (props.lighterColor) elClasses.push(classes.LighterColor);

    return (
        <div className={elClasses.join(' ')}>
            <div className={classes.TabsInner}>
                {props.tabs.map((tab) => {
                    let tabClasses = [classes.Tab];
                    if (tab.disabled) tabClasses.push(classes.Disabled);
                    else if (tab.active) tabClasses.push(classes.Active);

                    return (
                        <div key={tab.id} role='tab' className={tabClasses.join(' ')} onClick={() => props.onChangeTab(tab.id)}>
                            <p>{tab.label}</p>
                            {props.type === 'buttons' && <Ripple type='square' />}
                        </div>
                    );
                })}
                {props.onClose && (
                    <div>
                        <CloseButton timesIcon size='small' onClick={props.onClose} />
                    </div>
                )}
            </div>
        </div>
    );
};

export default Tabs;
