import classes from './MainInput.module.css';
import TimesIcon from '../../../assets/svgs/times.svg?react';

const MainInput = (props) => {
    let elClasses = [classes.InputWrapper];
    if (props.rightIcon) elClasses.push(classes.WithRightIcon);
    if (props.isInvalid) elClasses.push(classes.IsInvalid);
    if (props.inSettings) elClasses.push(classes.inSettings);

    const onChange = (value) => {
        if (!value) value = '';

        props.onChange(value);
    };

    return (
        <div className={elClasses.join(' ')}>
            <input
                className={classes.MainInput}
                id= {props.id}
                role={props.role}
                type={props.type}
                name={props.name}
                autoComplete={props.noAutoComplete ? 'new-password' : null}
                placeholder={props.placeholder}
                value={props.value || ''}
                onChange={(e) => onChange(e.target.value)}
                onBlur={props.onBlur || null}
                required={props.required}
            />
            {props.rightIcon && props.value && (
                <button className={classes.RightButton} type='button'>
                    {props.rightIcon}
                </button>
            )}
            {props.value && props.clearable && (
                <span className={[classes.RightIcon, classes.DeleteIcon].join(' ')} onClick={() => onChange(null)}>
                    <TimesIcon />
                </span>
            )}
        </div>
    );
};

export default MainInput;
