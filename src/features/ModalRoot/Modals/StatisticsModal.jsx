import { useNavigate, useLocation } from "react-router-dom";

import classes from "./StatisticsModal.module.css";
import { useDispatch, useSelector } from "react-redux";
import DsButton from "../../UI/Buttons/DsButton";
import CloseButton from "../../UI/Buttons/CloseButton";
import { appActions } from "../../InitApp/appSlice";
import { translate } from "../../../utils/translations";
import config from "../../../config";

const StatisticsModal = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const lang = useSelector((state) => state.app.lang); // Necessary for rerendering translations
  const bcStats = useSelector((state) => state.app.siteSettings.BCStats);

  return (
    <div className={classes.Statistics}>
      <div className={classes.ModalContent}>
        <header>
          <span className={classes.Center}>
            <h1>{translate("STATS")}</h1>
          </span>
          <span className={classes.Right}>
            <CloseButton
              timesIcon
              color="transparent"
              onClick={() => navigate(location.pathname)}
            />
          </span>
        </header>

        <div className={classes.StatisticsContent}>
          {/* <iframe
                        src={`/stats/Stats.html`}
                        style={{ width: '100%', height: '100%', border: 'none' }}
                        title="Stats"
                    /> */}
          {bcStats === true ? (
            <iframe
              // src={`https://pick777.net/stats/Stats.html?styles=${config.VITE_STATS_THEME}#${lang.id}`}
              src={`https://stats.feedconstruct.com/statifyV2/langId=en/pwd=647/key=93f428d0-6591-48da-859d-b6c326db2448/sportId=1/tId=null`}
              style={{ width: "100%", height: "100%", border: "none" }}
              title="Stats"
            />
          ) : (
            <iframe
              src={`https://pick777.net/stats/Stats.html?styles=${config.VITE_STATS_THEME}#${lang.id}`}
              style={{ width: "100%", height: "100%", border: "none" }}
              title="Stats"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default StatisticsModal;
