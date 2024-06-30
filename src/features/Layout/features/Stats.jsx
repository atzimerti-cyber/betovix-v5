import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DraggableBox from '../../UI/DraggableBox/DraggableBox';

import { sportsbookActions } from '../../../pages/SportsBook/sportsbookSlice';
import { translateNameWithLang } from '../../../utils/translations';

const Stats = (props) => {
    const dispatch = useDispatch();

    const lang = useSelector((state) => state.app.lang); // Necessary for rerendering translations
    const [height, setHeight] = useState();

    useEffect(() => {
        const handleResizeMessage = (event) => {
            if (event.origin === 'https://widget.feedmaker.live') {
                const message = event.data ? JSON.parse(event.data) : null;
                let h = message ? message['body-height'] : null;
                h = h ? h + 50 : 330;
                setHeight(h);
            }
        };

        window.addEventListener('message', handleResizeMessage);

        return () => window.removeEventListener('message', handleResizeMessage);
    }, []);

    return (
        <DraggableBox
            title={`${translateNameWithLang(props.showStatsFor.Info.HomeTeamName)} vs ${translateNameWithLang(props.showStatsFor.Info.AwayTeamName)}`}
            onClose={() => dispatch(sportsbookActions.setShowStatsFor(null))}
            height={height}
        >
            {props.showStatsFor.Info.DateOfMatch ? (
                <iframe
                    src={`${import.meta.env.VITE_SPORTS_URL}/stats/stats.html?styles=#${lang.id}/external/page/h2h/${props.showStatsFor.Info.HomeTeamId}/${
                        props.showStatsFor.Info.AwayTeamId
                    }`}
                />
            ) : (
                <iframe id='FMTracker' run='iLive.initTracker' src={`https://widget.feedmaker.live/?event=${props.showStatsFor.MatchId}&amp;lang=en`} />
            )}
        </DraggableBox>
    );
};

export default Stats;
