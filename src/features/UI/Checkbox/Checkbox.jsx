import classes from './Checkbox.module.css';

const Checkbox = ({ label, checked, ...props }) => {
    return (
        <div className={classes.MainCheckboxWrapper}>
            <label>
                <input
                    type='checkbox'
                    checked={checked ? checked : false}
                    name={props.name}
                    {...props}
                    onChange={props.onChange}
                    className={checked ? classes.Checked : null}
                />
                <span>{label}</span>
            </label>
        </div>
    );
};

export default Checkbox;
