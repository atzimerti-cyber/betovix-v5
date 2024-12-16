import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { getPage } from "./pagesAsyncActions";
import { pagesActions } from "./pagesSlice";

import classes from "./Support.module.css";

import { translate } from "../../utils/translations";

const Pages = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  const lang = useSelector((state) => state.app.lang);
  const page = useSelector((state) => state.pages.page?.Content);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const path = location.pathname; 

    const segments = path.split('/').filter(Boolean);
    const slug = segments[segments.length - 1]; 

    if (slug) dispatch(getPage(signal, slug));

    return () => {
      controller.abort();
      dispatch(pagesActions.reset());
    };

  }, [location.pathname, dispatch]);

  return (
    <div
    className={classes.PageContent}
    dangerouslySetInnerHTML={{ __html: page }}
  />
  );
};

export default Pages;
