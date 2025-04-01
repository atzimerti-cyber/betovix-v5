import { useEffect, useState, useCallback, useRef } from "react";
import { Tooltip } from "react-tooltip";
import { CopyToClipboard } from "react-copy-to-clipboard";

import classes from "./CopyToClipboardCont.module.css";
import CopyIcon from "../../assets/svgs/copy.svg?react";
import Check2Icon from "../../assets/svgs/check2.svg?react";

const CopyToClipboardCont = (props) => {
  const timeoutRef1 = useRef(null);
  const timeoutRef2 = useRef(null);

  const [isHovered, setIsHovered] = useState(false);
  const [closedProgrammatically, setClosedProgrammatically] = useState(false);
  const [copied, setCopied] = useState(false);

  // Combined condition to determine if the tooltip should be shown
  const shouldShowTooltip =
    closedProgrammatically === false && (copied || isHovered);

  const onCopy = useCallback(() => {
    clearTimeout(timeoutRef1.current);
    clearTimeout(timeoutRef2.current);

    setCopied(true);

    timeoutRef1.current = setTimeout(() => {
      setClosedProgrammatically(true);
    }, 2800);

    timeoutRef2.current = setTimeout(() => {
      setClosedProgrammatically(false);
      setCopied(false);
    }, 3000);
  }, []);

  useEffect(() => {
    return () => {
      clearTimeout(timeoutRef1.current);
      clearTimeout(timeoutRef2.current);
    };
  }, []);

  return (
    <div className={classes.InputContainer}>
      <input id="container" type="text" readOnly value={props.text} />

      <Tooltip
        id="copy-tooltip"
        isOpen={shouldShowTooltip}
        style={{
          padding: "8px 6px",
          backgroundColor: copied ? "var(--brand-green)" : "var(--brand-color)",
          color: "var(--text-in-brand)",
          fontFamily: "inherit",
          fontSize: "14px",
          fontWeight: "600",
        }}
        // style={{ padding: '8px 6px', backgroundColor: copied ? '#33c16c' : '#314b61', color: '#fff', fontFamily: 'Proxima Nova', fontSize: '14px' }}
      />

      <div
        className={
          props.text ? classes.Copy : [classes.Copy, classes.Disabled].join(" ")
        }
        data-tooltip-id={"copy-tooltip"}
        data-tooltip-content={copied ? "Copied!" : "Copy"}
        data-tooltip-place="bottom"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <CopyToClipboard onCopy={onCopy} text={props.text}>
          <button id="button">
            <label
              htmlFor="button"
              className={
                copied
                  ? [classes.Label, classes.Copied].join(" ")
                  : classes.Label
              }
            >
              <CopyIcon className={classes.CopyIcon} />
              <Check2Icon className={classes.CheckIcon} />
            </label>
          </button>
        </CopyToClipboard>
      </div>
    </div>
  );
};

export default CopyToClipboardCont;
