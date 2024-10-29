import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import classes from "./CasinoGameCard.module.css";
import LoaderPlaceholder from "../../../features/UI/Skeletons/LoaderPlaceholder";

const CasinoGameCard = (props) => {
  const [isLoaded, setIsLoaded] = useState(false);

  const gameType = props.game.Data.Tags.toLowerCase().includes("live")
    ? "live"
    : "slots";

  return (
    <li>
      <Link
        to={`/casino/game/${gameType}/${props.game.Data.ProviderName}/${props.game.Data.Id}/${props.game.Data.BrandGameId}/${props.game.Data.Name}`}
      >
        <article className={classes.GameCard}>
          <div className={classes.ImageContainer}>
            {!isLoaded && <LoaderPlaceholder />}
            <img
              src={props.game.Data.ImageUrl}
              loading="lazy"
              onLoad={() => setIsLoaded(true)}
            />
          </div>

          <div className={classes.CardText}>
            <div className={classes.Name}>
              {props.game.Data.Name}
              {props.game.isNew && <div className={classes.NewBadge}>New </div>}
            </div>
            <p className={classes.Producer}>{props.game.Data.ProviderName}</p>
          </div>
        </article>
      </Link>
    </li>
  );
};

export default CasinoGameCard;
