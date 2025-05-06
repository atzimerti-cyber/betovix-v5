import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import classes from "./Promotions.module.css";
import { useLocation, useNavigate } from "react-router-dom";
import { promotionsActions } from "./promotionsSlice";
import { getPromotion } from "./promotionsAsyncActions";
import { translate } from "../../utils/translations";
import PromoImage from "../../assets/images/promo_banner.png";
import PromotionsIcon from "../../assets/svgs/promotions.svg?react";
import MainButton from "../../features/UI/Buttons/MainButton";

const Promotions = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const lang = useSelector((state) => state.app.lang);
  const promotions = useSelector((state) => state.promotions.promotions);
  const promoImg = useSelector((state) => state.app.siteSettings.PromoImg);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    dispatch(getPromotion(signal));

    return () => dispatch(promotionsActions.reset());
  }, []);

  const addParamsToUrl = (modal, link) => {
    const searchParams = new URLSearchParams(location.search);
    // const linkParams = new URLSearchParams(link);

    // const pageId = linkParams.get("pageId");
    // const slug = linkParams.get("slug");

    searchParams.set("modal", modal);
    // if (pageId) searchParams.set("pageId", pageId);
    if (link) searchParams.set("slug", link);

    navigate(`${location.pathname}?${searchParams.toString()}`, {
      replace: true,
    });
  };

  return (
    <div className={classes.PageContent}>
      <div className={classes.PromotionsContainer}>
        <div className={classes.PromotionsHeader} id="PromotionsHeader">
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
            {promoImg && promoImg !== "" ? (
              <div
                className={classes.PromoBannerImg}
                style={{ backgroundImage: `url(${promoImg})` }}
              ></div>
            ) : (
              <img src={PromoImage} alt="" />
            )}
          </div>
        </div>
        <div className={classes.PromotionsBody} id="PromotionsBody">
          {promotions && promotions.length > 0 ? (
            promotions.map((promo, index) => (
              <div className={classes.Promo} key={index}>
                <div className={classes.PromoCard} key={index} id="PromoCard">
                  <div
                    className={classes.BgImage}
                    style={{ backgroundImage: `url(${promo.image})` }}
                  ></div>
                  <div className={classes.Content}>
                    <div className={classes.PromoTop}>
                      <div className={classes.PromoTitle}>
                        <span>{translate(`${promo.title}`)}</span>
                      </div>
                      <div className={classes.PromoText}>
                        <span>{translate(`${promo.content}`)} </span>
                      </div>
                    </div>
                    <div className={classes.PromoBottom}>
                      <div className={classes.Buttons}>
                        {promo.link !== "" && (
                          <MainButton
                            color="secondary"
                            onClick={() =>
                              addParamsToUrl("promotion", promo.link)
                            }
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
              <span style={{ color: "var(--brand-green)" }}>
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
