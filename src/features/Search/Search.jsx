import { useSelector, useDispatch } from "react-redux";

import SearchIcon from "../../assets/svgs/search.svg?react";
import TimesIcon from "../../assets/svgs/times.svg?react";
import { layoutActions } from "../Layout/layoutSlice";
import classes from "./Search.module.css";

const Search = (props) => {
  const dispatch = useDispatch();
  const fullLeftContainer = useSelector(
    (state) => state.layout.fullLeftContainer
  );

  let elClasses = [classes.SearchContainer];
  if (props.hide) elClasses.push(classes.Hide);

  return (
    <div
      className={elClasses.join(" ")}
      onClick={() =>
        fullLeftContainer
          ? null
          : dispatch(layoutActions.setFullLeftContainer(true))
      }
      data-tooltip-id={props.dataTooltipId}
      data-tooltip-content={props.dataTooltipContent}
    >
      <input
        id="searchCasino"
        role="search"
        type="search"
        name="search"
        autoComplete="off"
        placeholder={props.placeholder}
        value={props.value}
        onChange={(e) => props.onChange(e.target.value)}
      />

      {fullLeftContainer && props.value ? (
        <span
          className={[classes.RightIcon, classes.DeleteIcon].join(" ")}
          onClick={() => props.onChange("")}
        >
          <TimesIcon />
        </span>
      ) : (
        <span className={classes.RightIcon}>
          <SearchIcon />
        </span>
      )}
    </div>
  );
};

export default Search;
