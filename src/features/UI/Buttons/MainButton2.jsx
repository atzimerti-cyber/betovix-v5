import { useRef, useEffect } from 'react';

import classes from './MainButton2.module.css';
import Spinner from '../Spinner/Spinner';

const MainButton2 = (props) => {
    const timeoutRef = useRef(null);

    let elClasses = [classes.MainButton];

    if (props.disabled) elClasses.push(classes.Disabled);

    const onClick = (e) => {
        e.preventDefault();
        timeoutRef.current = setTimeout(props.onClick, 150);
    };

    useEffect(() => {
        return () => clearTimeout(timeoutRef.current);
    }, []);

    return (
        <button onClick={onClick} className={elClasses.join(' ')} data-tooltip-id={props.dataTooltipId} data-tooltip-content={props.dataTooltipContent}>
            {props.loading ? <Spinner /> : props.children}
        </button>
    );
};

export default MainButton2;
