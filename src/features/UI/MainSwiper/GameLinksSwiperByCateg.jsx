import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { SwiperSlide } from "swiper/react";

import MainSwiper from "./MainSwiper";
import classes from "./GameLinksSwiper.module.css";

const GameLinksSwiperByCateg = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const lang = useSelector((state) => state.app.lang);
  const user = useSelector((state) => state.login.user);

  const [items, setItems] = useState(props.items); // Add state for items

  useEffect(() => {
    if (!props.items) return;
    setItems(props.items);
  }, [props.items]);

  return (
    items &&
    items.length > 0 && (
      <div className={classes.GameLinks} id={props.tag}>
        <MainSwiper
          slidesPerView="auto"
          slidesPerGroup={1}
          spaceBetween={13}
          noHeader
        >
          {items.map((link, index) => (
            <SwiperSlide
              key={index}
              className={classes.Slide}
              onClick={() => {
                link.Target === "_self" || link.Target === ""
                  ? navigate(link.Link)
                  : window.open(
                      link.Link.replace("{domain}", currentDomain),
                      `${link.Target}`
                    );
              }}
            >
              <img src={link.Image} />
            </SwiperSlide>
          ))}
        </MainSwiper>
      </div>
    )
  );
};

export default GameLinksSwiperByCateg;
