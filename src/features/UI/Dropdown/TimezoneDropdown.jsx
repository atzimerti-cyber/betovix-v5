import { useCallback, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

import classes from "./TimezoneDropdown.module.css";
import AngleDownIcon from "../../../assets/svgs/arrowdown.svg?react";
import SearchIcon from "../../../assets/svgs/search2.svg?react";
import useClickOutside from "../../../hooks/useClickOutside";
import { translate } from "../../../utils/translations";

const Dropdown = (props) => {
  const dropdownRef = useRef(null);
  const dropdownContentRef = useRef(null);
  const selectedRef = useRef(null);
  const timeoutRef = useRef(null);

  const lang = useSelector((state) => state.app.lang); // Necessary for rerendering translations

  const [showDropdown, setShowDropdown] = useState();
  const [searchStr, setSearchStr] = useState("");
  const [filteredOptions, setFilteredOptions] = useState(null);

  const close = useCallback(() => setShowDropdown(false), []);
  useClickOutside(dropdownRef, close);

  useEffect(() => {
    return () => clearTimeout(timeoutRef.current);
  }, []);

  //   useEffect(() => {
  //     if (
  //       props.scrollToSelected &&
  //       showDropdown &&
  //       selectedRef.current &&
  //       dropdownContentRef.current
  //     ) {
  //       const parent = dropdownContentRef.current;
  //       const child = selectedRef.current;

  //       const parentRect = parent.getBoundingClientRect();
  //       const childRect = child.getBoundingClientRect();

  //       const offsetTop = childRect.top - parentRect.top;

  //       parent.scrollTop +=
  //         offsetTop - parent.clientHeight / 2 + child.clientHeight / 2;
  //     }
  //   }, [showDropdown]); // Scroll selected in view

  useEffect(() => {
    if (!searchStr || searchStr === "") {
      setFilteredOptions(props.options);
    } else {
      const f = props.options.filter((o) =>
        o.label.toLowerCase().includes(searchStr.toLowerCase())
      );
      setFilteredOptions(f);
    }
  }, [searchStr, props.options]);

  const onSelect = (option) => {
    // setShowDropdown(false);
    props.onSelect(option);
  };

  const filterOptions = (value) => {
    setSearchStr(value);
  };

  const onButtonClick = (e) => {
    e.preventDefault();
    setShowDropdown((prev) => !prev);
  };

  let elClasses = [classes.Dropdown];

  if (showDropdown) elClasses.push(classes.Show);
  if (props.disabled) elClasses.push(classes.Disabled);

  const getLabel = (option) => {
    if (props.type === "array") return option;

    let label = "";
    if (props.labelWith) {
      props.labelWith.forEach((labelItem) => {
        label = label + option[labelItem] + ", ";
      });
      label = label.slice(0, -2);
    } else label = option.label;

    return label;
  };

  const dropdownContent = (
    // <CustomScroll heightRelativeToParent="100%">
    <div className={classes.Scrollable}>
      <ul className={props.short ? classes.Short : null}>
        {/* {props.withSearch && (
            <div className={classes.SearchContainer}>
              <span className={classes.LeftIcon}>{<SearchIcon />}</span>
              <input
                type="textBox"
                value={searchStr}
                placeholder="Search"
                onChange={(e) => filterOptions(e.target.value)}
              />
            </div>
          )} */}
        {filteredOptions && filteredOptions.length > 0 ? (
          filteredOptions.map((option) => {
            const unique = props.unique || "id";

            const optionValue =
              props.type === "array" ? option : option[unique];
            const selectedValue =
              props.type === "array" ? props.selected : props.selected[unique];

            return (
              <li
                key={optionValue}
                data-option={optionValue}
                ref={selectedValue === optionValue ? selectedRef : null}
                onClick={() => onSelect(option)}
              >
                <div
                  className={
                    props.selected && selectedValue === optionValue
                      ? [classes.Option, classes.Active].join(" ")
                      : classes.Option
                  }
                >
                  {option.icon && (
                    <img src={option.icon} loading="lazy" alt={option.label} />
                  )}
                  <span>{getLabel(option)}</span>
                </div>
              </li>
            );
          })
        ) : (
          <span className={classes.NoOptions}>
            {translate("No options available")}
          </span>
        )}
      </ul>
    </div>
    // </CustomScroll>
  );

  return (
    <div ref={dropdownRef} className={elClasses.join(" ")}>
      <div className={classes.DropdownButton} onClick={onButtonClick}>
        <div className={classes.Label}>
          {props.icon && (
            <img src={props.icon} loading="lazy" alt={props.placeholder} />
          )}
          <span className={props.selected ? null : classes.Placeholder}>
            {props.selected ? getLabel(props.selected) : props.placeholder}
          </span>
        </div>
        <AngleDownIcon className={classes.DownArrow} />
        <div className={classes.DropdownContent}>{dropdownContent}</div>
      </div>
    </div>
  );
};

export default Dropdown;
