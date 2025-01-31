import { useDispatch, useSelector } from "react-redux";
import { useTimezoneSelect, allTimezones } from "react-timezone-select";

import classes from "./Timezone.module.css";
import Dropdown from "../../features/UI/Dropdown/TimezoneDropdown";
import { storageSetTimezone } from "../../utils/storage";
import { appActions } from "../InitApp/appSlice";

const Timezone = () => {
  const dispatch = useDispatch();
  const timezone = useSelector((state) => state.app.timezone); // triggers recalc on timezone change

  const { options } = useTimezoneSelect({
    labelStyle: "original",
    timezones: allTimezones,
  });

  const onSetTimezone = (value) => {
    dispatch(appActions.setTimezone(value));
    storageSetTimezone(value);
  };

  return (
    <div className={classes.Timezone}>
      {timezone && (
        <Dropdown
          unique="value"
          options={options}
          selected={timezone}
          onSelect={onSetTimezone}
          scrollToSelected
        />
      )}
    </div>
  );
};

export default Timezone;
