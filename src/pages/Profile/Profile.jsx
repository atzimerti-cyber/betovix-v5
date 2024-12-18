import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import classes from "./Profile.module.css";
import UserIcon from "../../assets/svgs/user.svg?react";
import GlobeIcon from "../../assets/svgs/globe.svg?react";
import Settings2Icon from "../../assets/svgs/settings2.svg?react";
import CheckFilledIcon from "../../assets/svgs/verify.svg?react";
import LogoSmallIcon from "../../assets/svgs/logo-small-onecolor.svg?react";
import ToolsIcon from "../../assets/svgs/tools.svg?react";
import TabsVertical from "../../features/UI/Tabs/TabsVertical";
import Overview from "./features/Overview";
import Settings from "./features/Settings";
import Verification from "./features/Verification";

//import Hero from './features/Hero';
import Heroes from "../UserGamification.jsx/features/Heroes";

import BarLoading from "../../features/UI/BarLoading/BarLoading";
import { translate } from "../../utils/translations";
import RGT from "./features/RGT";

const Profile = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const tab = query.get("tab");

  const lang = useSelector((state) => state.app.lang);

  const permissions = useSelector((state) => state.app.permissions);
  const barLoading = useSelector((state) => state.app.barLoading);
  const [selectedTab, setSelectedTab] = useState(tab || "overview");

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    searchParams.set("tab", selectedTab);
    navigate(`${location.pathname}?${searchParams.toString()}`, {
      replace: true,
    });
  }, [selectedTab]);

  return (
    <>
      <AnimatePresence>{barLoading && <BarLoading />}</AnimatePresence>

      <div className={classes.PageContent}>
        <h1 className={classes.PageTitle}>
          <UserIcon fill="#199bcf" />
          {translate("Profile")}
        </h1>

        <div className={classes.TabsContainer}>
          <div className={classes.Container}>
            <TabsVertical
              tabs={[
                {
                  id: "overview",
                  label: translate("Overview"),
                  icon: <GlobeIcon />,
                  active: selectedTab === "overview",
                },
                permissions.AllowGamification && {
                  id: "heroes",
                  label: translate("Realm of Heroes"),
                  icon: <LogoSmallIcon />,
                  active: selectedTab === "heroes",
                },
                {
                  id: "settings",
                  label: translate("Settings"),
                  icon: <Settings2Icon />,
                  active: selectedTab === "settings",
                },
                {
                  id: "verification",
                  label: translate("Verification"),
                  icon: <CheckFilledIcon />,
                  active: selectedTab === "verification",
                },
                {
                  id: "rgt",
                  label: translate("Responsible Gambling Tools"),
                  icon: <ToolsIcon />,
                  active: selectedTab === "rgt",
                },
              ]}
              onChangeTab={(tab) => setSelectedTab(tab)}
              type="buttons"
            />

            <div className={classes.TabPanel}>
              {selectedTab === "overview" && <Overview />}
              {selectedTab === "heroes" && permissions.AllowGamification && (
                <Heroes />
              )}
              {selectedTab === "settings" && <Settings />}
              {selectedTab === "verification" && <Verification />}
              {selectedTab === "rgt" && <RGT />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
