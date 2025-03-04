import { useMediaQuery } from "react-responsive";
import { useSelector } from "react-redux";

const useSlidesResponsive = (categ) => {
  const isRightContainerOpen = useSelector(
    (state) => state.layout.showRightContainer
  );
  const isLeftContainerOpen = useSelector(
    (state) => state.layout.fullLeftContainer
  );

  // const isSmallMobile = useMediaQuery({ query: "(max-width: 400px)" });
  // const isMobile = useMediaQuery({ query: "(max-width: 575px)" });
  // const isTablet = useMediaQuery({ query: "(max-width: 768px)" });
  // const isDesktop = useMediaQuery({ query: "(max-width: 992px)" });
  // const isBigDesktop = useMediaQuery({ query: "(max-width: 1240px)" });
  // const isVeryBigDesktop = useMediaQuery({ query: "(max-width: 1500px)" });

  const isSmallMobile = useMediaQuery({ query: "(max-width: 400px)" });
  const isMobile = useMediaQuery({
    query: "(min-width: 401px) and (max-width: 575px)",
  });
  const isTablet = useMediaQuery({
    query: "(min-width: 576px) and (max-width: 768px)",
  });
  const isDesktop = useMediaQuery({
    query: "(min-width: 769px) and (max-width: 992px)",
  });
  const isBigDesktop = useMediaQuery({
    query: "(min-width: 993px) and (max-width: 1240px)",
  });
  const isVeryBigDesktop = useMediaQuery({
    query: "(min-width: 1241px) and (max-width: 1600px) ",
  });

  let slidesPerView = 6;
  let slidesPerGroup = 4;

  if (!categ || categ == "casino") {
    if (isSmallMobile) {
      slidesPerView = 2;
      slidesPerGroup = 2;
    } else if (isMobile) {
      slidesPerView = 3;
      slidesPerGroup = 2;
    } else if (isTablet) {
      slidesPerView = 4.3;
      slidesPerGroup = 3;
    } else if (isDesktop) {
      if (isRightContainerOpen && isLeftContainerOpen) {
        slidesPerView = 4;
        slidesPerGroup = 2;
      } else if (isRightContainerOpen || isLeftContainerOpen) {
        slidesPerView = 4;
        slidesPerGroup = 3;
      } else {
        slidesPerView = 4.7;
        slidesPerGroup = 3;
      }
    } else if (isBigDesktop) {
      if (isRightContainerOpen && isLeftContainerOpen) {
        slidesPerView = 5;
        slidesPerGroup = 3;
      } else if (isRightContainerOpen || isLeftContainerOpen) {
        slidesPerView = 5;
        slidesPerGroup = 3;
      } else {
        slidesPerView = 6;
        slidesPerGroup = 4;
      }
    } else if (isVeryBigDesktop) {
      if (isRightContainerOpen && isLeftContainerOpen) {
        slidesPerView = 5;
        slidesPerGroup = 3;
      } else if (isRightContainerOpen || isLeftContainerOpen) {
        slidesPerView = 7;
        slidesPerGroup = 4;
      } else {
        slidesPerView = 7;
        slidesPerGroup = 5;
      }
    } else {
      if (isRightContainerOpen && isLeftContainerOpen) {
        slidesPerView = 7;
        slidesPerGroup = 4;
      } else if (isRightContainerOpen || isLeftContainerOpen) {
        slidesPerView = 9;
        slidesPerGroup = 5;
      } else {
        slidesPerView = 9;
        slidesPerGroup = 5;
      }
    }
  } else if (categ == "match") {
    // console.log( `categ:${categ} isSmallMobile:${isSmallMobile} isMobile:${isMobile} isTablet:${isTablet} isDesktop:${isDesktop} isBigDesktop:${isBigDesktop} isVeryBigDesktop:${isVeryBigDesktop} isLeftContainerOpen:${isLeftContainerOpen} isRightContainerOpen:${isRightContainerOpen}`)

    if (isMobile || isSmallMobile) {
      slidesPerView = 1;
      slidesPerGroup = 1;
    } else if (isTablet) {
      slidesPerView = 1;
      slidesPerGroup = 1;
    } else if (isDesktop) {
      slidesPerView = 1.5;
      slidesPerGroup = 1;
    } else if (isBigDesktop) {
      slidesPerView = 3;
      slidesPerGroup = 2;
    } else {
      slidesPerView = 3;
      slidesPerGroup = 2;
    }
  } else if (categ == "crypto-line") {
    if (isMobile || isSmallMobile) {
      slidesPerView = 2.5;
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
    } else {
      slidesPerView = 6.5;
      slidesPerGroup = 4;
    }
  } else if (categ == "levels") {
    if (isMobile || isSmallMobile) {
      slidesPerView = 2;
      slidesPerGroup = 2;
    } else if (isTablet) {
      slidesPerView = 3;
      slidesPerGroup = 3;
    } else if (isDesktop) {
      slidesPerView = 3;
      slidesPerGroup = 3;
    } else if (isBigDesktop) {
      slidesPerView = 4;
      slidesPerGroup = 4;
    } else {
      slidesPerView = 4.5;
      slidesPerGroup = 4;
    }
  } else if (categ == "milestones") {
    if (isMobile || isSmallMobile) {
      slidesPerView = 2.5;
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
    } else {
      slidesPerView = 6.5;
      slidesPerGroup = 4;
    }
  } else if (categ == "casinoBanners") {
    if (isMobile || isSmallMobile) {
      slidesPerView = 1;
      slidesPerGroup = 1;
    } else if (isTablet) {
      slidesPerView = 1.5;
      slidesPerGroup = 1;
    } else if (isDesktop) {
      slidesPerView = 2.1;
      slidesPerGroup = 2;
    } else if (isBigDesktop) {
      slidesPerView = 2.5;
      slidesPerGroup = 2;
    } else {
      slidesPerView = 3;
      slidesPerGroup = 2;
    }
  } else if (categ == "sportsBanners") {
    if (isSmallMobile) {
      slidesPerView = 1;
      slidesPerGroup = 1;
    } else if (isMobile) {
      slidesPerView = 1.3;
      slidesPerGroup = 1;
    } else if (isTablet) {
      slidesPerView = 1.6;
      slidesPerGroup = 1;
    } else if (isDesktop) {
      if (isRightContainerOpen && isLeftContainerOpen) {
        slidesPerView = 2;
        slidesPerGroup = 1;
      } else if (isRightContainerOpen || isLeftContainerOpen) {
        if (isRightContainerOpen) {
          slidesPerView = 2;
          slidesPerGroup = 1;
        } else {
          slidesPerView = 2;
          slidesPerGroup = 1;
        }
      } else {
        slidesPerView = 2;
        slidesPerGroup = 1;
      }
    } else if (isBigDesktop) {
      if (isRightContainerOpen && isLeftContainerOpen) {
        slidesPerView = 2;
        slidesPerGroup = 1;
      } else if (isRightContainerOpen || isLeftContainerOpen) {
        if (isRightContainerOpen) {
          slidesPerView = 2.5;
          slidesPerGroup = 1;
        } else {
          slidesPerView = 2;
          slidesPerGroup = 1;
        }
      } else {
        slidesPerView = 2.5;
        slidesPerGroup = 1;
      }
    } else if (isVeryBigDesktop) {
      if (isRightContainerOpen && isLeftContainerOpen) {
        slidesPerView = 2;
        slidesPerGroup = 1;
      } else if (isRightContainerOpen || isLeftContainerOpen) {
        if (isRightContainerOpen) {
          slidesPerView = 3;
          slidesPerGroup = 2;
        } else {
          slidesPerView = 3;
          slidesPerGroup = 2;
        }
      } else {
        slidesPerView = 3;
        slidesPerGroup = 2;
      }
    } else {
      if (isRightContainerOpen && isLeftContainerOpen) {
        slidesPerView = 3;
        slidesPerGroup = 2;
      } else if (isRightContainerOpen || isLeftContainerOpen) {
        if (isRightContainerOpen) {
          slidesPerView = 3;
          slidesPerGroup = 2;
        } else {
          slidesPerView = 3;
          slidesPerGroup = 2;
        }
      } else {
        slidesPerView = 3;
        slidesPerGroup = 2;
      }
    }
  } else if (categ == "vendors") {
    if (isMobile || isSmallMobile) {
      slidesPerView = 2.5;
      slidesPerGroup = 2;
    } else if (isTablet) {
      slidesPerView = 4;
      slidesPerGroup = 3;
    } else if (isDesktop) {
      slidesPerView = 5;
      slidesPerGroup = 4;
    } else if (isBigDesktop) {
      slidesPerView = 7;
      slidesPerGroup = 5;
    } else {
      slidesPerView = 8;
      slidesPerGroup = 6;
    }
  } else if (!categ || categ == "Cat2Swiper") {
    if (isSmallMobile) {
      slidesPerView = 1;
      slidesPerGroup = 1;
    } else if (isMobile) {
      slidesPerView = 1;
      slidesPerGroup = 1;
    } else if (isTablet) {
      slidesPerView = 1.5;
      slidesPerGroup = 1;
    } else if (isDesktop) {
      if (isRightContainerOpen && isLeftContainerOpen) {
        slidesPerView = 2;
        slidesPerGroup = 1;
      } else if (isRightContainerOpen || isLeftContainerOpen) {
        if (isRightContainerOpen) {
          slidesPerView = 2;
          slidesPerGroup = 1;
        } else {
          slidesPerView = 2;
          slidesPerGroup = 1;
        }
      } else {
        slidesPerView = 2;
        slidesPerGroup = 2;
      }
    } else if (isBigDesktop) {
      if (isRightContainerOpen && isLeftContainerOpen) {
        slidesPerView = 3;
        slidesPerGroup = 2;
      } else if (isRightContainerOpen || isLeftContainerOpen) {
        if (isRightContainerOpen) {
          slidesPerView = 3;
          slidesPerGroup = 2;
        } else {
          slidesPerView = 3;
          slidesPerGroup = 2;
        }
      } else {
        slidesPerView = 3;
        slidesPerGroup = 2;
      }
    } else if (isVeryBigDesktop) {
      if (isRightContainerOpen && isLeftContainerOpen) {
        slidesPerView = 2;
        slidesPerGroup = 1;
      } else if (isRightContainerOpen || isLeftContainerOpen) {
        if (isRightContainerOpen) {
          slidesPerView = 3;
          slidesPerGroup = 2;
        } else {
          slidesPerView = 3;
          slidesPerGroup = 2;
        }
      } else {
        slidesPerView = 3.5;
        slidesPerGroup = 2;
      }
    } else {
      if (isRightContainerOpen && isLeftContainerOpen) {
        slidesPerView = 3.5;
        slidesPerGroup = 2;
      } else if (isRightContainerOpen || isLeftContainerOpen) {
        if (isRightContainerOpen) {
          slidesPerView = 3.5;
          slidesPerGroup = 2;
        } else {
          slidesPerView = 3.5;
          slidesPerGroup = 2;
        }
      } else {
        slidesPerView = 3.5;
        slidesPerGroup = 2;
      }
    }
  } else if (!categ || categ == "Cat3Swiper") {
    if (isSmallMobile) {
      slidesPerView = 2.5;
      slidesPerGroup = 2;
    } else if (isMobile) {
      slidesPerView = 3.5;
      slidesPerGroup = 2;
    } else if (isTablet) {
      slidesPerView = 3.5;
      slidesPerGroup = 1;
    } else if (isDesktop) {
      if (isRightContainerOpen && isLeftContainerOpen) {
        slidesPerView = 3;
        slidesPerGroup = 2;
      } else if (isRightContainerOpen || isLeftContainerOpen) {
        if (isRightContainerOpen) {
          slidesPerView = 4;
          slidesPerGroup = 2;
        } else {
          slidesPerView = 3;
          slidesPerGroup = 2;
        }
      } else {
        slidesPerView = 4;
        slidesPerGroup = 2;
      }
    } else if (isBigDesktop) {
      if (isRightContainerOpen && isLeftContainerOpen) {
        slidesPerView = 4;
        slidesPerGroup = 3;
      } else if (isRightContainerOpen || isLeftContainerOpen) {
        if (isRightContainerOpen) {
          slidesPerView = 4.5;
          slidesPerGroup = 3;
        } else {
          slidesPerView = 4;
          slidesPerGroup = 3;
        }
      } else {
        slidesPerView = 4.5;
        slidesPerGroup = 3;
      }
    } else if (isVeryBigDesktop) {
      if (isRightContainerOpen && isLeftContainerOpen) {
        slidesPerView = 3;
        slidesPerGroup = 2;
      } else if (isRightContainerOpen || isLeftContainerOpen) {
        if (isRightContainerOpen) {
          slidesPerView = 4;
          slidesPerGroup = 3;
        } else {
          slidesPerView = 4;
          slidesPerGroup = 3;
        }
      } else {
        slidesPerView = 7;
        slidesPerGroup = 3;
      }
    } else {
      if (isRightContainerOpen && isLeftContainerOpen) {
        slidesPerView = 7;
        slidesPerGroup = 3;
      } else if (isRightContainerOpen || isLeftContainerOpen) {
        if (isRightContainerOpen) {
          slidesPerView = 7;
          slidesPerGroup = 3;
        } else {
          slidesPerView = 7;
          slidesPerGroup = 3;
        }
      } else {
        slidesPerView = 8;
        slidesPerGroup = 3;
      }
    }
  }
  //  else if (categ == "service-links") {
  //   if (isSmallMobile) {
  //     slidesPerView = 1.9;
  //     slidesPerGroup = 2;
  //   } else if (isMobile) {
  //     slidesPerView = 2.5;
  //     slidesPerGroup = 3;
  //   } else if (isTablet) {
  //     slidesPerView = 4.5;
  //     slidesPerGroup = 3;
  //   } else if (isDesktop) {
  //     slidesPerView = 5.3;
  //     slidesPerGroup = 4;
  //   } else if (isBigDesktop) {
  //     slidesPerView = 6.2;
  //     slidesPerGroup = 5;
  //   } else {
  //     slidesPerView = 7;
  //     slidesPerGroup = 6;
  //   }
  // } else if (categ == "home-links-vertical") {
  //   if (isSmallMobile) {
  //     slidesPerView = 1.9;
  //     slidesPerGroup = 2;
  //   } else if (isMobile) {
  //     slidesPerView = 2.5;
  //     slidesPerGroup = 3;
  //   } else if (isTablet) {
  //     slidesPerView = 4.5;
  //     slidesPerGroup = 3;
  //   } else if (isDesktop) {
  //     slidesPerView = 5.3;
  //     slidesPerGroup = 4;
  //   } else if (isBigDesktop) {
  //     slidesPerView = 6.2;
  //     slidesPerGroup = 5;
  //   } else {
  //     slidesPerView = 5;
  //     slidesPerGroup = 4;
  //   }
  // } else if (categ == "home-links-horizontal") {
  //   if (isSmallMobile) {
  //     slidesPerView = 1;
  //     slidesPerGroup = 2;
  //   } else if (isMobile) {
  //     slidesPerView = 1;
  //     slidesPerGroup = 3;
  //   } else if (isTablet) {
  //     slidesPerView = 2;
  //     slidesPerGroup = 3;
  //   } else if (isDesktop) {
  //     slidesPerView = 3;
  //     slidesPerGroup = 4;
  //   } else if (isBigDesktop) {
  //     slidesPerView = 3;
  //     slidesPerGroup = 5;
  //   } else {
  //     slidesPerView = 3;
  //     slidesPerGroup = 4;
  //   }
  // }

  return {
    slidesPerView,
    slidesPerGroup,
    isMobile,
    isTablet,
    isDesktop,
    isBigDesktop,
  };
};
export default useSlidesResponsive;
