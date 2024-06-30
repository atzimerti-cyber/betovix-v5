import classes from './BalanceSeparate.module.css';

const BalanceSeparate = (props) => {
    const balanceInteger = Math.floor(props.balance);
    let balanceDecimal = ((props.balance % 1) * 100).toFixed(0);
    balanceDecimal = balanceDecimal.padStart(2, '0');

    return (
        <span className={classes.BalanceSeparate}>
            {balanceInteger}
            <span>.{balanceDecimal}</span>
        </span>
    );
};

export default BalanceSeparate;
