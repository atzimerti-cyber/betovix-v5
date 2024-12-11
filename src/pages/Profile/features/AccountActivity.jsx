import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import classes from "./AccountActivity.module.css";

const AccountActivity = () => {
  const dispatch = useDispatch();
  return (
    <div className={classes.Content}>
      <div className={classes.Container}></div>
      <div className={classes.Container}></div>
      <div className={classes.Container}></div>
    </div>
  );
};

export default AccountActivity;
