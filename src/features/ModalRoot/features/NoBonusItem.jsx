import React from 'react';
import NoBonusIcon from '../../../assets/svgs/NoBonusIcon.svg?react';

import { translate } from '../../../utils/translations';
import classes from './NoBonusItem.module.css';

const NoBonusItem = () => {
    
    return (
        
        <div className={classes.noBonus}>  
            <NoBonusIcon/>
            {translate('No Available Bonus')}
        </div>

    );
};

export default NoBonusItem;
