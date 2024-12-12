import { useState } from "react";
import { useDispatch } from "react-redux";
import { translate } from "../../../utils/translations";

import classes from "./SelfExclusion.module.css";

const AccountClosure = () => {
  const dispatch = useDispatch();

  return (
    <div className={classes.Content} style={{ padding: "1rem" }}>
      <p style={{ color: "white", alignSelf: "start" }}>
        {translate(`If you wish to close your account, please contact us`)}.
      </p>
    </div>
  );
};

export default AccountClosure;
