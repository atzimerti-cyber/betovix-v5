import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

import NotAuthorized from "./NotAuthorized";

const HasPermission = ({ checkPermissions, children }) => {
  const location = useLocation();
  const user = useSelector((state) => state.login.user);
  const permissions = useSelector((state) => state.login.permissions);

  const allowGamification = useSelector((state) => state.app.permissions);

  const [isAllowed, setIsAllowed] = useState(null);

  // useEffect(() => {
  //   let allowed = false;

  //   if (checkPermissions) {
  //     for (let checkPermission of checkPermissions) {
  //       if (permissions[checkPermission]) {
  //         allowed = true;
  //         break;
  //       }
  //     }
  //   }

  //   setIsAllowed(allowed);
  // }, [user?.AccountId, location]);

  useEffect(() => {
    let allowed = false;

    if (Array.isArray(checkPermissions)) {
      for (let checkPermission of checkPermissions) {
        if (
          checkPermission === "AllowGamification" &&
          allowGamification?.AllowGamification
        ) {
          allowed = true;
          break;
        } else if (permissions[checkPermission]) {
          allowed = true;
          break;
        }
      }
    }

    setIsAllowed(allowed);
  }, [
    user?.AccountId,
    location,
    checkPermissions,
    permissions,
    allowGamification,
  ]);

  let page = null;
  if (isAllowed) page = children;
  else if (isAllowed === false) page = <NotAuthorized />;

  return page;
};

export default HasPermission;
