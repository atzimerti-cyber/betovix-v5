import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";

import classes from "./Overview.module.css";
import CoinsIcon from "../../../assets/svgs/coins.svg?react";
import InfoIcon from "../../../assets/svgs/info-circle.svg?react";
import { getOverview } from "../profileAsyncActions";
import { profileActions } from "../profileSlice";
import DecorationDiv from "../../../features/DecorationDiv/DecorationDiv";
import { translate } from "../../../utils/translations";
import { useNavigate } from "react-router-dom";

const Overview = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const lang = useSelector((state) => state.app.lang); // Necessary for rerendering translations
  const topGames = useSelector((state) => state.profile.topGames);
  const user = useSelector((state) => state.login.user);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    dispatch(getOverview(signal));

    return () => dispatch(profileActions.setTopGames(null));
  }, []);

  function formatUserFriendlyDate(dateString) {
    const date = new Date(dateString);

    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };

    return date.toLocaleDateString(undefined, options);
  }

  return (
    <motion.div
      className={classes.TabContent}
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.2 }}
    >
      <p className={classes.OverviewTitle}>{translate("Overview")}</p>

      <div className={classes.GridContainer}>
        <DecorationDiv color="primary">
          <>
            <p className={classes.TotalName}>{translate("Account Id")}</p>
            <p className={classes.TotalBits}>{user?.Wallet.AccountId}</p>
          </>
        </DecorationDiv>
        <DecorationDiv color="primary">
          <>
            <p className={classes.TotalName}>{translate("Username")}</p>
            <p className={classes.TotalBits}>{user?.Username}</p>
          </>
        </DecorationDiv>
        <DecorationDiv color="primary">
          <>
            <p className={classes.TotalName}>{translate("Member since")}</p>
            <p className={classes.TotalBits}>
              {" "}
              {formatUserFriendlyDate(`${user?.Wallet.CreationDate}`)}{" "}
            </p>
          </>
        </DecorationDiv>
        <DecorationDiv color="primary">
          <>
            <p className={classes.TotalName}>{translate("Total Balance")}</p>
            <p className={classes.TotalBits}>
              <CoinsIcon />
              {user?.Wallet.Balance}
            </p>
          </>
        </DecorationDiv>

        <DecorationDiv color="primary">
          <>
            <p className={classes.TotalName}>{translate("Reserved Balance")}</p>
            <p className={classes.TotalBits}>
              <CoinsIcon />
              {user?.Wallet.ReservedBalance}
              <div
                style={{
                  margin: "0 0.5rem",
                  height: "22px",
                  width: "22px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  cursor: "pointer",
                }}
                onClick={() => navigate("/terms-and-conditions")}
              >
                <InfoIcon />
              </div>
            </p>
          </>
        </DecorationDiv>
        <div
          className={classes.GoToDiv}
          onClick={() => navigate("/sportsbook/mybets")}
          style={{
            cursor: "pointer",
          }}
        >
          <DecorationDiv color="primary">
            <>
              <p className={classes.TotalName}>{translate("Active Tickets")}</p>
              <p className={classes.TotalBits}>{user?.OpenTickets}</p>
            </>
          </DecorationDiv>
        </div>

        <DecorationDiv color="primary">
          <>
            <p className={classes.TotalName}>
              {translate("Wagared in Active Tickets")}
            </p>
            <p className={classes.TotalBits}>
              <CoinsIcon />
              {user?.OpenTotal.toFixed(2)}
            </p>
          </>
        </DecorationDiv>

        {/* <div className={classes.Rewards}>
                    <OverviewCategory title='Instant' percentage='20%' bits={20} />
                    <OverviewCategory title='Daily' percentage='0%' bits={0} />
                    <OverviewCategory title='Weekly' percentage='0%' bits={0} />
                    <OverviewCategory title='Monthly' percentage='0%' bits={0} />
                    <OverviewCategory title='Leaderboard' percentage='0%' bits={0} />
                    <OverviewCategory title='Level up bonus' percentage='0%' bits={0} />
                    <OverviewCategory title='Other' percentage='0%' bits={0} />
                </div> */}
      </div>

      {/* <div className={classes.GamesContainer}>
        <SwiperWithOverlay
          title={translate("Top Games")}
          link="/casino/slots"
          icon={<LogoSmallIcon />}
          items={topGames?.Data}
          max={24}
        />
      </div> */}
    </motion.div>
  );
};

export default Overview;
