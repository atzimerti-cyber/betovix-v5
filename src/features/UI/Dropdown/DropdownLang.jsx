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
  if (props.openTo === "side") elClasses.push(classes.Side);
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
        // case "gr":
        return "Ελληνικά";
      case "it":
        return "Italiano";
      case "bg":
        return "български";
      case "am":
        return "Amharic";
      case "id":
        return "Bahasa Indonesia";
      case "fr":
        return "Français";
      case "es":
        return "Español";
      case "ru":
        return "Русский";
      case "sq":
        return "Shqip";
      case "sv":
        return "Svenska";
      case "cs":
        return "Čeština";
      case "et":
        return "Eesti";
      case "fi":
        return "Suomi";
      case "hr":
        return "Hrvatski";
      case "mk":
        return "Македонски";
      case "nl":
        return "Nederlands";
      case "no":
        return "Norsk";
      case "pt":
        return "Português";
      case "vi":
        return "Tiếng Việt";
      case "ro":
        return "Română";
      case "he":
        return "עברית";
      case "pl":
        return "Polski";
      case "hu":
        return "Magyar";
      case "lt":
        return "Lietuvių";
      case "lv":
        return "Latviešu";
      case "sk":
        return "Slovenčina";
      case "sl":
        return "Slovenščina";
      case "sr":
        return "Српски";
      case "bs":
        return "Bosanski";
      case "mt":
        return "Malti";
      case "ga":
        return "Gaeilge";
      case "da":
        return "Dansk";
      case "is":
        return "Íslenska";
      default:
        return "-";
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
            <div className={classes.LangItem} style={{ marginRight: "0.5rem" }}>
              <img
                src={`https://cdnwallet.modulesports.com/assets/images/flags/${lang.id}.svg`}
                // src={lang.flag}
                loading="lazy"
                alt={`${lang.id} flag`}
                className={classes.Flag}
              />
            </div>
            <span style={{ color: "white", fontSize: "13px" }}>
              {getLangName(lang.id)}
            </span>
            <CaretDownIcon />
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
      </MainButton>

      {props.topbar && (
        <div className={classes.DropdownContent}>
          <ul className={classes.LangDropdownMenu}>
            {availableLangs.map((availableLang, index) => {
              return (
                <li
                  key={index}
                  onClick={() => onSelectLang(availableLang)}
                  style={{ width: "100%" }}
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
