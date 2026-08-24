import { useMemo } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

import NotAuthorized from "./NotAuthorized";

const HasPermission = ({
  checkPermissions,
  redirect = null,
  onChangeHomePage = null,
  children,
}) => {
  const location = useLocation();
  const user = useSelector((state) => state.login.user);
  const permissions = useSelector((state) => state.login.permissions) || {};
  const siteSettings = useSelector((state) => state.app.siteSettings) || {};

  const isAllowed = useMemo(() => {
    if (!checkPermissions?.length) return true;
    return checkPermissions.some(
      (checkPermission) => permissions?.[checkPermission] === true
    );
  }, [checkPermissions, permissions]);

  if (siteSettings.NeedAuth === true && !user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (isAllowed) return children;
  if (onChangeHomePage) return onChangeHomePage;
  if (redirect) return <Navigate to={redirect} replace />;

  return <NotAuthorized />;
};

export default HasPermission;
