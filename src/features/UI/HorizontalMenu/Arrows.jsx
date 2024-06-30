import React from 'react';
import { VisibilityContext } from 'react-horizontal-scrolling-menu';

import classes from './Arrows.module.css';
import MenuArrowLeft from '../../../assets/svgs/menu-arrow-left.svg?react';
import MenuArrowRight from '../../../assets/svgs/menu-arrow-right.svg?react';

export function LeftArrow() {
    const visibility = React.useContext(VisibilityContext);
    const isFirstItemVisible = visibility.useIsVisible('first', true);

    return (
        <Arrow disabled={isFirstItemVisible} onClick={() => visibility.scrollPrev()} type='left'>
            <MenuArrowLeft />
        </Arrow>
    );
}

export function RightArrow() {
    const visibility = React.useContext(VisibilityContext);
    const isLastItemVisible = visibility.useIsVisible('last', false);

    return (
        <Arrow disabled={isLastItemVisible} onClick={() => visibility.scrollNext()} type='right'>
            <MenuArrowRight />
        </Arrow>
    );
}

function Arrow({ children, disabled, onClick, type }) {
    return (
        <button
            className={type === 'left' ? [classes.MenuArrowButton, classes.LeftArrow].join(' ') : [classes.MenuArrowButton, classes.RightArrow].join(' ')}
            disabled={disabled}
            onClick={onClick}
        >
            {children}
        </button>
    );
}
