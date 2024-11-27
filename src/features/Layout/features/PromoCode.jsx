import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';

import classes from './LoadBooked.module.css';
import { toast } from 'react-toastify';
import { translate } from '../../../utils/translations';
import { loadBooked } from '../../Betslip/betslipAsyncActions'; 

const PromoCode = ({ isModal = false }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const [code, setCode] = useState('');

  const handleInputChange = (e) => {
    setCode(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const controller = new AbortController();
    const signal = controller.signal;

    dispatch(loadBooked(signal, code, () => {
      if (isModal) {
        navigate(location.pathname); 
    }
    }));

  };

  return (
    <div className={classes.LoadBetslipWrapper}>
      <div className={classes.LoadBetslipContent}>
        <p>
          {translate('Insert promo code')}
        </p>
        <form className={classes.LoadBetslipFormWrapper} onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder={translate('Promo Code')} 
            value={code}
            onChange={handleInputChange}
          />
          <button type="submit">{translate('Load')}</button>
        </form>
      </div>
    </div>
  );
};

export default PromoCode;
