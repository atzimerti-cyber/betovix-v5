import { useState, useEffect } from 'react';

import classes from './FlashingScore.module.css';

const FlashingScore = ({ score, previousScore, withEmptyDash = false }) => {
    const [firstRender, setFirstRender] = useState(true);
    const [flash, setFlash] = useState(false);
    const [timer, setTimer] = useState(null);

    useEffect(() => {
        if (previousScore && previousScore !== score && !firstRender) {
            setFlash(true);

            if (timer) clearTimeout(timer);
            const t = setTimeout(() => setFlash(false), 3000);
            setTimer(t);
        } else if (firstRender) {
            setFirstRender(false);
        }

        return () => {
            if (timer) clearTimeout(timer);
        };
    }, [score, previousScore]);

    let elClasses = [classes.Score];
    if (flash) elClasses.push(classes.Flash);
    if (withEmptyDash && score === null) elClasses.push(classes.WithEmptyDash);

    return <div className={elClasses.join(' ')}>{score}</div>;
    // return <div className={flash ? [classes.Score, classes.Flash].join(' ') : classes.Score}>{score}</div>;
};

export default FlashingScore;
