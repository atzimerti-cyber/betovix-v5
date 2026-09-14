import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import classes from "./Promotions.module.css";
import { getPromotion } from "./promotionsAsyncActions";
import { promotionsActions } from "./promotionsSlice";
import { translate } from "../../utils/translations";
import PromotionsIcon from "../../assets/svgs/promotions.svg?react";
import MainButton from "../../features/UI/Buttons/MainButton";

const Promotions = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const lang = useSelector((state) => state.app.lang);
  const promotions = useSelector((state) => state.promotions.promotions);
  const promoImg = useSelector((state) => state.app.siteSettings.PromoImg);

  useEffect(() => {
    const controller = new AbortController();
    dispatch(getPromotion(controller.signal));

    return () => {
      controller.abort();
      dispatch(promotionsActions.reset());
    };
  }, [dispatch, lang]);

  const addParamsToUrl = (modal, link) => {
    const searchParams = new URLSearchParams(location.search);
    searchParams.set("modal", modal);
    if (link) searchParams.set("slug", link);

    navigate(`${location.pathname}?${searchParams.toString()}`, {
      replace: true,
    });
  };

  return (
    <div className={classes.PageContent}>
      <div className={classes.PromotionsContainer}>
        <header
          className={`${classes.PromotionsHeader} ${!promoImg ? classes.NoBanner : ""}`}
          id="PromotionsHeader"
        >
          {promoImg ? (
            <div
              className={classes.PromoBannerImg}
              style={{ backgroundImage: `url(${promoImg})` }}
              aria-hidden="true"
            />
          ) : null}
          <div className={classes.HeaderShade} aria-hidden="true" />
          <div className={classes.Title}>
            <div className={classes.TitleIcon}><PromotionsIcon /></div>
            <div>
              <span>{translate("Promotions")}</span>
              <p>
                {translate(
                  "Explore exclusive casino and sportsbook promotions and special bonuses to boost your play"
                )}.
              </p>
            </div>
          </div>
        </header>

        <div className={classes.PromotionsBody} id="PromotionsBody">
          {promotions?.length ? (
            promotions.map((promo) => (
              <article className={classes.Promo} key={promo.id || promo.link || promo.title}>
                <div className={classes.PromoCard} id="PromoCard">
                  {promo.image ? (
                    <div
                      className={classes.BgImage}
                      style={{ backgroundImage: `url(${promo.image})` }}
                      aria-hidden="true"
                    />
                  ) : (
                    <div className={classes.PromoImagePlaceholder} aria-hidden="true">
                      <PromotionsIcon />
                    </div>
                  )}
                  <div className={classes.CardShade} aria-hidden="true" />
                  <div className={classes.Content}>
                    <div className={classes.PromoTop}>
                      <div className={classes.PromoTitle}>{translate(`${promo.title || "Promotion"}`)}</div>
                      {promo.content ? (
                        <div className={classes.PromoText}>{translate(`${promo.content}`)}</div>
                      ) : null}
                    </div>
                    {promo.link ? (
                      <div className={classes.PromoBottom}>
                        <MainButton
                          color="primary"
                          onClick={() => addParamsToUrl("promotion", promo.link)}
                          className={classes.LinkButton}
                        >
                          {translate("Read More")}
                        </MainButton>
                      </div>
                    ) : null}
                  </div>
                </div>
              </article>
            ))
          ) : (
            <div className={classes.NoRes}>
              <PromotionsIcon />
              <span>{translate("No available promotions at this moment.")}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Promotions;
