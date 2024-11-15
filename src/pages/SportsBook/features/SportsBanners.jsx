import { Link } from "react-router-dom";
import { useState } from "react";
import { SwiperSlide } from "swiper/react";

import classes from "./SportsBanners.module.css";
import BigSwiper from "../../../features/UI/MainSwiper/BigSwiper";
import LoaderPlaceholder from "../../../features/UI/Skeletons/LoaderPlaceholder";
import OddsButton from "./OddsButton";
import { useDispatch, useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";

const SportsBanners = (props) => {
  const [loadedImages, setLoadedImages] = useState([]);

  const updateLoadedImages = (index) => {
    setLoadedImages((prevData) => [...prevData, index]);
  };
  const isTablet = useMediaQuery({ query: "(max-width: 850px)" });

  const getOddsLabel = (label) => {
    if (label === "W1") return "1";
    else if (label === "W2") return "2";
    else if (label === "Draw") return "x";

    return translate(label);
  };

  const dateFormatter = (dateStr) => {
    const date = new Date(dateStr);

    // Format the date
    const options = { year: "numeric", month: "long", day: "numeric" };
    const formattedDate = date.toLocaleDateString("en-GB", options);

    // Format the time
    const formattedTime = date.toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });

    // Combine date and time
    const formattedDateTime = `${formattedDate} - ${formattedTime}`;
    return formattedDateTime;
  };

  return (
    <BigSwiper slidesPerView={isTablet ? 1 : 2} autoplay delay={6000}>
      {props.banners ? (
        props.banners.map((banner, index) => {
          let link = null;
          return (
            <SwiperSlide key={banner.Id}>
              <div className={classes.BannerBackground}>
                {loadedImages.includes(index) === false && (
                  <LoaderPlaceholder />
                )}
                <img
                  src={banner.Img}
                  alt="Banner"
                  onLoad={() => updateLoadedImages(index)}
                />
              </div>
              {banner.event && (
                <div className={classes.EventInfoWrapper}>
                  <div className={classes.EventInfo}>
                    <div className={classes.EventHeader}>
                      <p>
                        {banner.event?.Info.SportName?.International}
                        {" / "}
                        {banner.event?.Info.CategoryName?.International}
                        {" / "}
                        {banner.event?.Info.TournamentName?.International}
                      </p>
                    </div>
                    <div className={classes.EventDate}>
                      <p>{dateFormatter(banner.event?.Info.DateOfMatch)}</p>
                    </div>
                    <Link
                      to={`/event/${banner.event?.Info.SportName?.International.toLowerCase().replace(
                        / /g,
                        "-"
                      )}/${banner.event?.Info.SportId}/${
                        banner.event?.Header.MatchId
                      }`}
                    >
                      <div className={classes.EventTeams}>
                        <div className={classes.HomeTeam}>
                          <div
                            className={classes.Img}
                            style={{
                              backgroundImage: `url(https://cdnsports.storetube.gr/assets/teams/b/${banner.event?.Info?.HomeTeamId}.png)`,
                            }}
                          ></div>
                          <p>
                            {banner.event?.Info?.HomeTeamName?.International}
                          </p>
                        </div>
                        <span>VS</span>
                        <div className={classes.AwayTeam}>
                          <div
                            className={classes.Img}
                            style={{
                              backgroundImage: `url(https://cdnsports.storetube.gr/assets/teams/b/${banner.event?.Info?.AwayTeamId}.png)`,
                            }}
                          ></div>
                          <p>
                            {banner.event?.Info?.AwayTeamName?.International}
                          </p>
                        </div>
                      </div>
                    </Link>
                    <div className={classes.EventMarkets}>
                      {banner.event.Markets &&
                      banner.event.Markets.length > 0 ? (
                        banner.event.Markets.find(
                          (market) => market.MarketTypeId === 14
                        )?.MarketFields.map((marketField) => (
                          <OddsButton
                            key={marketField.FieldId}
                            label={getOddsLabel(
                              marketField.FieldName?.International
                            )}
                            event={banner.event}
                            market={banner.event?.Markets.find(
                              (market) => market.MarketTypeId === 14
                            )}
                            marketField={marketField}
                            odds={marketField.Value}
                            disabled={!marketField.Active}
                            style="card"
                            className={classes.Market}
                          />
                        ))
                      ) : (
                        <>
                          <OddsButton
                            key={0}
                            label=""
                            event={banner.event}
                            market={null}
                            marketField={null}
                            odds="-"
                            disabled={true}
                            style="card"
                          />
                          <OddsButton
                            key={1}
                            label=""
                            event={banner.event}
                            market={null}
                            marketField={null}
                            odds="-"
                            disabled={true}
                            style="card"
                          />
                        </>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </SwiperSlide>
          );
        })
      ) : (
        <SwiperSlide>
          <Link to={null}>
            <div className={classes.BannerBackground}>
              <LoaderPlaceholder />
            </div>
          </Link>
        </SwiperSlide>
      )}
    </BigSwiper>
  );
};

export default SportsBanners;
