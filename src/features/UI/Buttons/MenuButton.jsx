import classes from './MenuButton.module.css';

const MenuButton = (props) => {
    return (
        <button onClick={props.onClick} className={classes.MenuButton}>
            {props.children}
        </button>
    );
};

export default MenuButton;
