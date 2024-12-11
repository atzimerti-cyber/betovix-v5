import { useSelector } from "react-redux";

import classes from "./OutrightsMarket.module.css";
import OddsButton from "../../SportsBook/features/OddsButton";
import Accordion from "../../../features/UI/Accordion/Accordion";
import { translateNameWithLang } from "../../../utils/translations";

const OutrightsMarket = (props) => {
  const lang = useSelector((state) => state.app.lang); // Necessary for rerendering translations

  return (
    <div className={classes.Market}>
      <Accordion
        title={translateNameWithLang(props.market?.MarketName)}
        initOpen={true}
      >
        <div className={classes.MarketContainer}>
          <div
            className={
              props.market?.MarketFields.length === 3
                ? [classes.MarketGroup, classes.ThreeParts].join(" ")
                : classes.MarketGroup
            }
          >
            {props.market?.MarketFields &&
              props.market.MarketFields.map((marketField) => {
                return (
                  <OddsButton
                    key={marketField.FieldId}
                    label={translateNameWithLang(marketField.FieldName)}
                    event={props.event}
                    market={props.market}
                    marketField={marketField}
                    odds={marketField.Value}
                    disabled={
                      props.market.Active === false ||
                      props.market.Active === undefined ||
                      marketField.Active === false ||
                      marketField.Active === undefined
                    }
                  />
                );
              })}
          </div>
        </div>
      </Accordion>
    </div>
  );
};

export default OutrightsMarket;
