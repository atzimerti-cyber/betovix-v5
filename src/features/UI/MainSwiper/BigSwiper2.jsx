import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useMediaQuery } from 'react-responsive';
import { Autoplay, Pagination } from 'swiper/modules';
import axiosApi from '../../../axios-api';
import { toast } from 'react-toastify';

import classes from './BigSwiper2.module.css';
import LoaderPlaceholder from '../../UI/Skeletons/LoaderPlaceholder';
import { getLang } from '../../../utils/storage';

const BigSwiper2 = (props) => {
    const navigate = useNavigate();
    const [loadedImages, setLoadedImages] = useState([]);

    const isMobile = useMediaQuery({ query: '(max-width: 575px)' });

    let slidesPerView = 2;
    let slidesPerGroup = 2;

    if (isMobile) {
        slidesPerView = 1;
        slidesPerGroup = 1;
    }

    const updateLoadedImages = (index) => {
        setLoadedImages((prevData) => [...prevData, index]);
    };

    let modules = [Pagination];
    if (props.autoplay) modules.push(Autoplay);

    const getGameId = async (gameType, gameId, gameName) => {
        try {
            const lang = getLang();
            const controller = new AbortController();
            const signal = controller.signal;

            const response = await axiosApi.get(`MyCasino/GetGame?id=${gameId}&lang=${lang.label}&siteid=${import.meta.env.VITE_SITE_ID}`, {
                signal: signal,
                baseURLOverride: import.meta.env.VITE_CASINO_BASE,
            });
            if (response.data.Status.StatusCode !== 200) throw Error();

            const brandGameId = response.data?.Contents?.BrandGameId;
            if (!brandGameId) throw Error();

            navigate(`/casino/game/${gameType}/${gameId}/${brandGameId}/${gameName}`);
        } catch (error) {
            if (!error?.code === 'ERR_CANCELED') toast.error(error?.message);
        }
    };

    return (
        <div className={classes.MainSwiperWrapper}>
            <Swiper
                slidesPerView={slidesPerView}
                slidesPerGroup={slidesPerGroup}
                spaceBetween={16}
                autoplay={
                    props.autoplay
                        ? {
                              delay: 6000,
                              disableOnInteraction: false,
                          }
                        : null
                }
                pagination={{
                    clickable: true,
                }}
                modules={modules}
                className={classes.BigSwiper2}
            >
                {props.items
                    ? props.items.map((item, index) => {
                          if (props.max && index > props.max + 1) return null;
                          const gameType = item.Title.includes('live') ? 'live' : 'slots';

                          return (
                              <SwiperSlide key={index}>
                                  <div className={classes.SlideContainer}>
                                      <div onClick={() => getGameId(gameType, item.GameId, item.GameName)}>
                                          <article className={classes.Card}>
                                              <div className={classes.ImageContainer}>
                                                  {loadedImages.includes(index) === false && <LoaderPlaceholder />}
                                                  <img src={item.Img} loading='lazy' onLoad={() => updateLoadedImages(index)} />
                                              </div>
                                          </article>
                                      </div>
                                  </div>
                              </SwiperSlide>
                          );
                      })
                    : Array.from({ length: slidesPerView }, (_, index) => (
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
                      ))}
            </Swiper>
        </div>
    );
};

export default BigSwiper2;
