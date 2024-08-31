import { useState } from 'react';
import { useSelector } from 'react-redux';

import classes from './CategoryGroup.module.css';
import AngleUpIcon from '../../../assets/svgs/angle-up.svg?react';
import { translate } from '../../../utils/translations';

const CategoryGroup = (props) => {
    const lang = useSelector((state) => state.app.lang); // Necessary for rerendering translations

    let elClasses = [classes.CategoryGroup];

    const [isVisible, setIsVisible] = useState(props.category.visible);

    if (isVisible === false) elClasses.push(classes.Closed);

    return (
        <div className={elClasses.join(' ')} onClick={() => setIsVisible(!isVisible)}>
            <div className={classes.Title}>
                <div className={classes.Label}>
                    <span>{translate(props.category.label)}</span>
                    {/* {props.category.isNew && <div className={classes.BadgeNew}>{translate('NEW')}</div>} */}
                    {props.category.isNew && <div className={classes.LiveBadge}>{translate('NEW')}</div>}
                </div>

                <AngleUpIcon />
            </div>
            {props.children}
        </div>
    );
};

export default CategoryGroup;
