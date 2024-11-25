import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import classes from "./CasinoGameCard.module.css";
import LoaderPlaceholder from "../../../features/UI/Skeletons/LoaderPlaceholder";

import GiftIcon from "../../../assets/svgs/gift.svg?react";
import { translate } from "../../../utils/translations";

const CasinoGameCard = (props) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const bonusBalance = useSelector((state) => state.layout.bonusBalance);
  const gameType = props.game.Data.Tags.toLowerCase().includes("live")
    ? "live"
    : "slots";

  return (
    <li>
      <article className={classes.GameCard}>
        <Link
          to={`/casino/game/${gameType}/${props.game.Data.ProviderName}/${props.game.Data.Id}/${props.game.Data.BrandGameId}/${props.game.Data.Name}?isBonus=false`}
        >
          <div className={classes.ImageContainer}>
            {!isLoaded && <LoaderPlaceholder />}
            <img
              src={props.game.Data.ImageUrl}
              loading="lazy"
              onLoad={() => setIsLoaded(true)}
            />
          </div>
        </Link>
        {bonusBalance > 0 && props.game.allowBonus && (
          <Link
            to={`/casino/game/${gameType}/${props.game.Data.ProviderName}/${props.game.Data.Id}/${props.game.Data.BrandGameId}/${props.game.Data.Name}?isBonus=true`}
          >
            <div className={classes.isBonus}>
              <button className={classes.bonusContainer}>
                <GiftIcon />
                {translate("Play With Bonus")}
              </button>
            </div>
          </Link>
        )}
        <Link
          to={`/casino/game/${gameType}/${props.game.Data.ProviderName}/${props.game.Data.Id}/${props.game.Data.BrandGameId}/${props.game.Data.Name}?isBonus=false`}
        >
          <div className={classes.CardText}>
            <div className={classes.Name}>
              {props.game.Data.Name}
              {props.game.isNew && <div className={classes.NewBadge}>New </div>}
            </div>
            <p className={classes.Provider}>{props.game.Data.VendorName}</p>
          </div>
        </Link>
      </article>
    </li>
  );
};

export default CasinoGameCard;
