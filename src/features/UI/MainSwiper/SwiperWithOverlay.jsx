import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { SwiperSlide } from 'swiper/react';
import { useMediaQuery } from 'react-responsive';
import { toast } from 'react-toastify';

import MainSwiper from './MainSwiper';
import HeartIcon from '../../../assets/svgs/heart.svg?react';
import classes from './SwiperWithOverlay.module.css';
import LoaderPlaceholder from '../../UI/Skeletons/LoaderPlaceholder';
import { addFavoriteCasino, removeFavoriteCasino } from '../../../pages/Casino/casinoAsyncActions';
import { translate } from '../../../utils/translations';

const SwiperWithOverlay = (props) => {
    const dispatch = useDispatch();
    const [loadedImages, setLoadedImages] = useState([]);

    const isMobile = useMediaQuery({ query: '(max-width: 575px)' });
    const isTablet = useMediaQuery({ query: '(max-width: 768px)' });
    const isDesktop = useMediaQuery({ query: '(max-width: 992px)' });
    const isBigDesktop = useMediaQuery({ query: '(max-width: 1200px)' });
    const user = useSelector((state) => state.login.user);
    const bonusBalance = useSelector((state) => state.layout.bonusBalance);

    let slidesPerView = 5;
    let slidesPerGroup = 5;

    if (isMobile) {
        slidesPerView = 2;
        slidesPerGroup = 2;
    } else if (isTablet) {
        slidesPerView = 3;
        slidesPerGroup = 3;
    } else if (isDesktop) {
        slidesPerView = 3.5;
        slidesPerGroup = 3;
    } else if (isBigDesktop) {
        slidesPerView = 4;
        slidesPerGroup = 4;
    }

    const updateLoadedImages = (index) => {
        setLoadedImages((prevData) => [...prevData, index]);
    };

    const onToggleFavorite = (item) => {
        if (item.isFav) dispatch(removeFavoriteCasino(item.Data.Id));
        else dispatch(addFavoriteCasino(item.Data.Id));
    };

    return (
        <MainSwiper
            slidesPerView={slidesPerView}
            slidesPerGroup={slidesPerGroup}
            icon={props.icon}
            title={props.link ? <Link to={props.link}>{props.title}</Link> : props.task ? <a onClick={props.task}>{props.title}</a> : props.title}
            viewAll={props.link}
            viewText={props.text}
            onTask={props.task}
        >
            {props.items ? (
                props.items.length === 0 ? (
                    <p className={classes.NoResults}>No {props.title}</p>
                ) : (
                    props.items.map((item, index) => {
                        if (props.max && index > props.max + 1) return null;
                        const gameType = item.Data.Tags.toLowerCase().includes('live') ? 'live' : 'slots';

                        return (
                            <SwiperSlide key={item.Data.Id}>
                                <div className={classes.SlideContainer}>
                                    <Link to={`/casino/game/${gameType}/${item.Data.ProviderName}/${item.Data.Id}/${item.Data.BrandGameId}/${item.Data.Name}?isBonus=false`}>
                                    {/* <Link to={`/casino/game/${gameType}/${item.Data.Id}/${item.Data.BrandGameId}/${item.Data.Name}`}> */}
                                        <article className={classes.Card}>
                                            <div className={classes.ImageContainer}>
                                                {loadedImages.includes(index) === false && <LoaderPlaceholder />}
                                                <img src={item.Data.ImageUrl} loading='lazy' onLoad={() => updateLoadedImages(index)} />
                                            </div>
                                            {item.isNew && <div className={classes.NewLabel}>NEW</div>}
                                            <div className={classes.InfoOverlay}>
                                                <div className={classes.InfoContent}>
                                                    <div>
                                                        <p className={classes.InfoCategory}>{item.Data.BrandName}</p>
                                                        <p className={classes.RtpLabel}>{item.Data.Name}</p>
                                                    </div>
                                                    <HeartIcon
                                                        className={item.isFav ? classes.FavoriteIcon : null}
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            e.preventDefault();
                                                            if (user) {
                                                                onToggleFavorite(item);
                                                            } else {
                                                                toast.warning('Login to access this feature');
                                                            }
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                        </article>
                                       
                                    </Link>
                                    {bonusBalance > 0 && (
                                        <Link to={`/casino/game/${gameType}/${item.Data.ProviderName}/${item.Data.Id}/${item.Data.BrandGameId}/${item.Data.Name}?isBonus=true`}>
                                            <div className={classes.isBonus}>
                                                <button className={classes.bonusContainer}>
                                                    {translate('Play With Bonus')}
                                                </button>
                                            </div>
                                        </Link>
                                    )}
                                </div>
                            </SwiperSlide>
                        );
                    })
                )
            ) : (
                Array.from({ length: slidesPerView }, (_, index) => (
                    <SwiperSlide key={index}>
                        <div className={[classes.SlideContainer, classes.Loading].join(' ')}>
                            <Link to={null}>
                                <article className={classes.Card}>
                                    <div className={classes.ImageContainer}>
                                        <LoaderPlaceholder />
                                    </div>
                                </article>
                            </Link>
                        </div>
                    </SwiperSlide>
                ))
            )}
        </MainSwiper>
    );
};

export default SwiperWithOverlay;
