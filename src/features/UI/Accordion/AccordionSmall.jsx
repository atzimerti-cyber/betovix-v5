import { useState } from 'react';

import classes from './AccordionSmall.module.css';
import AngleDownIcon from '../../../assets/svgs/angle-down.svg?react';
import Ripple from '../Ripple/Ripple';

const AccordionSmall = (props) => {
    const [isOpen, setIsOpen] = useState(props.initOpen);

    return (
        <section className={isOpen ? [classes.Accordion, classes.Open].join(' ') : classes.Accordion}>
            <div className={classes.AccordionBase}>
                <div
                    className={classes.AccordionHeader}
                    onClick={(e) => {
                        e.stopPropagation();
                        if (!isOpen && props.onOpen) props.onOpen();

                        setIsOpen(!isOpen);
                    }}
                >
                    <Ripple type='square' faint />

                    {props.icon && <span className={classes.IconWrapper}>{props.icon}</span>}
                    <span className={classes.HeaderContent}>{props.title}</span>
                    <AngleDownIcon />
                </div>

                {isOpen && <div className={classes.AccordionBody}>{props.children}</div>}
            </div>
        </section>
    );
};

export default AccordionSmall;
