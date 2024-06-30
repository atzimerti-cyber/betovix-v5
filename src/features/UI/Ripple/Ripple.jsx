import { useState, useLayoutEffect } from 'react';
import classes from './Ripple.module.css';

const useDebouncedRippleCleanUp = (rippleCount, duration, cleanUpFunction) => {
    useLayoutEffect(() => {
        let bounce = null;
        if (rippleCount > 0) {
            clearTimeout(bounce);

            bounce = setTimeout(() => {
                cleanUpFunction();
                clearTimeout(bounce);
            }, duration * 4);
        }

        return () => clearTimeout(bounce);
    }, [rippleCount, duration, cleanUpFunction]);
};

const Ripple = ({ duration = 850, color = '#fff', type = 'circle', faint = false, opacity = 0.2 }) => {
    if (faint) color = 'rgba(255,255,255,0.4)';

    const [rippleArray, setRippleArray] = useState([]);

    let elClasses = [classes.RippleContainer];
    if (type === 'square') elClasses.push(classes.Square);

    useDebouncedRippleCleanUp(rippleArray.length, duration, () => {
        setRippleArray([]);
    });

    const addRipple = (event) => {
        const rippleContainer = event.currentTarget.getBoundingClientRect();
        const size = rippleContainer.width > rippleContainer.height ? rippleContainer.width : rippleContainer.height;
        const x = event.pageX - rippleContainer.x - size / 2;
        const y = event.pageY - rippleContainer.y - size / 2;
        const newRipple = {
            x,
            y,
            size,
        };

        setRippleArray([...rippleArray, newRipple]);
    };

    return (
        <div className={elClasses.join(' ')} onMouseDown={addRipple}>
            {rippleArray.length > 0 &&
                rippleArray.map((ripple, index) => {
                    return (
                        <span
                            key={'span' + index}
                            style={{
                                top: ripple.y,
                                left: ripple.x,
                                width: ripple.size,
                                height: ripple.size,
                                backgroundColor: color,
                                animationDuration: duration + 'ms',
                                opacity: opacity,
                            }}
                        />
                    );
                })}
        </div>
    );
};

export default Ripple;
