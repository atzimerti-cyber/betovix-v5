import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { casinoActions } from "../casinoSlice";
import classes from "./Providers.module.css";
import GridVendors from "../features/GridVendors";
import { getAllVendors } from "../casinoAsyncActions";
import useDebounce from "../../../hooks/useDebounce";

const Providers = () => {
  const dispatch = useDispatch();
  useSelector((state) => state.app.lang); // rerender when language changes

  const [searchString, setSearchString] = useState("");
  const debSearchString = useDebounce(searchString);
  const allCasinoVendors = useSelector((state) => state.casino.casinoVendors);

  useEffect(() => {
    const controller = new AbortController();
    dispatch(getAllVendors(controller.signal, null));

    return () => {
      controller.abort();
      dispatch(casinoActions.resetLobby());
      setSearchString("");
    };
  }, [dispatch]);

  useEffect(() => {
    const controller = new AbortController();
    const search = debSearchString?.trim() || null;
    dispatch(getAllVendors(controller.signal, search));

    return () => controller.abort();
  }, [debSearchString, dispatch]);

  return (
    <div className={classes.ProvidersPage}>
      {allCasinoVendors && (
        <GridVendors
          collection={allCasinoVendors}
          searchString={searchString}
          showAllProviders
        />
      )}
    </div>
  );
};

export default Providers;
