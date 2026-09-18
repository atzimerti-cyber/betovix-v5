import { useNavigate } from "react-router-dom";
import { translate } from "../../../utils/translations";
import PlayIcon from "../../../assets/svgs/play.svg?react";
import classes from "./SidebarFeaturedGames.module.css";

const readGame = (game) => {
  const data = game?.Data || game || {};
  return {
    id: data.Id ?? data.id ?? data.GameId ?? data.gameId,
    brandGameId: data.BrandGameId ?? data.brandGameId ?? data.ProviderGameCode ?? data.providerGameCode ?? data.Id ?? data.id ?? data.GameId ?? data.gameId,
    name: data.Name ?? data.name ?? data.DisplayName ?? data.displayName ?? "",
    provider: data.ProviderName ?? data.providerName ?? data.VendorName ?? data.vendorName ?? "",
    image: data.ImageUrl ?? data.imageUrl ?? data.ImageUrl2 ?? data.imageUrl2 ?? data.ThumbnailUrl ?? data.thumbnailUrl ?? data.BackgroundImageUrl ?? data.backgroundImageUrl ?? "",
    tags: Array.isArray(data.TagCodes ?? data.tagCodes)
      ? (data.TagCodes ?? data.tagCodes).join(",")
      : String(data.Tags ?? data.tags ?? ""),
  };
};

const SidebarFeaturedGames = ({ games = [], title }) => {
  const navigate = useNavigate();
  if (!games.length) return null;

  const openGame = (game) => {
    const item = readGame(game);
    if (!item.id) return;
    const type = item.tags.toLowerCase().includes("live") ? "live" : "slots";
    navigate(
      `/casino/game/${type}/${encodeURIComponent(item.provider || "provider")}/${encodeURIComponent(item.id)}/${encodeURIComponent(item.brandGameId || item.id)}/${encodeURIComponent(item.name || "game")}`
    );
  };

  return (
    <section className={classes.Section}>
      <div className={classes.Title}>{translate(title)}</div>
      <div className={classes.List}>
        {games.slice(0, 3).map((game, index) => {
          const item = readGame(game);
          return (
            <button
              type="button"
              className={classes.Game}
              key={`${item.id || item.name}-${index}`}
              onClick={() => openGame(game)}
            >
              <span
                className={classes.Thumb}
                style={item.image ? { backgroundImage: `url(${item.image})` } : undefined}
              />
              <span className={classes.Copy}>
                <strong>{item.name}</strong>
                <small>{item.provider}</small>
              </span>
              <span className={classes.Play}><PlayIcon /></span>
            </button>
          );
        })}
      </div>
    </section>
  );
};

export default SidebarFeaturedGames;
