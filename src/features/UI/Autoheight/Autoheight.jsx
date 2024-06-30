import classes from './Autoheight.module.css';

const Autoheight = (props) => {
    return (
        <div className={props.show ? [classes.Autoheight, classes.Show].join(' ') : classes.Autoheight}>
            <div className={classes.AutoheightContent}>{props.children}</div>
        </div>
    );
};

export default Autoheight;
