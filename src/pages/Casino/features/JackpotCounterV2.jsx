import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import classes from "./JackpotCounterV2.module.css";
import { translate } from "../../../utils/translations";
import { siteCurrency } from "../../../utils/custom";
import GrandIconA from "../../../assets/images/grand1.png";
import GrandIconB from "../../../assets/images/grand2.png";
import MajorIconA from "../../../assets/images/major1.png";
import MajorIconB from "../../../assets/images/major2.png";
import MinorIconA from "../../../assets/images/minor1.png";
import MinorIconB from "../../../assets/images/minor2.png";
import MiniIconA from "../../../assets/images/mini1.png";
import MiniIconB from "../../../assets/images/mini2.png";
import FlashIcon from "../../../assets/images/lightning.png";

const JackpotCounterV2 = () => {
    const dispatch = useDispatch();
    const lang = useSelector((state) => state.app.lang);
    const currency = useSelector((state) => state.app.siteCurrency);

    const countersData = [
        { start: 503217, label: 'GRAND', tier: 'grand', background: GrandIconA },
        { start: 98742, label: 'MAJOR', tier: 'major', background: MajorIconA },
        { start: 21267, label: 'MINOR', tier: 'minor', background: MinorIconA },
        { start: 5823, label: 'MINI', tier: 'mini', background: MiniIconA },
        { start: 507934, label: 'GRAND', tier: 'grand', background: GrandIconB },
        { start: 100384, label: 'MAJOR', tier: 'major', background: MajorIconB },
        { start: 22854, label: 'MINOR', tier: 'minor', background: MinorIconB },
        { start: 6189, label: 'MINI', tier: 'mini', background: MiniIconB }
    ];

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
        <div className={classes.JackpotWrapperV2} id="jackpotWrapperV2">
            <div className={classes.Title} id="JackpotV2Title">
                <span className={classes.TitleIcon}><img src={FlashIcon} alt="Jackpot" /></span>
                {translate('Jackpot')}
            </div>
            <div className={classes.JackpotScrollContainer} id="JackpotV2Container">
                <div className={classes.JackpotGrid} id="JackpotV2Grid">
                    {countersData.map((item, index) => (
                        <div
                            key={index}
                            className={classes.Card}
                            style={{ backgroundImage: `url(${item.background})` }}
                            id="JackpotV2Card"
                        >
                            <DigitDisplay number={counts[index]} />
                            <span className={classes.Currency}>{siteCurrency(currency)}</span>
                        </div>
                    ))}
                </div>
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

export default JackpotCounterV2;
