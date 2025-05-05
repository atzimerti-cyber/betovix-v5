import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import classes from "./JackpotCounter.module.css";
import { translate } from "../../../utils/translations";
import { siteCurrency } from "../../../utils/custom";
import JackpotIconA from "../../../assets/images/jackpot1.png";
import JackpotIconB from "../../../assets/images/jackpot2.png";
import JackpotIconC from "../../../assets/images/jackpot3.png";
import JackpotIconD from "../../../assets/images/jackpot4.png";
import FlashIcon from "../../../assets/images/lightning.png";
import CoinsGif from "../../../assets/images/CoinsGif.gif";

const JackpotCounter = () => {
    const dispatch = useDispatch();
    const lang = useSelector((state) => state.app.lang);
    const currency = useSelector((state) => state.app.siteCurrency);

    const countersData = [
        { iconIndex: 0, start: 168000 },
        { iconIndex: 1, start: 96475 },
        { iconIndex: 2, start: 101708 },
        { iconIndex: 3, start: 17468347 },
    ];

    const icons = [JackpotIconA, JackpotIconB, JackpotIconC, JackpotIconD];

    const [counts, setCounts] = useState(
        countersData.map((item) => item.start)
    );

    useEffect(() => {
        const interval = setInterval(() => {
            setCounts((prevCounts) =>
                prevCounts.map((count) => count + Math.floor(Math.random() + 1))
            );
        }, 1000); 

        return () => clearInterval(interval);
    }, []);

    return (
        <div className={classes.JackpotWrapper} id="jackpotWrapper">
            <div className={classes.Title}>
                <span className={classes.TitleIcon}><img src={FlashIcon} alt="Jackpot" /></span>
                {translate('Jackpot')}
            </div>
            <div className={classes.JackpotCounter}>
                {countersData.map((item, index) => {
                    const IconComponent = icons[item.iconIndex];
                    return (
                        <div key={index} className={classes.Card}>
                            <span className={classes.Icon}><img src={IconComponent} /></span>
                            <DigitDisplay number={counts[index]} />
                            <span className={classes.Currency}>{siteCurrency(currency)}</span>
                            <img src={CoinsGif} alt="Coins" className={classes.CoinGif} />
                            <img src={CoinsGif} alt="Coins" className={classes.CoinGif1} />
                            <img src={CoinsGif} alt="Coins" className={classes.CoinGif2} />
                        </div>
                    );
                })}

            </div>
        </div>
    );
};

const DigitDisplay = ({ number }) => {
    const digits = number.toString().split("");

    return (
        <div className={classes.DigitDisplay}>
            {digits.map((digit, i) => (
                <Digit key={i} value={digit} />
            ))}
        </div>
    );
};

const Digit = ({ value }) => {
    return (
        <div className={classes.DigitWrapper}>
            <div className={classes.DigitScroll} style={{ transform: `translateY(-${value * 10}%)` }}>
                {Array.from({ length: 10 }, (_, i) => (
                    <div className={classes.DigitValue} key={i}>
                        {i}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default JackpotCounter;
