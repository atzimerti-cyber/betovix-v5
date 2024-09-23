import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import classes from './Breadcrumb.module.css';
import AngleLeftIcon from '../../../assets/svgs/angle-left.svg?react';
import AngleDownIcon from '../../../assets/svgs/angle-down.svg?react';
import MenuButton from '../../../features/UI/Buttons/MenuButton';
import Dropdown2 from '../../../features/UI/Dropdown/Dropdown2';
import { translateNameWithLang } from '../../../utils/translations';

const Breadcrumb = (props) => {
    const navigate = useNavigate();

    const [showSportDropdown, setShowSportDropdown] = useState(false);

    const lang = useSelector((state) => state.app.lang); // Necessary for rerendering translations
    const sports = useSelector((state) => state[props.slice].sports);
    const selectedSport = useSelector((state) => state.sportsbook.selectedSport);

    return (
        <div className={classes.Breadcrumb}>
            <div className={[classes.Crumb, classes.BackButton].join(' ')} onClick={() => navigate(`/sportsbook/${props.page}/${selectedSport.slug}`)}>
                <AngleLeftIcon className={classes.BackIcon} />
            </div>

            <div className={showSportDropdown ? [classes.NoPaddingCrumb, classes.DropdownOpen].join(' ') : classes.NoPaddingCrumb}>
                <MenuButton color='transparent' onClick={() => setShowSportDropdown(!showSportDropdown)}>
                    <div className={classes.SportIcon}>{selectedSport?.icon}</div>
                    <div className={classes.SportName}>{translateNameWithLang(selectedSport?.Name)}</div>
                    <AngleDownIcon className={classes.ArrowIcon} />
                </MenuButton>

                <AnimatePresence>
                    {showSportDropdown && (
                        <Dropdown2 onClickOutside={() => setShowSportDropdown(false)}>
                            <div className={classes.DropdownMenu}>
                                {sports?.map((sport) => {
                                    return (
                                        <div
                                            key={sport.Id}
                                            className={selectedSport?.Id === sport.Id ? [classes.DropdownItem, classes.Active].join(' ') : classes.DropdownItem}
                                            onClick={() => navigate(`/sportsbook/${props.page}/${sport.slug}`)}
                                        >
                                            <div className={classes.SportItemIcon}>{sport.icon}</div>
                                            <div className={classes.SportItemName}>{translateNameWithLang(sport.Name)}</div>
                                        </div>
                                    );
                                })}
                            </div>
                        </Dropdown2>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default Breadcrumb;
