import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import classes from "./Promotions.module.css";
import { useLocation, useNavigate } from "react-router-dom";
import { promotionsActions } from "./promotionsSlice";
import { getPromotion } from "./promotionsAsyncActions";
import { translate } from "../../utils/translations";
import PromoImage from "../../assets/images/ccc.png";
import PromotionsIcon from "../../assets/svgs/promotions.svg?react";
import MainButton from "../../features/UI/Buttons/MainButton";

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

  const addParamsToUrl = (modal, link) => {
    const searchParams = new URLSearchParams(location.search);
    const linkParams = new URLSearchParams(link);

    // Get values for "pageId" and "slug" from the linkParams
    const pageId = linkParams.get("pageId");
    const slug = linkParams.get("slug");
  

    searchParams.set("modal", modal);
    if (pageId) searchParams.set("pageId", pageId);
    if (slug) searchParams.set("slug", slug);

    navigate(`${location.pathname}?${searchParams.toString()}`, {
      replace: true,
    });
};

  return (
    <div className={classes.PageContent}>
      <div className={classes.PromotionsContainer}>
        <div className={classes.PromotionsHeader}>
          <div className={classes.Title}>
            <span>{translate(`Promotions`)}</span>
            <p>
              {translate(
                `Explore exclusive casino and sportsbook promotions and special bonuses to boost your play`
              )}
              .
            </p>
          </div>
          <div className={classes.PromoBanner}>
            <img src={PromoImage} alt="" />
          </div>
        </div>
        <div className={classes.PromotionsBody}>
          {promotions && promotions.length > 0 ? (
            promotions.map((promo, index) => (
              <div className={classes.Promo} key={index}>
                <div className={classes.PromoCard} key={index}>
                  <div
                    className={classes.BgImage}
                    style={{ backgroundImage: `url(${promo.image})` }}
                  ></div>
                  <div className={classes.Content}>
                    <div className={classes.PromoTop}>
                      <div className={classes.PromoTitle}>
                        <span>{promo.title}</span>
                      </div>
                      <div className={classes.PromoText}>
                        <span>{promo.content}</span>
                      </div>
                    </div>
                    <div className={classes.PromoBottom}>
                      <div className={classes.Buttons}>
                        {promo.link !== "" && (
                           <MainButton
                           color="secondary"
                            onClick={() => addParamsToUrl("promotion", promo.link)}                 
                           className={classes.LinkButton}
                       >
                           {translate(`Read More`)}
                       </MainButton>
                        )}
                        <button className={classes.InfoButton}></button>
                      </div>
                    </div>
                  </div>
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
