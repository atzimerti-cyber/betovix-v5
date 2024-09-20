import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useMediaQuery } from 'react-responsive';

import classes from './Crypto.module.css';
import PricesIcon from '../../assets/svgs/prices.svg?react';
import Search3 from '../../features/Search/Search3';
import CryptoCard from './features/CryptoCard';
import { translate } from '../../utils/translations';

import { getCrypto } from './cryptoAsyncActions';
import { cryptoActions } from './cryptoSlice';


const Crypto = () => {
    const dispatch = useDispatch();

    const lang = useSelector((state) => state.app.lang); // Necessary for rerendering translations
    const crypto = useSelector((state) => state.crypto.cryptoSwiper);

    const isMobile = useMediaQuery({ query: '(max-width: 768px)' });

    const [searchStr, setSearchStr] = useState('');
    const [filtered, setFiltered] = useState([]);

    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;
        dispatch(getCrypto(signal));

        return () => {
            controller.abort();
            dispatch(cryptoActions.reset());
        };
    }, [dispatch]);

    useEffect(() => {
        if (!crypto) return;

        const uniqueCrypto = [];
        const names = new Set();

        crypto.forEach((c) => {
            if (!names.has(c.Name)) {
                names.add(c.Name);
                uniqueCrypto.push(c);
            }
        });

        if (searchStr === '') {
            setFiltered([...uniqueCrypto]);
            return;
        }

        const f = uniqueCrypto.filter((c) => c.Name.toLowerCase().includes(searchStr.toLocaleLowerCase()));
        setFiltered(f);
    }, [searchStr, crypto]);

    return (
        <div className={classes.Crypto}>
            {isMobile && (
                <div className={classes.SearchSection}>
                    <Search3 placeholder={translate('Search Crypto')} searchStr={searchStr} onChange={(value) => setSearchStr(value)} />
                </div>
            )}
            <div className={classes.Title}>
                <PricesIcon />
                <h1>{translate('Crypto Prices')}</h1>
            </div>

            <div className={classes.CardsContainer}>
                {filtered.map((item) => (
                    <CryptoCard key={item.Id} item={item} />
                ))}
            </div>
        </div>
    );
};

export default Crypto;
