import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import classes from './AccountSelect.module.css';
import { translate } from '../../../utils/translations';
import { loginActions } from '../../../pages/Login/loginSlice';
import { fetchChildDetails } from '../../InitApp/initAppAsyncActions';
import ParentIcon from '../../../assets/svgs/parent.svg?react';
import ParentCloseIcon from '../../../assets/svgs/parent-close.svg?react';

const AccountSelect = () => {
    const dispatch = useDispatch();
    const accounts = useSelector((state) => state.login.accountChildren);
    const selectedAccount = useSelector((state) => state.login.selectedAccount);

    const [expandedAccounts, setExpandedAccounts] = useState(new Set());

    const [dropdownVisible, setDropdownVisible] = useState(false);

    const handleExpand = (accountId) => {
        setExpandedAccounts((prev) => {
            const newExpandedAccounts = new Set(prev);
            if (newExpandedAccounts.has(accountId)) {
                newExpandedAccounts.delete(accountId);
            } else {
                newExpandedAccounts.add(accountId);
            }
            return newExpandedAccounts;
        });

        const account = findAccountById(accounts, accountId);
        if (account && !account.children) {
            dispatch(fetchChildDetails(accountId));
        }
    };

    const handleSelect = (accountId) => {
        const selected = findAccountById(accounts, accountId);

        if (selectedAccount && selectedAccount.AccountId === selected.AccountId) {
            dispatch(loginActions.setSelectedAccount(null));
        } else if (selected) {
            dispatch(loginActions.setSelectedAccount(selected));
        }

        setDropdownVisible(false);

    };

    const handleDropdownToggle = () => {
        setDropdownVisible((prev) => !prev);
    };

    const findAccountById = (accounts, accountId) => {
        for (const account of accounts) {
            if (account.AccountId === accountId) {
                return account;
            }
            if (account.children) {
                const result = findAccountById(account.children, accountId);
                if (result) return result;
            }
        }
        return null;
    };

    const renderAccounts = (accounts, level = 0) => {
        return accounts.map((account) => (
            <div key={account.AccountId} style={{ marginLeft: ( level + 1 ) * 10 }}>
                {account.RoleId < 40 && (
                    <button onClick={() => handleExpand(account.AccountId)}>
                        {expandedAccounts.has(account.AccountId) ? <ParentCloseIcon/> :<ParentIcon/> }
                    </button>
                )}
                <span onClick={() => handleSelect(account.AccountId)}>
                    {account.Username} <code>{account.AccountId}</code>
                </span>
                {expandedAccounts.has(account.AccountId) && account.children && renderAccounts(account.children, level + 1)}
            </div>
        ));
    };

    return (
        <div className={classes.accountSelectContainer}>
            <p>{translate('Select player account')}</p>
            <div>
                <input
                    type="text"
                    value={selectedAccount ? `${selectedAccount.Username} / ${selectedAccount.AccountId}` : ''}
                    onClick={handleDropdownToggle}
                    readOnly
                    placeholder="Player"
                />
                <div className={classes.dropIcon} onClick={handleDropdownToggle}> <ParentIcon/></div>
               
                {dropdownVisible && (
                    <div className={classes.dropdownMenu}>
                        {renderAccounts(accounts)}
                    </div>
                )}
            </div>
        </div>
    );
};

export default AccountSelect;
