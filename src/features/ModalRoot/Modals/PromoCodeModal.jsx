import classes from "./PromoCodeModal.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { redeemPromoCode } from "../../../pages/Promotions/promotionsAsyncActions";
import CloseButton from "../../UI/Buttons/CloseButton";
import { translate } from "../../../utils/translations";
import { toast } from "react-toastify";
import { getPromoCodePage, getPromoCodePageByCode } from "../modalAsyncActions";
import { modalActions } from "../modalSlice";
import MainButton from "../../UI/Buttons/MainButton";
import LogoutIcon from "../../../assets/svgs/logout.svg?react";
import InfoIcon from "../../../assets/svgs/info.svg?react";
import CopyIcon from "../../../assets/svgs/copy3.svg?react";

const PromoCodeModal = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const [code, setCode] = useState("");
  const [disabled, setCodeDisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const user = useSelector((state) => state.login.user);
  const promoSlug = useSelector((state) => state.modal.promoCodeSlug);
  const promoCodePage = useSelector((state) => state.modal.promoCodePage);
  const promoCode = useSelector((state) => state.modal.promoCode);

  const [infoRequested, setInfoRequested] = useState(false);

  const handleInputChange = (e) => {
    setCode(e.target.value);
    setInfoRequested(false);

    if (!e.target.value.trim()) setInfoRequested(false);
  };

  const copyId = () => {
    if (code) {
      navigator.clipboard
        .writeText(code)
        .then(() => {
          let toastMessage = translate("Code copied to clipboard");
          toast.success(toastMessage);
        })
        .catch((err) => {
          let toastMessage = translate("Code can not be copied");
          toast.error(toastMessage);
        });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!code.trim()) {
      toast.error(translate("Please enter a promo code"));
      return;
    }

    setLoading(true);

    const controller = new AbortController();
    const signal = controller.signal;

    dispatch(
      redeemPromoCode(signal, code, (success) => {
        if (success) {
          addParamsToUrl("bonus");
        }
        setLoading(false);
      })
    ).catch(() => {
      setLoading(false);
    });
  };

  const handleInfoClick = () => {
    const controller = new AbortController();
    const signal = controller.signal;

    if (!code.trim()) {
      toast.error(translate("Please enter a promo code"));
      return;
    }

    setInfoRequested(true);

    dispatch(getPromoCodePageByCode(signal, code));

    return () => dispatch(modalActions.setPromoCodePage(null));
  };

  useEffect(() => {
    return () => {
      dispatch(modalActions.setPromoCodeSlug(null));
      dispatch(modalActions.setPromoCode(null));
      dispatch(modalActions.setPromoCodePage(null));
      setCode("");
      setCodeDisabled(false);
      setInfoRequested(false);
    };
  }, [dispatch]);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const searchParams = new URLSearchParams(location.search);
    const slug = searchParams.get("slug");
    const code1 = searchParams.get("promocode");

    if (slug && code1 && user) {
      setInfoRequested(true);
      dispatch(getPromoCodePage(signal, slug));
    }

    dispatch(modalActions.setPromoCodeSlug(slug));
    dispatch(modalActions.setPromoCode(code1));

    return () => dispatch(modalActions.setPromoCodePage(null));
  }, [location.search, dispatch]);

  const addParamsToUrl = (modal, tab) => {
    const searchParams = new URLSearchParams(location.search);
    searchParams.set("modal", modal);
    if (tab) searchParams.set("tab", tab);

    navigate(`${location.pathname}?${searchParams.toString()}`, {
      replace: true,
    });
  };

  useEffect(() => {
    if (promoCode) {
      setCode(promoCode);
      setCodeDisabled(true);
    }
  }, [promoCode, location]);

  const resetPromoState = () => {
    dispatch(modalActions.setPromoCodeSlug(null));
    dispatch(modalActions.setPromoCode(null));
    dispatch(modalActions.setPromoCodePage(null));
    setCode("");
    setCodeDisabled(false);
    setInfoRequested(false);
  };

  return (
    <div className={classes.LoadTicket}>
      <div className={classes.ModalContent}>
        <header>
          <span className={classes.Center}>
            <h1>{translate("Promo Code")}</h1>
          </span>
          <span className={classes.Right}>
            <CloseButton
              timesIcon
              color="transparent"
              onClick={() => {
                resetPromoState();
                navigate(location.pathname);
              }}
            />
          </span>
        </header>

        {code && disabled && (
          <div className={classes.HeaderCodeWrapper}>
            <div className={classes.CodeWrapper}>
              <i className={classes.HeaderCode}>* {code} *</i>
              <CopyIcon onClick={copyId} />
            </div>
            {user && (
              <div className={classes.CodeFormWrapper}>
                <form
                  className={classes.LoadBetslipFormWrapper}
                  onSubmit={handleSubmit}
                >
                  <input
                    type="text"
                    placeholder={translate("Promo Code...")}
                    value={code}
                    onChange={handleInputChange}
                    disabled={disabled || loading}
                  />
                  <button type="submit" disabled={loading}>
                    {loading ? translate("Loading...") : translate("Redeem")}
                  </button>
                </form>
              </div>
            )}
          </div>
        )}

        <div className={classes.LoadTicketContent}>
          <div className={classes.LoadBetslipWrapper}>
            {user ? (
              <div className={classes.LoadBetslipContent}>
                {!disabled && <p>{translate("Insert your promo code")}:</p>}
                {!promoCode && (
                  <form
                    className={classes.LoadBetslipFormWrapper}
                    onSubmit={handleSubmit}
                  >
                    <input
                      type="text"
                      placeholder={translate("Promo Code...")}
                      value={code}
                      onChange={handleInputChange}
                      disabled={disabled || loading}
                    />
                    <button type="submit" disabled={loading}>
                      {loading ? translate("Loading...") : translate("Redeem")}
                    </button>
                  </form>
                )}

                {!infoRequested && (
                  <div className={classes.InfoWrapper}>
                    <p>
                      {translate("Get more information about the promo code")}
                    </p>{" "}
                    <i onClick={handleInfoClick} className={classes.InfoButton}>
                      {translate("here")}
                    </i>
                  </div>
                )}

                {promoCodePage && promoCodePage.Content && infoRequested ? (
                  <div
                    className={classes.PageWrapper}
                    dangerouslySetInnerHTML={{ __html: promoCodePage.Content }}
                  ></div>
                ) : (
                  <>
                    {infoRequested && (
                      <div className={classes.NoPageContent}>
                        <InfoIcon />
                        {translate("No Available Information")}
                      </div>
                    )}
                  </>
                )}
              </div>
            ) : (
              <div className={classes.LoadBetslipContent}>
                <div className={classes.LoginContent}>
                  <div className={classes.LoginIcon}>
                    <LogoutIcon />
                  </div>
                  <i>
                    {translate("Please login first to redeem your promo code")}
                  </i>
                </div>
                <div className={classes.ButtonsWrapper}>
                  <MainButton
                    color="secondary"
                    onClick={() => addParamsToUrl("auth", "login")}
                  >
                    {translate("Login")}
                  </MainButton>
                  <MainButton
                    color="primary"
                    onClick={() => {
                      addParamsToUrl("auth", "register");
                      dispatch(modalActions.setPromoCodePage(null));
                    }}
                  >
                    {translate("Register")}
                  </MainButton>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromoCodeModal;
