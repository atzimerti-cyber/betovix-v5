import classes from "./TabsVertical.module.css";
import Ripple from "../Ripple/Ripple";

const TabsVertical = (props) => {
  return (
    <div className={classes.Tabs}>
      {props.tabs.map((tab) => {
        if (tab.id) {
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
              {tab.icon && tab.icon}
              <p>{tab.label}</p>
              {props.type === "buttons" && (
                <Ripple type="square" opacity={0.2} />
              )}
            </div>
          );
        }
        return null;
      })}
    </div>
  );
};

export default TabsVertical;
