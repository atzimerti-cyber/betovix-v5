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
  const promoPageImg = useSelector(
    (state) => state.app.siteSettings?.PromoPageImg || state.app.siteSettings?.PromoImg
  );

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
    <div
      className={classes.Page}
      style={
        promoPageImg
          ? { "--promo-page-bg": `url(${promoPageImg})` }
          : undefined
      }
    >
      <div className={classes.PageContent}>
        <section className={classes.Hero}>
          <div className={classes.HeroCopy}>
            <h1>{translate("Welcome & Reload Promotions")}</h1>
            <p>
              {translate(
                "Discover exclusive offers designed to give you more value every time you play."
              )}
            </p>
          </div>
        </section>

        <section className={classes.PromotionsBody} id="PromotionsBody">
          {promotions === null ? (
            Array.from({ length: 2 }, (_, index) => (
              <article className={classes.Promo} key={`promo-skeleton-${index}`}>
                <div className={classes.SectionTitleSkeleton} />
                <div className={classes.PromoSkeleton} />
              </article>
            ))
          ) : promotions.length ? (
            promotions.map((promo) => (
              <article
                className={classes.Promo}
                key={promo.id || promo.link || promo.title}
              >
                <div className={classes.SectionTitle}>
                  <PromotionsIcon />
                  <span>{translate(`${promo.title || "Promotion"}`)}</span>
                </div>

                <div
                  className={`${classes.PromoCard} ${promo.link ? classes.Clickable : ""}`}
                  onClick={
                    promo.link
                      ? () => addParamsToUrl("promotion", promo.link)
                      : undefined
                  }
                  role={promo.link ? "button" : undefined}
                  tabIndex={promo.link ? 0 : undefined}
                  onKeyDown={
                    promo.link
                      ? (event) => {
                          if (event.key === "Enter" || event.key === " ") {
                            event.preventDefault();
                            addParamsToUrl("promotion", promo.link);
                          }
                        }
                      : undefined
                  }
                >
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

                  {promo.link ? (
                    <div className={classes.Action} onClick={(event) => event.stopPropagation()}>
                      <MainButton
                        color="primary"
                        onClick={() => addParamsToUrl("promotion", promo.link)}
                        className={classes.LinkButton}
                      >
                        {translate("Open details")}
                      </MainButton>
                    </div>
                  ) : null}
                </div>
              </article>
            ))
          ) : (
            <div className={classes.NoRes}>
              <PromotionsIcon />
              <span>{translate("No available promotions at this moment.")}</span>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default Promotions;
