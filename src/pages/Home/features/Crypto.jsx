import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { SwiperSlide } from 'swiper/react';
import { Link } from 'react-router-dom';

import MainSwiper from '../../../features/UI/MainSwiper/MainSwiper';
import PricesIcon from '../../../assets/svgs/prices.svg?react';
import classes from './Crypto.module.css';
import SkeletonCrypto from '../../../features/UI/Skeletons/SkeletonCrypto';
import CryptoCard from './CryptoCard';
import { cryptoActions } from '../../Crypto/cryptoSlice';
import { translate } from '../../../utils/translations';

const Crypto = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();

    const lang = useSelector((state) => state.app.lang); // Necessary for rerendering translations
    const cryptoPrices = useSelector((state) => state.crypto.cryptoPrices);
    const crypto = useSelector((state) => state.crypto.crypto);
    const user = useSelector((state) => state.login.user);

    const navigateToModal = (modal, tab, method) => {
        const searchParams = new URLSearchParams(location.search);
        searchParams.set('modal', modal);
        searchParams.set('tab', tab);

        if (method) searchParams.set('method', method);

        navigate(`${location.pathname}?${searchParams.toString()}`, { replace: true });
    };

    const onClick = (item) => {
        if (user) {
            dispatch(cryptoActions.setSelectedCurrency(item));
            navigateToModal('cashier', 'deposit', 'crypto');
        } else navigateToModal('auth', 'login');
    };

    return (
        <MainSwiper
            slidesPerView='auto'
            icon={<PricesIcon />}
            title={<Link to='/crypto'>{translate('Crypto Prices')}</Link>}
            viewAll='/crypto'
            spaceBetween={33}
        >
            {crypto
                ? crypto.map((item) => {
                      return (
                          <SwiperSlide key={item.Id} style={{ width: 'auto' }}>
                              <div className={classes.SlideContainer} onClick={() => onClick(item)}>
                                  <div className={classes.Slide}>
                                      <div className={classes.SlideContent}>
                                          <CryptoCard item={item} />
                                      </div>
                                  </div>
                              </div>
                          </SwiperSlide>
                      );
                  })
                : Array.from({ length: 8 }, (_, index) => (
                      <SwiperSlide key={`skeleton-${index}`} style={{ width: 'auto' }}>
                      {/* <SwiperSlide key={index} style={{ width: 'auto' }}> */}
                          <div className={classes.SlideContainer}>
                              <div className={classes.Slide}>
                                  <div className={classes.SlideContent}>
                                      <SkeletonCrypto />
                                  </div>
                              </div>
                          </div>
                      </SwiperSlide>
                  ))}
        </MainSwiper>
    );
};

export default Crypto;
