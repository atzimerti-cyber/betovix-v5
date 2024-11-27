import classes from "./LoadTicketModal.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { getTicket } from "../modalAsyncActions";
import CloseButton from "../../UI/Buttons/CloseButton";
import { translate } from "../../../utils/translations";

const PromoCodeModal = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  // const ticket = useSelector((state) => state.modal.ticketToPrint);

  // const [id, setId] = useState('');

  // const addParamsToUrl = (modal, tab) => {
  //     const searchParams = new URLSearchParams(location.search);
  //     searchParams.set('modal', modal);
  //     if (tab) searchParams.set('tab', tab);

  //     navigate(`${location.pathname}?${searchParams.toString()}`, { replace: true });
  // };

  // useEffect(() => {
  //     if (ticket && ticket !== null) {
  //         addParamsToUrl('ticket-receipt')
  //     }
  // }, [ticket]);

    const handleInputChange = (e) => {
    //   setId(e.target.value);
    };

  const handleSubmit = (e) => {
    // e.preventDefault();
    // const controller = new AbortController();
    // const signal = controller.signal;
    // dispatch(getTicket(signal, id));
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
              <form
                className={classes.LoadBetslipFormWrapper}
                onSubmit={handleSubmit}
              >
                <input
                  type="text"
                  placeholder={translate("Promo Code...")}
                  // value={id}
                  onChange={handleInputChange}
                />
                <button type="submit">{translate("Load")}</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromoCodeModal;
