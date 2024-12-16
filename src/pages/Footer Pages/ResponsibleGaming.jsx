import { useSelector, useDispatch } from "react-redux";
import classes from "./TermsOfService.module.css";

import { translate } from "../../utils/translations";
import { useEffect } from "react";
import { getPage } from "./pagesAsyncActions";
import { pagesActions } from "./pagesSlice";

const ResponsibleGaming = () => {
  const dispatch = useDispatch();

  const lang = useSelector((state) => state.app.lang);
  const content = useSelector((state) => state.pages.rpg?.Content);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    dispatch(getPage(signal, "rpg"));

    return () => {
      controller.abort();
      dispatch(pagesActions.reset());
    };
  }, []);

  return (
    <div
      className={classes.PageContent}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
};

export default ResponsibleGaming;
