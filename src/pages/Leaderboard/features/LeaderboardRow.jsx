import { useEffect, useState } from 'react';

import classes from './LeaderboardRow.module.css';
import { addThousandsSeparator } from '../../../utils/custom';
import CoinsIcon from '../../../assets/svgs/coins.svg?react';

const LeaderboardRow = (props) => {
    const [rewardInteger, setRewardInteger] = useState('-');
    const [rewardDecimal, setRewardDecimal] = useState('');
    const [amountInteger, setAmountInteger] = useState('-');
    const [amountDecimal, setAmountDecimal] = useState('');

    useEffect(() => {
        if (props.reward) {
            let ri = Math.floor(props.reward);
            ri = addThousandsSeparator(ri, 0);
            const rd = ((props.reward % 1) * 100).toFixed(0);

            setRewardInteger(ri);
            setRewardDecimal('.' + rd.padStart(2, '0'));
        }

        if (props.standing.stake) {
            // const amount = props.standing.amount / 100; // TODO: this / 100 is because of duelbits way of sending the values
            const amount = props.standing.stake; // TODO: this / 100 is because of duelbits way of sending the values

            let ai = Math.floor(amount);
            ai = addThousandsSeparator(ai, 0);
            const ad = ((amount % 1) * 100).toFixed(0);

            setAmountInteger(ai);
            setAmountDecimal('.' + ad.padStart(2, '0'));
        }
    }, []);

    function transformDate(dateString) {
        const date = new Date(dateString);
    
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
    
        return `${day}/${month}/${year}`;
    }

    return (
        <tr className={[classes.TableRow, classes['Position' + props.position]].join(' ')}>
            <td className={classes.PositionColumn}>
                <div className={props.position <= 5 ? [classes.CellContent, classes.HasPosition].join(' ') : classes.CellContent}>{props.position}</div>
            </td>
            <td className={classes.PlayerColumn}>
                <div className={props.position <= 5 ? [classes.CellContent, classes.HasPosition].join(' ') : classes.CellContent}>
                    <CoinsIcon className={classes.CoinsIcon} />
                    <span className={classes.DisplayName}>{props.standing.ticket.winnings}</span>
                    {/* <span className={classes.DisplayName}>{props.standing.user.displayName}</span> */}
                </div>
            </td>
            <td className={classes.PrizeColumn}>
                <div className={classes.CellContent}>
                    <CoinsIcon className={classes.CoinsIcon} />
                    {/* {rewardInteger !== '-' && <CoinsIcon className={classes.CoinsIcon} />} */}

                    <span className={classes.BitsAmount}>
                        {/* {rewardInteger}
                        <span>{rewardDecimal}</span> */}
                         {props.standing.ticket.stake}
                    </span>
                </div>
            </td>
            <td className={classes.WageredColumn}>
                <div className={classes.CellContent}>
                    {/* {amountInteger !== '-' && <CoinsIcon className={classes.CoinsIcon} />} */}

                    <span className={classes.BitsAmount}>
                        {/* {amountInteger}
                        <span>{amountDecimal}</span> */}
                        {transformDate(props.standing.ticket.date)}
                    </span>
                </div>
            </td>
        </tr>
    );
};

export default LeaderboardRow;
