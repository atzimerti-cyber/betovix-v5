import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import MainButton from '../../UI/Buttons/MainButton';
import classes from './LiveListContainer.module.css';
import useBasePath from '../../../hooks/useBasePath';
import { translate } from '../../../utils/translations';
import CasinoIcon from '../../../assets/svgs/casino.svg?react';
import SportsIcon from '../../../assets/svgs/sports.svg?react';
import LiveListSports from '../../../pages/Event/features/LiveListSports';

const LiveListContainer = () => {
    const navigate = useNavigate();

    const lang = useSelector((state) => state.app.lang); // Necessary for rerendering translations
    const permissions = useSelector((state) => state.login.permissions);
    const fullLeftContainer = useSelector((state) => state.layout.fullLeftContainer);
    const showLiveListContainer = useSelector((state) => state.layout.showLiveListContainer);

    const pathnameNoParams = useBasePath();

    return (
        <aside className={showLiveListContainer ? [classes.PaneShow].join(' ') : classes.Pane}>
            <div className={classes.ScrollableContent}>
                <div className={classes.Content}>
                    <div className={classes.SideMenuAllButtonsContainer}>
                        <div className={classes.SideMenuButtonContainer}>
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
                        </div>
                    </div>

                    {showLiveListContainer && <LiveListSports />}
                </div>
            </div>
        </aside>
    );
};

export default LiveListContainer;
