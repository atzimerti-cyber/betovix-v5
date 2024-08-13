import { memo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { Tooltip } from 'react-tooltip';
import { useMediaQuery } from 'react-responsive';

import MainButton from '../../UI/Buttons/MainButton';
import CloseButton from '../../UI/Buttons/CloseButton';
import classes from './LeftContainer.module.css';
import LiveSupportIcon from '../../../assets/svgs/live-support.svg?react';
import DropdownLang from '../../UI/Dropdown/DropdownLang';
import CasinoIcon from '../../../assets/svgs/casino.svg?react';
import SportsIcon from '../../../assets/svgs/sports.svg?react';
import { layoutActions } from '../layoutSlice';
import Search from '../../Search/Search';
import LeftMenuItem from './LeftMenuItem';
import CategoryGroup from '../../UI/CategoryGroup/CategoryGroup';
import useBasePath from '../../../hooks/useBasePath';
import { searchActions } from '../../../pages/Search/searchSlice';
import { translate } from '../../../utils/translations';
import SearchSports from '../../../pages/Search/SearchSports';
import StatsIcon from '../../../assets/svgs/bars.svg?react';

const LeftContainer = memo(function () {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const lang = useSelector((state) => state.app.lang); // Necessary for rerendering translations

    const pathname = location.pathname.substring(1);
    const pathnameNoParams = useBasePath();

    const permissions = useSelector((state) => state.login.permissions);
    const menuItems = useSelector((state) => state.app.menuItems);
    ///////////
    const casinoMenuItems = useSelector((state) => state.app.casinoMenuItems);
    const sportsMenuItems = useSelector((state) => state.app.sportsMenuItems);
    ////////////
    const user = useSelector((state) => state.login.user);
    const searchString = useSelector((state) => state.search.searchString);
    const fullLeftContainer = useSelector((state) => state.layout.fullLeftContainer);
    const isMobile = useMediaQuery({ query: '(max-width: 768px)' });

    let elClasses = [classes.SideMenuScroll];
    let elClasses2 = [classes.SideMenuBottomButtons];
    if (!fullLeftContainer) {
        elClasses.push(classes.Closed);
        elClasses2.push(classes.Closed);
    }

    const getItems = (menuItem, index, categoryId) => {
        const showEmphasis = menuItem.category?.label === 'Top Tournaments' ? true : false;

        return (
            <ul key={`${categoryId}_${index}`} className={classes.List}>
                {menuItem.items.map((item) => {
                    return <LeftMenuItem key={item.id} isActive={item.page === pathname} item={item} hide={!fullLeftContainer} showEmphasis={showEmphasis} />;
                })}
            </ul>
        );
    };

    return (
        <>
            <div className={elClasses.join(' ')}>
                {!fullLeftContainer && (
                    <Tooltip
                        id='left-menu-tooltip'
                        style={{ backgroundColor: '#fff', color: '#87a0b5', fontFamily: `'Proxima Nova', sans-serif`, fontSize: '14px' }}
                    />
                )}

                <div className={classes.SideMenuAllButtonsContainer}>
                    <div className={classes.SideMenuButtonContainer}>

                        {permissions.AllowToSports && (
                            <MainButton
                                active={pathnameNoParams.includes('/sportsbook') || pathnameNoParams.includes('/event')}
                                onClick={() => navigate('/sportsbook/home')}
                                dataTooltipId='left-menu-tooltip'
                                dataTooltipContent={translate('Sports')}
                            >
                                <SportsIcon
                                    className={pathnameNoParams.includes('sportsbook') || pathnameNoParams.includes('/event') ? classes.ActiveSvg : null}
                                />
                                <span>{fullLeftContainer ? translate('Sports') : ''}</span>
                            </MainButton>
                        )}

                        {(permissions.AllowToCasino || permissions.AllowToSlots) && (
                            <MainButton
                                active={pathnameNoParams.includes('/casino')}
                                onClick={() => navigate('/casino/lobby')}
                                dataTooltipId='left-menu-tooltip'
                                dataTooltipContent={translate('Casino')}
                            >
                                <CasinoIcon className={pathnameNoParams.includes('casino') ? classes.ActiveSvg : null} />
                                <span>{fullLeftContainer ? translate('Casino') : ''}</span>
                            </MainButton>
                        )}
                    </div>

                    {isMobile && <CloseButton timesIcon onClick={() => dispatch(layoutActions.setFullLeftContainer(false))} />}
                </div>
                {/* <div className={classes.SideMenuContainer}>
                    <div className={classes.SideMenuSubButtonContainer}>

                        {permissions.AllowToSports && (
                            <MainButton
                                active={pathnameNoParams.includes('?modal=statistics')}
                                onClick={() => navigate('?modal=statistics')}
                                dataTooltipId='left-menu-tooltip'
                                dataTooltipContent={translate('Sports')}
                            >
                                <StatsIcon
                                    className={pathnameNoParams.includes('?modal=statistics') ? classes.ActiveSvg : null}
                                />
                                <span>{fullLeftContainer ? translate('Statistics') : ''}</span>
                            </MainButton>
                        )}
                    </div>
                    <div className={classes.SideMenuSubButtonContainer}>

                        {permissions.AllowToSports && (
                            <MainButton
                                active={pathnameNoParams.includes('?modal=statistics')}
                                onClick={() => navigate('?modal=statistics')}
                                dataTooltipId='left-menu-tooltip'
                                dataTooltipContent={translate('Sports')}
                            >
                                <StatsIcon
                                    className={pathnameNoParams.includes('?modal=statistics') ? classes.ActiveSvg : null}
                                />
                                <span>{fullLeftContainer ? translate('Statistics') : ''}</span>
                            </MainButton>
                        )}
                    </div>

                    {isMobile && <CloseButton timesIcon onClick={() => dispatch(layoutActions.setFullLeftContainer(false))} />}
                </div> */}


                {/* SportsMenu */}
                {pathnameNoParams !== '/casino' && pathnameNoParams !== '/search' && (permissions.AllowToSports) && (
                    <>
                        <div className={classes.SideMenuDivider}></div>

                        {!isMobile && (
                            <Search
                                placeholder={translate('Search Event')}
                                hide={!fullLeftContainer}
                                dataTooltipId='left-menu-tooltip'
                                dataTooltipContent={translate('Search Event')}
                                value={searchString}
                                onChange={(value) => {
                                    dispatch(searchActions.setSearchString(value));
                                    if (value !== '') navigate('/searchEvent');
                                }}
                            />
                        )}
                        <div className={classes.SideMenuContainer}>
                            <div className={classes.SideMenuSubButtonContainer}>

                                {permissions.AllowToSports && (
                                    <MainButton
                                        active={pathnameNoParams.includes('?modal=statistics')}
                                        onClick={() => navigate('?modal=statistics')}
                                        dataTooltipId='left-menu-tooltip'
                                        dataTooltipContent={translate('Sports')}
                                    >
                                        <StatsIcon
                                            className={pathnameNoParams.includes('?modal=statistics') ? classes.ActiveSvg : null}
                                        />
                                        <span>{fullLeftContainer ? translate('Statistics') : ''}</span>
                                    </MainButton>
                                )}
                            </div>

                            {isMobile && <CloseButton timesIcon onClick={() => dispatch(layoutActions.setFullLeftContainer(false))} />}
                        </div>
                        {/* SportsMenuItems */}
                        {sportsMenuItems.map((menuItem, index) => {
                            if (menuItem.category) {
                                if (fullLeftContainer) {
                                    return (
                                        <CategoryGroup key={index} category={menuItem.category} hide={fullLeftContainer}>
                                            {getItems(menuItem, index, menuItem.category.id)}
                                        </CategoryGroup>
                                    );
                                } else {
                                    return (
                                        <div className={classes.Grouped} key={index}>
                                            <div className={classes.SideMenuDivider}></div>
                                            {getItems(menuItem, index, menuItem.category.id)}
                                        </div>
                                    );
                                }
                            } else {
                                return getItems(menuItem, index, 0);
                            }
                        })}
                    </>
                )}

                {/* CasinoMenu */}
                {pathnameNoParams !== '/sportsbook' && pathnameNoParams !== '/sportsbook/tournament' && pathnameNoParams !== '/searchEvent' && (permissions.AllowToCasino || permissions.AllowToSlots) && (

                    <>
                        <div className={classes.SideMenuDivider}></div>
                        {!isMobile && (
                            <Search
                                placeholder={translate('Search Casino')}
                                hide={!fullLeftContainer}
                                dataTooltipId='left-menu-tooltip'
                                dataTooltipContent={translate('Search Casino')}
                                value={searchString}
                                onChange={(value) => {
                                    dispatch(searchActions.setSearchString(value));
                                    if (value !== '') navigate('/search');
                                }}
                            />
                        )}
                        {/* casinoMenuItems */}
                        {casinoMenuItems.map((casinoMenuItem, index) => {
                            if (casinoMenuItem.category) {
                                if (fullLeftContainer) {
                                    return (
                                        <CategoryGroup key={index} category={casinoMenuItem.category} hide={fullLeftContainer}>
                                            {getItems(casinoMenuItem, index, casinoMenuItem.category.id)}
                                        </CategoryGroup>
                                    );
                                } else {
                                    return (
                                        <div className={classes.Grouped} key={index}>
                                            <div className={classes.SideMenuDivider}></div>
                                            {getItems(casinoMenuItem, index, casinoMenuItem.category.id)}
                                        </div>
                                    );
                                }
                            } else {
                                return getItems(casinoMenuItem, index, 0);
                            }
                        })}
                    </>
                )}


                {menuItems.map((menuItem, index) => {
                    if (menuItem.category) {
                        if (fullLeftContainer) {
                            return (
                                <CategoryGroup key={index} category={menuItem.category} hide={fullLeftContainer}>
                                    {getItems(menuItem, index, menuItem.category.id)}
                                </CategoryGroup>
                            );
                        } else {
                            return (
                                <div className={classes.Grouped} key={index}>
                                    <div className={classes.SideMenuDivider}></div>
                                    {getItems(menuItem, index, menuItem.category.id)}
                                </div>
                            );
                        }
                    } else {
                        return getItems(menuItem, index, 0);
                    }
                })}
            </div>

            <div className={classes.SideMenuDivider}></div>

            <div className={elClasses2.join(' ')}>
                <MainButton color='transparent'>
                    <LiveSupportIcon />
                    {fullLeftContainer ? translate('Live support') : ''}
                </MainButton>

                <DropdownLang openTo='top' />
            </div>
        </>
    );
});

export default LeftContainer;
