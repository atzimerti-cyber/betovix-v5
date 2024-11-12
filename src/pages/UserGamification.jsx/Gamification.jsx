import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import classes from "./Gamification.module.css";
import { useNavigate, useLocation } from "react-router-dom";
import MainButton from "../../features/UI/Buttons/MainButton";
import DbTabs from "../../features/UI/Tabs/DbTabs";
import MyRewards from "./features/MyRewards";
import { translate } from "../../utils/translations";

const Gamification = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const lang = useSelector((state) => state.app.lang); // Necessary for rerendering translations

  const addParamsToUrl = (modal, tab) => {
    const searchParams = new URLSearchParams(location.search);
    searchParams.set("modal", modal);
    if (tab) searchParams.set("tab", tab);

    navigate(`${location.pathname}?${searchParams.toString()}`, {
      replace: true,
    });
  };

  const dispatch = useDispatch();
  const [showTab, setShowTab] = useState("my-rewards");

  return (
    <div className={classes.PageContent}>
      <div className={classes.SportsBook}>
        <div className={classes.Content}>
          <DbTabs
            tabs={[
              {
                id: "my-rewards",
                label: translate("My Rewards"),
                active: showTab === "my-rewards",
              },
              //{ id: 'other', label: 'Other', active: showTab === 'other' },
            ]}
            onChangeTab={(tab) => setShowTab(tab)}
            titleGroupStyle={{ justifyContent: "flex-start" }}
          >
            <MyRewards isActive={showTab === "my-rewards" ? true : false} />
          </DbTabs>
        </div>
      </div>
    </div>
  );
};

export default Gamification;
