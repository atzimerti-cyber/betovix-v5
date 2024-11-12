import { useRef, useCallback, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import classes from "./DropdownLang.module.css";
import useClickOutside from "../../../hooks/useClickOutside";
import MainButton from "../Buttons/MainButton";
import CaretDownIcon from "../../../assets/svgs/caret-down.svg?react";
import { getTranslations } from "../../InitApp/initAppAsyncActions";
import { transform } from "lodash";

const DropdownLang = (props) => {
  const dispatch = useDispatch();
  const dropdownRef = useRef();

  const fullLeftContainer = useSelector(
    (state) => state.layout.fullLeftContainer
  );
  const lang = useSelector((state) => state.app.lang);
  const availableLangs = useSelector((state) => state.app.availableLangs);

  const [dropdownVisible, setDropdownVisible] = useState(false);

  const close = useCallback(() => setDropdownVisible(false), []);
  useClickOutside(dropdownRef, close);

  let elClasses = [classes.Dropdown];
  if (props.openTo === "top") elClasses.push(classes.Top);
  if (dropdownVisible) elClasses.push(classes.Visible);
  if (!fullLeftContainer) elClasses.push(classes.Closed);

  const onSelectLang = (lang) => {
    dispatch(getTranslations(lang));
    setDropdownVisible(false);
  };

  const getLangName = (iso) => {
    switch (iso) {
      case "en":
        return "English";
      case "tr":
        return "Türkçe";
      case "de":
        return "Deutsch";
      case "ar":
        return "عربي";
      case "el":
        return "Ελληνικά";
      case "it":
        return "Italiano";
      // case "sa":
      //   return "عربي";
      case "am":
        return "Amharic";
    }
  };

  return (
    <div ref={dropdownRef} className={elClasses.join(" ")}>
      <MainButton
        color="transparent"
        onClick={() => setDropdownVisible(!dropdownVisible)}
      >
        {/* {fullLeftContainer ? (
                    lang.label
                ) : (
                    <div className={classes.LangItem}>
                        <img src={lang.flag} loading='lazy' alt={`${lang.id} flag`} className={classes.Flag} />
                    </div>
                )} */}
        {props.fullLabel && (
          <>
            <div className={classes.LangItem} style={{ marginRight: "1rem" }}>
              <img
                src={`https://cdnwallet.modulesports.com/assets/images/flags/${lang.id}.svg`}
                // src={lang.flag}
                loading="lazy"
                alt={`${lang.id} flag`}
                className={classes.Flag}
              />
            </div>
            {lang.label}
          </>
        )}
        {props.topbar && (
          <div className={classes.LangItem}>
            <img
              src={`https://cdnwallet.modulesports.com/assets/images/flags/${lang.id}.svg`}
              //   src={lang.flag}
              loading="lazy"
              alt={`${lang.id} flag`}
              className={classes.Flag}
            />
          </div>
        )}
        <CaretDownIcon />
      </MainButton>

      {props.topbar && (
        <div className={classes.DropdownContent}>
          <ul className={classes.LangDropdownMenu}>
            {availableLangs.map((availableLang, index) => {
              return (
                <li key={index} onClick={() => onSelectLang(availableLang)}>
                  <a>
                    <div className={classes.LangItem}>
                      <img
                        src={`https://cdnwallet.modulesports.com/assets/images/flags/${availableLang.id}.svg`}
                        // src={availableLang.flag}
                        loading="lazy"
                        alt={`${availableLang.id} flag`}
                        className={classes.Flag}
                      />
                    </div>
                    <span>{getLangName(availableLang.id)}</span>
                    {/* <span>{availableLang.label}</span> */}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      )}

      {props.fullLabel && (
        <div className={classes.DropdownContentMobile}>
          <ul className={classes.LangDropdownMenu}>
            {availableLangs.map((availableLang) => {
              return (
                <li
                  key={availableLang.id}
                  onClick={() => onSelectLang(availableLang)}
                >
                  <a>
                    <div className={classes.LangItem}>
                      <img
                        src={`https://cdnwallet.modulesports.com/assets/images/flags/${availableLang.id}.svg`}
                        // src={availableLang.flag}
                        loading="lazy"
                        alt={`${availableLang.id} flag`}
                        className={classes.Flag}
                      />
                    </div>
                    <span>{getLangName(availableLang.id)}</span>
                    {/* <span>{availableLang.label}</span> */}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};

export default DropdownLang;
