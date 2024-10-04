import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { motion } from "framer-motion";

import classes from "./UserDrawer.module.css";
import CloseButton from "../../UI/Buttons/CloseButton";
import MenuItems from "./MenuItems";
import { layoutActions } from "../layoutSlice";
import NoUserImg from "../../../assets/images/nouserimg.png";
import CoinsIcon from "../../../assets/svgs/coins.svg?react";
import DropdownLang from "../../UI/Dropdown/DropdownLang";

const UserDrawer = () => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.login.user);
  const inCasinoGame = location.pathname.includes("/casino/game/");

  return (
    <motion.div
      className={classes.UserDrawerMenu}
      initial={{ x: "100%", opacity: 0 }}
      animate={{ x: "0%", opacity: 1 }}
      exit={{ x: "100%", opacity: 0, transition: { duration: 0.2 } }}
      transition={{ duration: 0.2 }}
    >
      <div className={classes.UserDrawerMenuHeader}>
        <div
          className={classes.UserImage}
          style={{
            backgroundImage: `url(${user.Image ? user.Image : NoUserImg})`,
          }}
        ></div>
        <div className={classes.UserInfo}>
          <h2>{user?.Username}</h2>
          <p style={{display:'flex', alignItems: 'center', gap: '0.2rem'}}>
            <CoinsIcon />
            {inCasinoGame ? 'In Play' : user?.Wallet?.Balance}
          </p>
        </div>

        <CloseButton
          timesIcon
          onClick={() => dispatch(layoutActions.setUserDropdownVisible(false))}
        />
      </div>
      <div className={classes.UserDrawerDivider}></div>
      <div className={classes.MenuItems}>
        <MenuItems
          onClick={() => dispatch(layoutActions.setUserDropdownVisible(false))}
        />
        <div className={classes.LangContainer}>
          <DropdownLang fullLabel />
        </div>
      </div>
    </motion.div>
  );
};

export default UserDrawer;
