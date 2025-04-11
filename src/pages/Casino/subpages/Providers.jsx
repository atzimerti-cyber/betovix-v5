import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";

import { casinoActions } from "../casinoSlice";
import classes from "./Providers.module.css";
import ProvidersIcon from "../../../assets/svgs/providers.svg?react";
import { translate } from "../../../utils/translations";
import GridVendors from "../features/GridVendors";
import { getAllVendors } from "../casinoAsyncActions";
import Search3 from "../../../features/Search/Search3";
import useDebounce from "../../../hooks/useDebounce";

const Providers = () => {
  const dispatch = useDispatch();
  const lang = useSelector((state) => state.app.lang); // Necessary for rerendering translations

  const [searchString, setSearchString] = useState("");
  const debSearchString = useDebounce(searchString);

  const allCasinoVendors = useSelector((state) => state.casino.casinoVendors);
  const user = useSelector((state) => state.login.user);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    dispatch(getAllVendors(signal, null));

    return () => {
      controller.abort();
      dispatch(casinoActions.resetLobby());
      setSearchString(null);
    };
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    if (debSearchString !== "" && debSearchString !== null) {
      dispatch(getAllVendors(signal, debSearchString));
    } else {
      dispatch(getAllVendors(signal, null));
    }

    return () => {
      controller.abort();
    };
  }, [debSearchString]);

  const handleSearchChange = (value) => {
    setSearchString(value);
  };

  return (
    <>
      {allCasinoVendors && (
        <div className={classes.SearchSection}>
          <div className={classes.SearchWrapper}>
            <Search3
              placeholder={translate("Search providers") + "..."}
              searchStr={searchString}
              onChange={handleSearchChange}
            />
          </div>
        </div>
      )}
      <div className={classes.SlotGames}>
        {allCasinoVendors && (
          <GridVendors
            title={translate("Our Providers")}
            icon={<ProvidersIcon />}
            collection={allCasinoVendors}
          />
        )}
      </div>
    </>
  );
};

export default Providers;
