import classes from './MainInput2.module.css';

const MainInput2 = (props) => {
    let elClasses = [classes.InputContainer];

    if (props.textPosition === 'right') elClasses.push(classes.TextRight);
    if (props.readonly) elClasses.push(classes.ReadOnly);

    return (
        <div className={elClasses.join(' ')}>
            <input
                id={props.id}
                className={classes.MainInput}
                type={props.type}
                name={props.name}
                autoComplete='off'
                placeholder={props.placeholder}
                value={props.value}
                onChange={props.onChange && ((e) => props.onChange(e.target.value))}
                onBlur={props.onBlur ? props.onBlur : null}
                readOnly={props.readonly ? true : false}
            />
        </div>
    );
};

export default MainInput2;
