import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useMediaQuery } from 'react-responsive';

import classes from './LeftMenuItem.module.css';
import { layoutActions } from '../layoutSlice';
import { translate } from '../../../utils/translations';

// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faHome } from '@fortawesome/free-solid-svg-icons';

const LeftMenuItem = (props) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const lang = useSelector((state) => state.app.lang); // Necessary for rerendering translations

    const isMobile = useMediaQuery({ query: '(max-width: 768px)' });

    let elClasses = [classes.LeftMenuItem];
    if (props.isActive) elClasses.push(classes.Active);
    if (props.hide) elClasses.push(classes.Hide);
    if (props.showEmphasis) elClasses.push(classes.ShowEmphasis);
    if (props.isCateg == false) elClasses.push(classes.NotCateg);

    const onClick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (props.item.page) navigate(props.item.page);
        else if (props.item.modal) {
            const searchParams = new URLSearchParams(location.search);
            searchParams.set('modal', props.item.modal);
            navigate(`${location.pathname}?${searchParams.toString()}`, { replace: true });
        }

        if (isMobile) dispatch(layoutActions.setFullLeftContainer(false));
    };

    return (
        <li className={elClasses.join(' ')} onClick={(e) => onClick(e)}>
            <a data-tooltip-id='left-menu-tooltip' data-tooltip-content={translate(props.item.label)}>
                <div className={classes.IconWrapper}>
                    {props.item.icon && props.item.icon}
                </div>


                {props.item.label ? (
                   <span>{translate(props.item.label)}</span>
                ) : (
                    <span>{translate(props.item.Name)}</span>
                )
                }

                <div className={classes.Container}>
                    {props.item.badge && props.item.badge === 'free' && <div className={classes.BadgeFree}>{translate('FREE')}</div>}
                    {props.item.badge && props.item.badge === 'new' && <div className={classes.BadgeNew}>{translate('NEW')}</div>}
                    {props.isNew === 'new' && <div className={classes.BadgeNew}>{translate('NEW')}</div>}
                    {props.item.timer && <div className={classes.Timer}>{props.item.timer}</div>}
                </div>
            </a>
        </li>
    );
};

export default LeftMenuItem;
