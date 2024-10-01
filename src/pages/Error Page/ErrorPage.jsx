import { useSelector, useDispatch } from "react-redux";
import classes from "./ErrorPage.module.css";

import ErrorIcon from '../../assets/svgs/errorsvg.svg?react'

import { translate } from "../../utils/translations";

const ErrorPage = () => {
  const dispatch = useDispatch();

  const lang = useSelector((state) => state.app.lang);

  return (
    <div className={classes.PageContent}>
        <h1>Oops!</h1>
        <p>404 - Page Not Found</p>
        <p>The page you're looking for doesn't exist.</p>
        <ErrorIcon/>
    </div>
  );
};

export default ErrorPage;
