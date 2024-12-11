import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import classes from "./RGT.module.css";
import Dropdown2 from "../../../features/UI/Dropdown/Dropdown5";
import { translate } from "../../../utils/translations";
import { AnimatePresence } from "framer-motion";
import AngleDownIcon from "../../../assets/svgs/angle-down.svg?react";
import AccountActivity from "./AccountActivity";

const RGT = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const [page, setPage] = useState("Account Activity");
  return (
    <div className={classes.PageContainer}>
      <div
        className={
          showDropdown
            ? [classes.DropdownWrapper, classes.Show].join(" ")
            : classes.DropdownWrapper
        }
      >
        <button
          className={classes.DropdownButton}
          onClick={() => setShowDropdown(!showDropdown)}
        >
          <span>{page}</span>
          <AngleDownIcon />
        </button>
        <AnimatePresence>
          {showDropdown && (
            <Dropdown2 onClickOutside={() => setShowDropdown(false)}>
              <div className={classes.DropdownMenu}>
                <div
                  className={
                    page === "Account Activity"
                      ? [classes.DropdownItem, classes.Active].join(" ")
                      : classes.DropdownItem
                  }
                  onClick={() => {
                    setShowDropdown(false);
                    setPage("Account Activity");
                  }}
                >
                  {translate("Account Activity")}
                </div>
                <div
                  className={
                    page === "Account Limits"
                      ? [classes.DropdownItem, classes.Active].join(" ")
                      : classes.DropdownItem
                  }
                  onClick={() => {
                    setShowDropdown(false);
                    setPage("Account Limits");
                  }}
                >
                  {translate("Account Limits")}
                </div>
                <div
                  className={
                    page === "Time-Out"
                      ? [classes.DropdownItem, classes.Active].join(" ")
                      : classes.DropdownItem
                  }
                  onClick={() => {
                    setShowDropdown(false);
                    setPage("Time-Out");
                  }}
                >
                  {translate("Time-Out")}
                </div>
                <div
                  className={
                    page === "Self-Exclusion"
                      ? [classes.DropdownItem, classes.Active].join(" ")
                      : classes.DropdownItem
                  }
                  onClick={() => {
                    setShowDropdown(false);
                    setPage("Self-Exclusion");
                  }}
                >
                  {translate("Self-Exclusion")}
                </div>
                <div
                  className={
                    page === "Account Closure"
                      ? [classes.DropdownItem, classes.Active].join(" ")
                      : classes.DropdownItem
                  }
                  onClick={() => {
                    setShowDropdown(false);
                    setPage("Account Closure");
                  }}
                >
                  {translate("Account Closure")}
                </div>
                <div
                  className={
                    page === "Reality Checks"
                      ? [classes.DropdownItem, classes.Active].join(" ")
                      : classes.DropdownItem
                  }
                  onClick={() => {
                    setShowDropdown(false);
                    setPage("Reality Checks");
                  }}
                >
                  {translate("Reality Checks")}
                </div>
              </div>
            </Dropdown2>
          )}
        </AnimatePresence>
      </div>
      <div className={classes.Content}>
        {page === "Account Activity" && <AccountActivity />}
        {page === "Account Limits" && <AccountActivity />}
        {page === "Time-Out" && <AccountActivity />}
        {page === "Self-Exclusion" && <AccountActivity />}
        {page === "Account Closure" && <AccountActivity />}
        {page === "Reality Checks" && <AccountActivity />}
      </div>
    </div>
  );
};

export default RGT;
