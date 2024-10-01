import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { SwiperSlide } from 'swiper/react';
import { useMediaQuery } from 'react-responsive';
import { toast } from 'react-toastify';

import MainSwiper from './MainSwiper';
import HeartIcon from '../../../assets/svgs/heart.svg?react';
import GiftIcon from '../../../assets/svgs/gift.svg?react';
import classes from './SwiperWithOverlay.module.css';
import LoaderPlaceholder from '../../UI/Skeletons/LoaderPlaceholder';
import { addFavoriteCasino, getCasinoByTags, removeFavoriteCasino } from '../../../pages/Casino/casinoAsyncActions';
import { addCasinoFav, removeCasinoFav } from '../../../features/CasinoFavorites/CasinoFavoritesAsync';
import { translate } from '../../../utils/translations';
import useSlidesResponsive from '../../../hooks/useSlidesResponsive';
import _ from 'lodash';

const SwiperWithOverlay = (props) => {
    const dispatch = useDispatch();
    const [loadedImages, setLoadedImages] = useState([]);
    const user = useSelector((state) => state.login.user);
    const bonusBalance = useSelector((state) => state.layout.bonusBalance);
    const casinoByTags = useSelector((state) => state.casino.casinoByTags);

    const [items, setItems] = useState(props.items); // Add state for items
    const { slidesPerView, slidesPerGroup, isMobile, isTablet, isDesktop, isBigDesktop } = useSlidesResponsive("casino");

    const updateLoadedImages = (index) => {
        setLoadedImages((prevData) => [...prevData, index]);
    };


    useEffect(() => {
        if (!props.items) return
        setItems(props.items); // Update local state when props.items changes
    }, [props.items]);


    useEffect(() => {
        if (!props.tag) return;
        const controller = new AbortController();
        const signal = controller.signal;

        dispatch(getCasinoByTags(signal, props.tag))


        return () => {
            controller.abort();
        };
    }, [props.tag]);


    useEffect(() => {
        if (!props.tag) return;
        if (casinoByTags[props.tag]) {
            setItems(casinoByTags[props.tag]); // Update local state when props.items changes
        }

    }, [casinoByTags]);

    const onToggleFavorite = (item) => {

        if (item.isFav) {
            dispatch(removeCasinoFav(item.Data.Id)).then(() => {
                let newItems = _.cloneDeep(items);
                for (let i = 0; i < newItems.length; i++) {
                    if (newItems[i].Data.Id === item.Data.Id) {
                        newItems[i].isFav = false;
                        break;
                    }
                }
                setItems(newItems);
            })
        } else {
            dispatch(addCasinoFav(item.Data.Id)).then(() => {
                let newItems = _.cloneDeep(items);
                for (let i = 0; i < newItems.length; i++) {
                    if (newItems[i].Data.Id === item.Data.Id) {
                        newItems[i].isFav = true;
                        break;
                    }
                }
                setItems(newItems);
            })
        }
    };

    return (
        items && items.length > 0 &&
        <MainSwiper
            slidesPerView={props.slidesPerView ? props.slidesPerView : slidesPerView}
            slidesPerGroup={slidesPerGroup}
            title={props.link ? <Link to={props.link}>{props.title}</Link> : props.task ? <a onClick={props.task}>{props.title}</a> : props.title}
            viewAll={props.link}
            viewText={props.text}
            onTask={props.task}
            icon={props.icon}
            thIcon={props.thIcon}
            spaceBetween={7}
        >
            {items ? (
                items.length === 0 ? (

                    <p className={classes.NoResults}>No {props.title}</p>
                ) : (
                    items.map((item, index) => {
                        if (props.max && index > props.max + 1) return null;
                        const gameType = item.Data.Tags.toLowerCase().includes('live') ? 'live' : 'slots';

                        return (
                            <SwiperSlide key={item.Data.Id} style={{ maxWidth: '190px' }}>
                                <div className={classes.SlideContainer} style={bonusBalance > 0 ? { minHeight: '213px' } : { minHeight: '178px' }}>
                                    <>
                                        <Link to={`/casino/game/${gameType}/${item.Data.ProviderName}/${item.Data.Id}/${item.Data.BrandGameId}/${item.Data.Name}?isBonus=false`} >
                                            {/* <Link to={`/casino/game/${gameType}/${item.Data.Id}/${item.Data.BrandGameId}/${item.Data.Name}`}> */}
                                            <article className={classes.Card}>
                                                <div className={classes.ImageContainer}>
                                                    {/* {loadedImages.includes(index) === false && <LoaderPlaceholder />} */}
                                                    <div
                                                        style={{ backgroundImage: `url(${item.Data.ImageUrl})`, backgroundSize: 'cover', backgroundPosition: 'center', height: '100%' }}
                                                        onLoad={() => updateLoadedImages(index)}
                                                    >
                                                    </div>
                                                </div>
                                                {item.isNew && <div className={classes.NewLabel}>NEW</div>}
                                                {/* <div className={classes.InfoOverlay}>
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
                                                </div> */}
                                            </article>
                                        </Link>
                                        {bonusBalance > 0 && (
                                            <Link
                                                to={`/casino/game/${gameType}/${item.Data.ProviderName}/${item.Data.Id}/${item.Data.BrandGameId}/${item.Data.Name}?isBonus=true`}
                                            >
                                                <div className={classes.isBonus}>
                                                    <button className={classes.bonusContainer}>
                                                        <GiftIcon />
                                                        {translate('Play With Bonus')}
                                                    </button>
                                                </div>
                                            </Link>
                                        )}
                                    </>

                                    <div className={classes.BackgroundContainer}>
                                        <div>
                                            <p className={classes.BgGameName}>{item.Data.Name}</p>
                                            <p className={classes.BgVendor}>{item.Data.BrandName}</p>
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
                            </SwiperSlide>
                        );
                    })
                )
            ) : (
                Array.from({ length: 15 }, (_, index) => (
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
