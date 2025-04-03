import classes from "./PromoCodeModal.module.css";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import { redeemPromoCode } from "../../../pages/Promotions/promotionsAsyncActions";
import CloseButton from "../../UI/Buttons/CloseButton";
import { translate } from "../../../utils/translations";
import { toast } from "react-toastify";

const PromoCodeModal = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    setCode(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!code.trim()) {
      toast.error(translate("Please enter a promo code"));
      return;
    }

    // setLoading(true);

    const controller = new AbortController(); 
    const signal = controller.signal;

    dispatch(
      redeemPromoCode(signal, code, () => {
          setLoading(false);
          navigate(location.pathname);
      })
    );
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
              onClick={() => navigate(location.pathname)}
            />
          </span>
        </header>

        <div className={classes.LoadTicketContent}>
          <div className={classes.LoadBetslipWrapper}>
            <div className={classes.LoadBetslipContent}>
              <p>{translate("Insert your promo code here")}:</p>
              <form className={classes.LoadBetslipFormWrapper} onSubmit={handleSubmit}>
                <input
                  type="text"
                  placeholder={translate("Promo Code...")}
                  value={code}
                  onChange={handleInputChange}
                  disabled={loading}
                />
                <button type="submit" disabled={loading}>
                  {loading ? translate("Loading...") : translate("Redeem")}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromoCodeModal;
