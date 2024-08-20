import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import classes from './LoadBooked.module.css';
import { translate } from '../../../utils/translations';
import { loadBooked } from '../../Betslip/betslipAsyncActions'; 

const LoadBooked = () => {
    const dispatch = useDispatch();

    const [code, setCode] = useState('');

  const handleInputChange = (e) => {
    setCode(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const controller = new AbortController();
    const signal = controller.signal;

    dispatch(loadBooked(signal, code, () => {
        // handleTabClick('Active', 2);
    }));

  };

  return (
    <div className={classes.LoadBetslipWrapper}>
      <div className={classes.LoadBetslipTitle}>
        <h3>{translate('Load Booked Bet')}</h3>
      </div>
      <div className={classes.LoadBetslipContent}>
        <p>
          {translate('Insert the code to load or')}{' '}
          <a href="#">{translate('check it')}</a> {translate('here')}
        </p>
        <form className={classes.LoadBetslipFormWrapper} onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder={translate('Insert the code here')} 
            value={code}
            onChange={handleInputChange}
          />
          <button type="submit">{translate('Load')}</button>
        </form>
      </div>
    </div>
  );
};

export default LoadBooked;
