import { useMemo } from "react";
import { useSelector } from "react-redux";

import SwiperWithOverlay from "../../../features/UI/MainSwiper/SwiperWithOverlay";
import NewIcon from "../../../assets/svgs/crash-games.svg?react";
import { normalizeCasinoGame } from "../../../utils/custom";

const CasinoSections = () => {
  const casinoSections = useSelector((state) => state.casino.casinoHome);

  const sections = useMemo(() => {
    if (!Array.isArray(casinoSections)) return [];

    return casinoSections
      .filter((section) => Array.isArray(section?.items) && section.items.length > 0)
      .filter((section) => {
        if (!section?.renderPage) return true;
        if (Array.isArray(section.renderPage)) return section.renderPage.includes("home");
        return String(section.renderPage).toLowerCase().includes("home");
      })
      .sort(
        (a, b) =>
          Number(a?.displayOrder ?? 9999) - Number(b?.displayOrder ?? 9999)
      );
  }, [casinoSections]);

  return sections.map((section) => {
    const games = (section.items || [])
      .map(normalizeCasinoGame)
      .filter(
        (game) =>
          (game?.gameId || game?.Data?.Id) &&
          (game?.thumbnailUrl || game?.Data?.ImageUrl3 || game?.Data?.ImageUrl)
      );

    if (!games.length) return null;

    return (
      <div key={section.key} style={{ minHeight: "180px" }}>
        <SwiperWithOverlay
          title={section.title || section.name || section.key}
          icon={<NewIcon />}
          items={games}
          max={20}
          link={`/casino/menu?tag=${section.key}`}
          tag={null}
        />
      </div>
    );
  });
};

export default CasinoSections;
