import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

import { casinoActions } from "../casinoSlice";
import { getCasino, getCasinoHome } from "../casinoAsyncActions";
import SwiperWithOverlay from "../../../features/UI/MainSwiper/SwiperWithOverlay";
import VendorSwiper from "../../../features/UI/MainSwiper/VendorSwiper";
import BigSwiper2 from "../../../features/UI/MainSwiper/BigSwiper2";
import ProvidersIcon from "../../../assets/casinoIcons/providers.svg?react";
import { translate } from "../../../utils/translations";
import { normalizeCasinoGame } from "../../../utils/custom";

const Lobby = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.login.user);
  const casinoBanners = useSelector((state) => state.casino.casinoBanners);
  const casinoVendors = useSelector((state) => state.casino.casinoVendors);
  const casinoHome = useSelector((state) => state.casino.casinoHome);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    dispatch(getCasino(signal, user));
    dispatch(getCasinoHome(signal, user));

    return () => {
      controller.abort();
      dispatch(casinoActions.resetLobby());
    };
  }, [dispatch, user?.AccountId]);

  const sections = useMemo(() => {
    if (!Array.isArray(casinoHome)) return [];
    return casinoHome
      .filter((section) => section && section.key !== "continue-playing" && section.key !== "continue_playing")
      .map((section) => ({
        ...section,
        items: (section.items || section.Items || section.games || section.Games || [])
          .map(normalizeCasinoGame)
          .filter((game) => game?.Data?.Id),
      }))
      .filter((section) => section.items.length > 0)
      .sort((a, b) => Number(a?.displayOrder ?? 9999) - Number(b?.displayOrder ?? 9999));
  }, [casinoHome]);

  return (
    <>
      <BigSwiper2 items={casinoBanners || []} autoplay casinoBannerPromo={false} />

      <VendorSwiper
        title={translate("Our Vendors")}
        icon={<ProvidersIcon />}
        link="/search"
        items={casinoVendors || []}
      />

      {sections.map((section) => (
        <React.Fragment key={section.key}>
          <SwiperWithOverlay
            title={translate(section.title || section.name || section.key)}
            icon={section.icon || ""}
            thIcon={section.iconUrl || section.Icon || ""}
            tag={null}
            items={section.items}
            max={20}
            link={`/casino/menu?tag=${encodeURIComponent(section.key)}`}
            clickOnTitle={false}
          />
        </React.Fragment>
      ))}
    </>
  );
};

export default Lobby;
