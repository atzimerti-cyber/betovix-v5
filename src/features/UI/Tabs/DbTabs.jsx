import classes from "./DbTabs.module.css";
import Ripple from "../Ripple/Ripple";
import { useSelector } from "react-redux";

const DbTabs = (props) => {
  const lang = useSelector((state) => state.app.lang); // Necessary for rerendering translations
  return (
    <div className={classes.DbTabs}>
      <div className={classes.TitleArea}>
        <div className={classes.TitleGroup} style={props.titleGroupStyle}>
          {props.tabs.map((tab) => {
            return (
              <div
                key={tab.id}
                role="tab"
                className={
                  tab.active
                    ? [classes.Tab, classes.Active].join(" ")
                    : classes.Tab
                }
                onClick={() => props.onChangeTab(tab.id)}
              >
                <div className={classes.TitleText}>{tab.label}</div>
                <Ripple type="square" opacity={0.05} />
              </div>
            );
          })}
        </div>
      </div>

      <div className={classes.TabContent}>{props.children}</div>
    </div>
  );
};

export default DbTabs;
