import { Link } from 'react-router-dom';
import { SwiperSlide } from 'swiper/react';

import classes from './HomeBanners.module.css';
import BigSwiper from '../../../features/UI/MainSwiper/BigSwiper';

const HomeBanners = (props) => {
    return (
        <BigSwiper slidesPerView={1} autoplay delay={6000}>
        {/* <BigSwiper slidesPerView={1} autoplay delay={6000}> */}
            <SwiperSlide>
                <Link to='/' className={classes.ImageContainer}>
                    <div className={classes.BannerBackground}>
                        <img
                            src={
                                props.isMobile
                                    ? 'https://images.ctfassets.net/im9yudtc78wp/mvo9zotUef1VXyhVkWE3f/8adfa2042b356bc2c12e4c7d2f7dcd4d/conor-mcgregor-mobile.avif?fm=avif'
                                    : 'https://images.ctfassets.net/im9yudtc78wp/3mpO02rx5PtZI6smAI4wSx/64b0d303a78b2cd022bd8d1713904c13/conor-mcgregor-desktop.avif?fm=avif&w=1200&h=300'
                            }
                            alt='Sponsor Banner'
                        />
                    </div>
                    <div className={classes.Blurred}></div>
                </Link>
            </SwiperSlide>
            <SwiperSlide>
                <Link to='/' className={classes.ImageContainer}>
                    <div className={classes.BannerBackground}>
                        <img
                            src={
                                props.isMobile
                                    ? 'https://images.ctfassets.net/im9yudtc78wp/rjwnRLAfRT4c0JY8WEbq9/86e4e7767be6111d21ffec4dbd5232b2/Suarez_Background_mobile.png?fm=avif'
                                    : 'https://images.ctfassets.net/im9yudtc78wp/6VaqzGXTYAyqY2JHZfBReb/f6f30b83d06a8de931f6acf240bebdbc/suarez.avif?fm=avif&w=1200&h=300'
                            }
                            alt='Sponsor Banner'
                        />
                    </div>
                    {/* <img
                        className={classes.SponsorLogo}
                        src='https://images.ctfassets.net/im9yudtc78wp/49jA5ife4ZM8srMQG3FfQ5/8dcca1024a25e9b5bd4dfaf288f5cddc/Suarez_Logo.webp?fm=avif'
                        alt='Sponsor Logo'
                    /> */}
                    <div className={classes.Blurred}></div>
                </Link>
            </SwiperSlide>
            <SwiperSlide>
                <Link to='/' className={classes.ImageContainer}>
                    <div className={classes.BannerBackground}>
                        <img
                            src={
                                props.isMobile
                                    ? 'https://images.ctfassets.net/im9yudtc78wp/2Nv7E7Aq3TIbnW7JdeGWRA/f6cc554f7120d7474cbd9ac29692a700/argentina-mobile.avif?fm=avif'
                                    : 'https://images.ctfassets.net/im9yudtc78wp/4Krmpz5NUKhLqyQpcwkI5x/f0e794045c68c3b459068242ddbf2cd2/argentina-desktop.avif?fm=avif&w=1200&h=300'
                            }
                            alt='Sponsor Banner'
                        />
                    </div>
                    {/* <img
                        className={classes.SponsorLogo}
                        src='https://images.ctfassets.net/im9yudtc78wp/6iapNWDaATtvOXM3w1VCNh/65bab86015cd1d0151614007bc4545f3/AFA_Logo.webp?fm=avif'
                        alt='Sponsor Logo'
                    /> */}
                    <div className={classes.Blurred}></div>
                </Link>
            </SwiperSlide>
            <SwiperSlide>
                <Link to='/' className={classes.ImageContainer}>
                    <div className={classes.BannerBackground}>
                        <img
                            src={
                                props.isMobile
                                    ? 'https://images.ctfassets.net/im9yudtc78wp/6Ow1J0xVqpyZB4OpdiyGP5/33dcd385d690c647f3b97e3f7eacca45/aston-mobile.avif?fm=avif'
                                    : 'https://images.ctfassets.net/im9yudtc78wp/5YtpRj1RCPwT61mYMal7op/16d62a9b68a7d9b3a9b5f2d70a94231c/av.avif?fm=avif&w=1200&h=300'
                            }
                            alt='Sponsor Banner'
                        />
                    </div>
                    {/* <img
                        className={classes.SponsorLogo}
                        src='https://images.ctfassets.net/im9yudtc78wp/1HdMHOVjgOtF1pmQEUadNR/f52ad5c354e7b0613f038fab5119d0d7/AVFC_Logo.webp?fm=avif'
                        alt='Sponsor Logo'
                    /> */}
                    <div className={classes.Blurred}></div>
                </Link>
            </SwiperSlide>
        </BigSwiper>
    );
};

export default HomeBanners;
