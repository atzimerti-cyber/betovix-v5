import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import NoImageIcon from '../../../assets/svgs/no-image.svg?react';
import classes from './LiveListSport.module.css';
import { translateNameWithLang } from '../../../utils/translations';
import AngleDownIcon from '../../../assets/svgs/angle-down.svg?react';
import { eventActions } from '../eventSlice';
import CategoriesTournaments from './CategoriesTournaments';

const LiveListSport = (props) => {
    const dispatch = useDispatch();
    const sportIcons = useSelector((state) => state.app.sportIcons);
    const liveListOpenSportId = useSelector((state) => state.event.liveListOpenSportId);
    const selectedSport = useSelector((state) => state.sportsbook.selectedSport);

    const sportIcon = sportIcons[props.sport.Name?.International] || <NoImageIcon />;

    const onSetLiveListOpenSportId = () => {
        if (props.sport.Id === liveListOpenSportId) {
            dispatch(eventActions.setLiveListOpenSportId(null));
        } else {
            dispatch(eventActions.setLiveListOpenSportId(props.sport.Id));
        }
    };

    useEffect(() => {
        if (selectedSport) dispatch(eventActions.setLiveListOpenSportId(selectedSport.Id));
    }, [selectedSport?.Id]);

    return (
        <div className={liveListOpenSportId === props.sport.Id ? [classes.Group, classes.IsOpen].join(' ') : classes.Group}>
            <div className={classes.Title} onClick={onSetLiveListOpenSportId}>
                <div className={classes.TitleIcon}>{sportIcon}</div>
                <div className={classes.TitleName}>{translateNameWithLang(props.sport.Name)}</div>
                <AngleDownIcon className={classes.DropdownIcon} />
            </div>

            {liveListOpenSportId === props.sport.Id && (
                <div className={classes.TournamentGroup}>
                    <CategoriesTournaments sport={props.sport} />
                </div>
            )}
        </div>
    );
};

export default LiveListSport;
