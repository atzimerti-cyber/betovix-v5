import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";

import classes from "./LeftMenuItem.module.css";
import { layoutActions } from "../layoutSlice";
import { translate } from "../../../utils/translations";
import PlayButtonIcon from "../../../assets/svgs/playbutton.svg?react";

const LeftMenuItem = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const lang = useSelector((state) => state.app.lang); // Necessary for rerendering translations

  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  let elClasses = [classes.LeftMenuItem];
  if (props.isActive) elClasses.push(classes.Active);
  if (props.hide) elClasses.push(classes.Hide);
  if (props.showEmphasis) elClasses.push(classes.ShowEmphasis);
  if (props.isCateg == false) elClasses.push(classes.NotCateg);
  if (props.isCateg == false && props.isActive)
    elClasses.push(classes.NotCategActive);
  const isGameCategory = String(props.categoryClass || "")
    .split(/\s+/)
    .includes("game-category");
  if (isGameCategory) elClasses.push(classes.GameCategoryItem);

  const onClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (props.item.page) {
      if (/^(https?:)?\/\//.test(props.item.page)) {
        window.location.href = props.item.page;
      } else {
        navigate(props.item.page, {
          state: { label: props.item.label },
        });
      }
    } else if (props.item.modal) {
      const searchParams = new URLSearchParams(location.search);
      searchParams.set("modal", props.item.modal);
      navigate(`${location.pathname}?${searchParams.toString()}`, {
        replace: true,
      });
    }

    if (isMobile) dispatch(layoutActions.setFullLeftContainer(false));
  };

  const iconSource =
    isGameCategory && props.item.icon?.type === "img"
      ? props.item.icon.props?.src
      : null;

  const itemStyle = iconSource
    ? { "--game-category-bg": `url(${JSON.stringify(iconSource)})` }
    : undefined;

  return (
    <li className={elClasses.join(" ")} style={itemStyle} onClick={(e) => onClick(e)}>
      <a
        data-tooltip-id="left-menu-tooltip"
        data-tooltip-content={translate(props.item.label)}
      >
        <div className={classes.IconWrapper}>
          {props.item.icon && props.item.icon}
        </div>

        <div className={classes.ItemText}>
          {props.item.label ? (
            <span>{translate(props.item.label)}</span>
          ) : (
            <span>{translate(props.item.Name)}</span>
          )}
          {props.item.subtitle ? <small>{translate(props.item.subtitle)}</small> : null}
        </div>

        <div className={classes.Container}>
          {isGameCategory && <span className={classes.PlayIndicator}><PlayButtonIcon /></span>}
          {props.item.badge && props.item.badge === "free" && (
            <div className={classes.BadgeFree}>{translate("FREE")}</div>
          )}
          {props.item.badge && props.item.badge === "new" && (
            <div className={classes.BadgeNew}>{translate("NEW")}</div>
          )}
          {props.isNew === "new" && (
            <div className={classes.BadgeNew}>{translate("NEW")}</div>
          )}
          {props.item.timer && (
            <div className={classes.Timer}>{props.item.timer}</div>
          )}
        </div>
      </a>
    </li>
  );
};

export default LeftMenuItem;
