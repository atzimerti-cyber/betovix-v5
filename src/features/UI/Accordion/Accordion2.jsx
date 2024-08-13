import { useState } from 'react';

import classes from './Accordion2.module.css';
import AngleDownIcon from '../../../assets/svgs/angle-down.svg?react';

const Accordion2 = (props) => {
    const [isOpen, setIsOpen] = useState(props.initOpen);

    return (
        <section className={isOpen ? [classes.Accordion, classes.Open].join(' ') : classes.Accordion}>
            <div
                className={classes.Title}
                onClick={(e) => {
                    e.stopPropagation();
                    if (!isOpen && props.onOpen) props.onOpen();

                    setIsOpen(!isOpen);
                }}
            >
                {props.icon && <div className={classes.TitleIcon}>{props.icon}</div>}
                <div className={classes.TitleName}>{props.title}</div>
                <AngleDownIcon className={classes.DropdownIcon} />
            </div>

            {isOpen && <div className={classes.AccordionBody}>{props.children}</div>}
        </section>
    );
};

export default Accordion2;
