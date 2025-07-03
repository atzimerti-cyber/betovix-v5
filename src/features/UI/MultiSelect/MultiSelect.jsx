import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";

import classes from "./MultiSelect.module.css";
import Dropdown3 from "../Dropdown/Dropdown3";
import SearchIcon from "../../../assets/svgs/search.svg?react";
import CheckboxEmptyIcon from "../../../assets/svgs/checkbox-empty.svg?react";
import CheckboxIcon from "../../../assets/svgs/checkbox.svg?react";
import { translate, translateNameWithLang } from "../../../utils/translations";

const MultiSelect = (props) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [filteredOptions, setFilteredOptions] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [searchString, setSearchString] = useState("");

  const getValue = () => {
    const options = selectedOptions.length > 0 ? selectedOptions.join(",") : "";
    return options;
  };

  useEffect(() => {
    if (!searchString) setFilteredOptions(props.options);
    else {
      const options = props.options.filter((o) =>
        o.label.toLowerCase().includes(searchString.toLowerCase())
      );
      setFilteredOptions(options);
    }
  }, [searchString, props.options?.length]);

  useEffect(() => {
    if (props.selected) {
      setSelectedOptions(props.selected.map((option) => option.label));
    }
  }, [props.selected]);

  const updateSelectedOptions = (option) => {
    let so = [...selectedOptions];

    if (selectedOptions.includes(option.label)) {
      so = selectedOptions.filter((o) => o !== option.label);
    } else if (props.max && selectedOptions.length > props.max - 1) {
      if (props.maxMessage) toast.warning(translate(props.maxMessage));

      return;
    } else {
      so.push(option.label);
    }
    setSelectedOptions(so);
  };

  const onClose = () => {
    setShowDropdown(false);
    props.onClose(selectedOptions);
  };

  return (
    <div className={classes.DropdownWrapper}>
      <div className={classes.DropdownInner}>
        <input
          id={props.id}
          readOnly
          role="textbox"
          value={getValue()}
          placeholder={props.placeholder}
          onClick={() => setShowDropdown(!showDropdown)}
        />
        <span className={classes.RightIcon}>{props.icon}</span>

        <AnimatePresence>
          {showDropdown && (
            <Dropdown3>
              <div className={classes.TopElement}>
                <div className={classes.MenuTitle}>{props.menuTitle}</div>
              </div>

              <div className={classes.SumbitButtonContainer}>
                <div
                  className={
                    selectedOptions.length > 0
                      ? classes.ClearLabel
                      : [classes.ClearLabel, classes.Disabled].join(" ")
                  }
                  onClick={() => {
                    setSelectedOptions([]);
                  }}
                >
                  {translate("Clear Selection")}
                  <span className={classes.SelectedCount}>
                    {selectedOptions.length > 0
                      ? "(" + selectedOptions.length + ")"
                      : "(0)"}
                  </span>
                </div>
                <button className={classes.SumbitButton} onClick={onClose}>
                  {translate(`Search`)}
                </button>
              </div>

              <div className={classes.SearchContainer}>
                <span className={classes.LeftIcon}>{<SearchIcon />}</span>
                <input
                  id="search"
                  type="textBox"
                  value={searchString}
                  placeholder="Search"
                  onChange={(e) => setSearchString(e.target.value)}
                />
              </div>
              <div className={classes.List}>
                {filteredOptions.map((option, index) => (
                  <li
                    key={index}
                    className={
                      selectedOptions.length > 0 &&
                        selectedOptions.includes(option.label)
                        ? [classes.VendorOption, classes.Active].join(" ")
                        : classes.VendorOption
                    }
                    onClick={() => updateSelectedOptions(option)}
                  >
                    <a>
                      {selectedOptions.length > 0 &&
                        selectedOptions.includes(option.label) ? (
                        <CheckboxIcon className={classes.Checkbox} />
                      ) : (
                        <CheckboxEmptyIcon className={classes.Checkbox} />
                      )}
                      <div className={classes.OptionLabel}>
                        {translate(option.label)}
                        <span className={classes.Count}>({option.value})</span>
                      </div>
                    </a>
                  </li>
                ))}
              </div>
            </Dropdown3>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default MultiSelect;
