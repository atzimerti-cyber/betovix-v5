import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useMediaQuery } from 'react-responsive';

import classes from './Crypto.module.css';
import PricesIcon from '../../assets/svgs/prices.svg?react';
import Search3 from '../../features/Search/Search3';
import CryptoCard from './features/CryptoCard';
import { translate } from '../../utils/translations';

const Crypto = () => {
    const lang = useSelector((state) => state.app.lang); // Necessary for rerendering translations
    const crypto = useSelector((state) => state.crypto.crypto);

    const isMobile = useMediaQuery({ query: '(max-width: 768px)' });

    const [searchStr, setSearchStr] = useState('');
    const [filtered, setFiltered] = useState([]);

    useEffect(() => {
        if (!crypto) return;

        if (searchStr === '') {
            setFiltered([...crypto]);
            return;
        }

        const f = crypto.filter(
            (c) => c.id.toLowerCase().includes(searchStr.toLocaleLowerCase()) || c.label.toLowerCase().includes(searchStr.toLocaleLowerCase())
        );
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
                    <CryptoCard key={item.id} item={item} />
                ))}
            </div>
        </div>
    );
};

export default Crypto;
