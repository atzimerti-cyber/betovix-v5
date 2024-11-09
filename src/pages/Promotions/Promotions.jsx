import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import classes from "./Promotions.module.css";
import { useLocation, useNavigate } from "react-router-dom";
import { promotionsActions } from "./promotionsSlice";
import { getPromotion } from "./promotionsAsyncActions";
import { translate } from "../../utils/translations";
import PromoImage from "../../assets/images/promo.png";
import PromotionsIcon from "../../assets/svgs/promotions.svg?react";

const Promotions = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const lang = useSelector((state) => state.app.lang);
  const promotions = useSelector((state) => state.promotions.promotions);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    dispatch(getPromotion(signal));

    return () => dispatch(promotionsActions.reset());
  }, []);

  return (
    <div className={classes.PageContent}>
      <div className={classes.PromotionsContainer}>
        <div className={classes.PromotionsHeader}>
          <div className={classes.Title}>
            <PromotionsIcon />
            <span>{translate(`Promotions`)}</span>
          </div>
          <div className={classes.PromoBanner}>
            <img src={PromoImage} alt="" />
          </div>
        </div>
        <div className={classes.PromotionsBody}>
          {promotions && promotions.length > 0 ? (
            promotions.map((promo, index) => (
              <div className={classes.Promo} key={index}>
                <div
                  className={classes.BgImage}
                  style={{ backgroundImage: `url(${promo.image})` }}
                ></div>
                <div className={classes.Content}>
                  <div className={classes.PromoTitle}>
                    <span>{promo.title}</span>
                  </div>
                  <div className={classes.PromoText}>
                    <span>{promo.content}</span>
                  </div>
                </div>
                <div className={classes.Buttons}>
                  {promo.link !== "" && (
                    <button
                      className={classes.LinkButton}
                      onClick={() => navigate(`/${promo.link}`)}
                    >
                      {translate(`Read More`)}
                    </button>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className={classes.NoRes}>
              <span>
                {translate(`No available promotions at this moment.`)}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Promotions;
 