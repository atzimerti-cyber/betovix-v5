import { useState } from 'react';

import NoImageCrestHomeIcon from '../../assets/svgs/no-image-crest-home.svg?react';
import NoImageCrestAwayIcon from '../../assets/svgs/no-image-crest-away.svg?react';
import NoImageTennisHomeIcon from '../../assets/svgs/no-image-tennis-home.svg?react';
import NoImageTennisAwayIcon from '../../assets/svgs/no-image-tennis-away.svg?react';
// import NoImagePersonHomeIcon from '../../assets/svgs/no-image-person.svg?react';
import classes from './TeamLogo.module.css';
import config from '../../config';

const TeamLogo = (props) => {
    const [imageFailedToLoad, setImageFailedToLoad] = useState(false);

    const getTeamLogo = () => {
        const competitorLogo = `${config.VITE_SPORTS_LOGOS}/teams/b/${props.teamId}.png`;
        return competitorLogo;
    };

    // const getFallBackImg = () => {
    //     if (props.sportName === 'Tennis') {
    //         return props.isHome ? noImageTennisHome : noImageTennisAway;
    //     }

    //     return props.isHome ? noImageCrestHome : noImageCrestAway;
    // };

    const getFallBackSvg = () => {
        if (props.sportName === 'Tennis') {
            return props.isHome ? <NoImageTennisHomeIcon /> : <NoImageTennisAwayIcon />;
        }

        return props.isHome ? <NoImageCrestHomeIcon className={classes.BigSvg} /> : <NoImageCrestAwayIcon className={classes.BigSvg} />;
    };

    return (
        <div className={classes.Logo}>
            {!imageFailedToLoad ? (
                <img
                    loading='lazy'
                    src={getTeamLogo()}
                    alt='Team Logo'
                    className={classes.TeamLogo}
                    // onError={({ currentTarget }) => {
                    //     currentTarget.onerror = null;
                    //     currentTarget.src = getFallBackImg();
                    // }}
                    onError={() => setImageFailedToLoad(true)}
                />
            ) : (
                getFallBackSvg()
            )}
        </div>
    );
};

export default TeamLogo;
