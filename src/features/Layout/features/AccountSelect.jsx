import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import classes from './AccountSelect.module.css';
import { translate } from '../../../utils/translations';
import { loginActions } from '../../../pages/Login/loginSlice';
import { fetchChildDetails } from '../../InitApp/initAppAsyncActions';

const AccountSelect = () => {
    const dispatch = useDispatch();
    const accounts = useSelector((state) => state.login.accountChildren);
    const selectedAccount = useSelector((state) => state.login.selectedAccount);

    const handleChange = (event) => {
        const accountId = event.target.value;
        const selected = accounts.find((account) => String(account.AccountId) === String(accountId));

        if (selected) {
            dispatch(loginActions.setSelectedAccount(selected));
            dispatch(fetchChildDetails(selected.AccountId)); 
        }
    };

    return (
        <div className={classes.accountSelectContainer}>
            <select
                id="accountSelect"
                value={selectedAccount?.AccountId || ''}
                onChange={handleChange}
                className={classes.accountSelect}
            >
                <option value="" disabled>--{translate('Select Account')}--</option> {/* Placeholder option */}
                {accounts.map((account) => (
                    <option 
                        key={account.AccountId} 
                        value={account.AccountId}
                    >
                        {account.RoleId < 40 ? '▼' : ''} {account.Username} / {account.AccountId}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default AccountSelect;
