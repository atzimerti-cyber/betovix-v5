import { toast } from "react-toastify";
import axiosApi from "../../axios-api";

import { appActions } from "./appSlice";
import {
  getLang,
  storageGetOddsFormat,
  storageSetOddsFormat,
  getLeftbar,
  getRightbar,
  getTicketChangesSettings,
  getTicketFromStorage,
} from "../../utils/storage";

import { getAccessToken } from "../../utils/auth";
import { loginActions } from "../../pages/Login/loginSlice";
import { liveActions } from "./liveSlice";
import { setLang } from "../../utils/storage";
import { ticketActions } from "../Ticket/ticketSlice";
import { betslipActions } from "../Betslip/betslipSlice";
import { layoutActions } from "../Layout/layoutSlice";
import config from "../../config";

import NoImageIcon from "../../assets/svgs/no-image.svg?react";
import PaperIcon from "../../assets/svgs/paper.svg?react";
import PricesIcon from "../../assets/svgs/prices.svg?react";
import LogoSmall1C from "../../assets/svgs/logo-small-oneColor.svg?react";
import RewardsIcon from "../../assets/svgs/rewards.svg?react";
import PromotionsIcon from "../../assets/svgs/promotions.svg?react";
import SupportIcon from "../../assets/svgs/livesupportbtn.svg?react";

import {
  getRewards,
  heroProgress,
} from "../../pages/UserGamification.jsx/gamificationAsyncActions";
import { translate } from "../../utils/translations";
import ScriptHeadInjector from "../../utils/scriptHeadInjector";
import { getCurrentBonusBalance } from "../../utils/bonusUtils";
import { normalizePermissions, normalizeSiteSettings } from "../../utils/siteSettings";

const isAuthError = (error) => [401, 403].includes(error?.response?.status);
const isCanceled = (error) => error?.code === "ERR_CANCELED" || error?.name === "CanceledError" || error?.name === "AbortError";

const optionalRequest = async (promise, fallback = null) => {
  try {
    return await promise;
  } catch (error) {
    if (isCanceled(error) || isAuthError(error) || error?.response?.status === 404) return fallback;
    console.warn("Optional startup request failed", error?.config?.url || error?.message);
    return fallback;
  }
};

export const loadInitData = (isMobile) => {
  return async (dispatch, getState) => {
    try {
      // Init menu
      let casinoMenuItems = [];
      let footerbarMenuItems = [];
      let sportsMenuItems = [];
      let allMenuItems = [];

      // Storage items
      // -------------------------------------
      const isLeftOpen = getLeftbar();
      if (isMobile) dispatch(layoutActions.setFullLeftContainer(false));
      else dispatch(layoutActions.setFullLeftContainer(isLeftOpen));

      const isRightOpen = getRightbar();
      if (isMobile) dispatch(layoutActions.setShowRightContainer(false));
      else dispatch(layoutActions.setShowRightContainer(isRightOpen));

      const ticketChangesSettings = getTicketChangesSettings();
      dispatch(ticketActions.setTicketChangesSettings(ticketChangesSettings));

      const storageTicket = getTicketFromStorage();
      if (storageTicket && storageTicket.type)
        dispatch(betslipActions.setBetType(storageTicket.type));

      //====================================LANG================================================//
      let lang;
      const searchParams = new URLSearchParams(location.search);
      let urlLang = searchParams.get("lang");
      let urlLangObj = { id: urlLang };
      if (urlLang) {
        // Get available languages from state
        const alState = getState().app;
        const availableLangs = alState.availableLangs;

        const isObjectInArray = (array, obj) => {
          return array.some(
            (item) => JSON.stringify(item) === JSON.stringify(obj)
          );
        };

        // Check if urlLangObj is in availableLangs
        if (isObjectInArray(availableLangs, urlLangObj)) {
          lang = urlLangObj;
          dispatch(appActions.setLang(lang));
          setLang(lang);
        } else {
          lang = getLang();
          dispatch(appActions.setLang(lang));
          searchParams.set("lang", lang.id); // Update the searchParams object
          const newUrl = `${location.pathname}?${searchParams.toString()}`; // Construct the new URL
          window.history.replaceState(null, "", newUrl); // Update the browser's URL without reloading
        }
      } else {
        const alState = getState().app;
        const defaultLang = alState.defaultLang;
        lang = getLang(defaultLang);
        dispatch(appActions.setLang(lang));
        searchParams.set("lang", lang.id); // Update the searchParams object
        const newUrl = `${location.pathname}?${searchParams.toString()}`; // Construct the new URL
        window.history.replaceState(null, "", newUrl); // Update the browser's URL without reloading
      }
      //====================================END LANG================================================//

      let oddsFormat = storageGetOddsFormat();
      if (!oddsFormat) {
        oddsFormat = "Decimal";
        storageSetOddsFormat("Decimal");
      }
      dispatch(appActions.setOddsFormat(oddsFormat));

      // User. TODO: get settings (CORS issue)? And remove them from the .env file?
      // -------------------------------------
      // const responseSettings = await axios.get(`https://pick777.net/customer/settings.js?v=2023.09.17.1437`, {
      //     responseType: 'text/plain',
      // });
      // console.log(responseSettings);

      const token = getAccessToken();
      let user = null;
      if (token) {
        // Authenticated-only reference data.
        dispatch(getCurrencies());
        const response = await optionalRequest(
          axiosApi.get(
            `login/State/?lang=${lang.id}&siteid=${config.VITE_SITE_ID}`,
            { baseURLOverride: config.VITE_WALLET_API_BASE }
          )
        );
        if (!response || response?.data?.Status?.StatusCode !== 200) {
          dispatch(loginActions.logout());
        } else {
          // TODO: The rest should come from the backend
          user = {
            ...response.data.Contents,

            // profileHidden: false,
            // marketingEmails: true,
            // level: 0,
            // wagered: 500,
            // registered: 1712505696754,
          };
          dispatch(loginActions.setUser(user));
          dispatch(layoutActions.setAvailableBonus(user));

          // The new backend no longer exposes the usable bonus balance through
          // login/State.TotalBonusBalance. Keep the authoritative bonus state
          // from the bonus APIs, exactly like the migrated reference frontend.
          const [activeBonusesResult, summaryBonusesResult] = await Promise.allSettled([
            axiosApi.get(`bonus/me/active?lang=${lang.id}&SiteId=${config.VITE_SITE_ID}`, {
              baseURLOverride: config.VITE_WALLET_API_BASE,
            }),
            axiosApi.get(`bonus/me/summary?lang=${lang.id}&SiteId=${config.VITE_SITE_ID}`, {
              baseURLOverride: config.VITE_WALLET_API_BASE,
            }),
          ]);

          if (activeBonusesResult.status === "fulfilled" && activeBonusesResult.value?.status === 200) {
            const activeBonuses = activeBonusesResult.value.data;
            dispatch(appActions.setActiveBonuses(activeBonuses));
            dispatch(layoutActions.setAvailableBonusBalance(getCurrentBonusBalance(activeBonuses)));
          } else {
            dispatch(appActions.setActiveBonuses(null));
            dispatch(layoutActions.setAvailableBonusBalance(0));
          }

          if (summaryBonusesResult.status === "fulfilled" && summaryBonusesResult.value?.status === 200) {
            dispatch(appActions.setSummaryBonuses(summaryBonusesResult.value.data));
          } else {
            dispatch(appActions.setSummaryBonuses(null));
          }

          if (user?.Role < 40) {
            dispatch(fetchChildDetails(user.AccountId));
          }
        }
      }

      // Necessary
      // -------------------------------------

      const requestsNecessary = [
        axiosApi.get(
          `Translation/MyTranslations?type=sports&lang=${lang.id}&siteid=${config.VITE_SITE_ID}`,
          {
            baseURLOverride: config.VITE_WALLET_API_BASE,
          }
        ),
      ];
      const responsesNecessary = await Promise.all(requestsNecessary);
      responsesNecessary.forEach((response) => {
        if (response.status !== 200) throw Error();
      });
      dispatch(appActions.setTranslations(responsesNecessary[0]?.data?.Contents || {}));

      //Tawk.To
      dispatch(tawktoChat());

      // Authenticated user-only startup calls.
      // Do not call these endpoints for guests: the new backend returns 401.
      if (user) {
        dispatch(heroProgress());
        //dispatch(getUserAchievements());
        dispatch(getRewards());
        dispatch(getUserNotifications());
      }

      // Get permissions after setting user
      const currentLoginState = getState().login;
      const permissions = currentLoginState.permissions;

      // Sports
      // -------------------------------------
      if (permissions?.AllowToSports) {
        const requestsSports = [
          axiosApi.post(
            `Pregame/PostData?action=sports&lang=${lang.id}&siteid=${config.VITE_SITE_ID}`,
            { data: `{"ProviderId":1,"Value":"","H24":false}` },
            { baseURLOverride: config.VITE_SPORTS_API_BASE }
          ),
          axiosApi.get(
            `Pregame/getTopLeagues?lang=${lang.id}&siteid=${config.VITE_SITE_ID}`,
            {
              baseURLOverride: config.VITE_SPORTS_API_BASE,
            }
          ),
          axiosApi.get(
            `LiveCluster/getLiveStateJson2?lang=${lang.id}&siteid=${config.VITE_SITE_ID}`,
            {
              baseURLOverride: config.VITE_SPORTS_API_BASE,
            }
          ),
          axiosApi.get(`Setting/SportSettings?Siteid=${config.VITE_SITE_ID}`, {
            baseURLOverride: config.VITE_WALLET_API_BASE,
          }),
        ];

        const responsesSports = await Promise.all(requestsSports.map((request) => optionalRequest(request)));

        dispatch(appActions.setSportSettings(responsesSports[3]?.data?.Contents || {}));

        // Update sports with icon and slug
        const currentState = getState().app;
        const sportIcons = currentState.sportIcons;
        let updatedSports = [];
        (Array.isArray(responsesSports[0]?.data?.Contents) ? responsesSports[0].data.Contents : []).forEach((sport) => {
          let icon = sportIcons[sport.Name?.International] || <NoImageIcon />;
          updatedSports.push({
            ...sport,
            slug: sport.Name?.International.toLowerCase().replace(/ /g, "-"),
            icon: icon,
          });
        });

        // Five top sports
        const topSports = updatedSports.slice(0, 6);

        // Top tournaments
        const topTournaments = responsesSports[1]?.data || {};

        // Init live
        const matchesObj = (Array.isArray(responsesSports[2]?.data?.Matches) ? responsesSports[2].data.Matches : []).reduce(
          (acc, match) => {
            acc[match.MatchId] = match;
            return acc;
          },
          {}
        );

        dispatch(appActions.setAllSports(updatedSports));
        dispatch(appActions.setTopSports(topSports));
        dispatch(appActions.setTopTournaments(topTournaments));
        dispatch(liveActions.setLiveState(matchesObj));

        // For menu
        let topTournamentsMenu = {
          category: { id: 2, label: "Top Leagues", visible: true },
          items: [],
        };
        // topTournaments.SubCategs[0]?.Items.forEach((topTournament) => {
        //   const value = topTournament.Value.split(",");
        //   topTournamentsMenu.items.push({
        //     id: topTournament.Value,
        //     label: topTournament.Par2 + " " + topTournament.Name,
        //     icon: <img src={topTournament.Icon} alt="-" />,
        //     page: `sportsbook/tournament/${value[0]}/${value[1]}/${value[2]}`,
        //   });
        // });
        // sportsMenuItems.push(topTournamentsMenu);

        // (topTournaments?.SubCategs || []).forEach((subCateg) => {
        //   subCateg.Items.forEach((topTournament) => {
        //     const value = topTournament.Value.split(",");
        //     topTournamentsMenu.items.push({
        //       id: topTournament.Value,
        //       label: topTournament.Par2 + " " + topTournament.Name,
        //       icon: <img src={topTournament.Icon} alt="-" />,
        //       page: `sportsbook/tournament/${value[0]}/${value[1]}/${value[2]}`,
        //     });
        //   });
        // });

        // sportsMenuItems.push(topTournamentsMenu);

        (topTournaments?.SubCategs || []).forEach((subCateg) => {
          // Create a copy of the Items array and sort it
          const sortedItems = [...(subCateg?.Items || [])].sort(
            (a, b) => parseFloat(a?.Par1) - parseFloat(b?.Par1)
          );

          sortedItems.forEach((topTournament) => {
            const value = topTournament.Value.split(",");
            topTournamentsMenu.items.push({
              id: topTournament.Value,
              // label: `${topTournament.Par2} ${topTournament.Name}`,
              label: `${topTournament.Name}`,
              icon: <img src={topTournament.Icon} alt="-" />,
              page: `sportsbook/tournament/${value[0]}/${value[1]}/${value[2]}`,
            });
          });
        });

        sportsMenuItems.push(topTournamentsMenu);

        let topSportsMenu = {
          category: { id: 3, label: "Top Sports", visible: true },
          items: [],
        };
        topSports.forEach((topSport) => {
          topSportsMenu.items.push({
            id: topSport.Id,
            label: topSport.Name.International,
            icon: topSport.icon,
            page: `sportsbook/home/${topSport.slug}`,
          });
        });
        sportsMenuItems.push(topSportsMenu);

        let alphabeticalAllSports = [...updatedSports];
        alphabeticalAllSports.sort((a, b) => a.Name.International.localeCompare(b.Name.International));
        let allSportsMenu = {
          category: { id: 4, label: "All Sports", visible: false },
          items: [],
        };
        alphabeticalAllSports.forEach((sport) => {
          allSportsMenu.items.push({
            id: sport.Id,
            label: sport.Name.International,
            icon: sport.icon,
            page: `sportsbook/home/${sport.slug}`,
          });
        });
        sportsMenuItems.push(allSportsMenu);

        dispatch(appActions.setSportsMenuItems(sportsMenuItems));
      }

      const currentState1 = getState().app;
      const siteSettings = currentState1.siteSettings;
      const type =
        siteSettings?.CasinoMenuType && siteSettings.CasinoMenuType !== "casinobetovix"
          ? siteSettings.CasinoMenuType
          : "casinov2";
      const footerbartype =
        siteSettings && siteSettings?.FooterMenuType
          ? siteSettings.FooterMenuType
          : "Betovix";

      // Casino
      // -------------------------------------
      if (permissions?.AllowToCasino || permissions?.AllowToSlots) {
        const requestsCasino = [
          axiosApi.get(
            `MyCasino/GetVendors?lang=${lang.id}&siteid=${config.VITE_SITE_ID}`,
            {
              baseURLOverride: config.VITE_CASINO_BASE,
              timeout: 10000,
            }
          ),
          axiosApi.get(
            `Legacy/Menu/MyMenu?type=${type}&lang=${lang.id}&siteid=${config.VITE_SITE_ID}`,
            {
              baseURLOverride: config.VITE_CASINO_BASE,
              timeout: 10000,
            }
          ),
          axiosApi.get(
            `Legacy/Menu/MyMenu?type=CasinoTopHeader&lang=${lang.id}&siteid=${config.VITE_SITE_ID}`,
            {
              baseURLOverride: config.VITE_CASINO_BASE,
              timeout: 10000,
            }
          ),
          axiosApi.get(
            `Legacy/Menu/MyMenu?type=footermenu&lang=${lang.id}&siteid=${config.VITE_SITE_ID}`,
            {
              baseURLOverride: config.VITE_CASINO_BASE,
              timeout: 10000,
            }
          ),
        ];
        const responsesCasino = await Promise.all(
          requestsCasino.map((request) =>
            optionalRequest(request, { data: { Contents: {} } })
          )
        );

        if (Array.isArray(responsesCasino[0].data.Contents))
          dispatch(
            appActions.setAllCasinoVendors(responsesCasino[0].data.Contents)
          );

        const currentstate = getState().app;
        const casinoIcons = currentstate.casinoIcons;
        const casinoMenuIcons = currentstate.casinoMenuIcons;
        const footerbarMenuIcons = currentstate.footerbarMenuIcons;

        const casinoMenuPayload = responsesCasino[1]?.data?.Contents || {};
        const casinoTopHeaderPayload = responsesCasino[2]?.data?.Contents || {};

        let casinoWalletMenu = {
          category: { id: 5, label: "Casino Categories", visible: true },
          items: [],
        };

        (casinoMenuPayload?.Categs || []).forEach((category) => {
          const categoryName = category?.Categ?.Name;
          const categoryBadge = category?.Categ?.BadgeType;

          if (categoryName && categoryBadge) {
            casinoWalletMenu.items.push({
              id: category.Categ.Id,
              label: categoryName,
              icon: casinoIcons[categoryName] || <NoImageIcon />,
              page: `casino/menu?tag=${categoryBadge}`,
            });
          }

          (category?.Items || []).forEach((item) => {
            const label = item?.Name;
            const page = item?.Link || item?.State;
            if (!label || !page) return;
            if (label === "Favorites" && !user) return;

            if (!casinoWalletMenu.items.some((existing) => existing.label === label)) {
              casinoWalletMenu.items.push({
                id: item.Id,
                label,
                icon: casinoMenuIcons[label] || casinoIcons[label] || <NoImageIcon />,
                page,
              });
            }
          });
        });

        (casinoMenuPayload?.Items || []).forEach((item) => {
          const label = item?.Name;
          const page = item?.Link || item?.State;
          if (!label || !page) return;
          if (label === "Favorites" && !user) return;

          if (!casinoWalletMenu.items.some((existing) => existing.label === label)) {
            casinoWalletMenu.items.push({
              id: item.Id,
              label,
              icon: casinoMenuIcons[label] || casinoIcons[label] || <NoImageIcon />,
              page,
            });
          }
        });

        let casinoMinibarMenu = {
          category: { id: 6, label: "Casino", visible: true },
          items: [],
        };

        const topHeaderItems = [
          ...(Array.isArray(casinoTopHeaderPayload?.Items) ? casinoTopHeaderPayload.Items : []),
          ...(Array.isArray(casinoTopHeaderPayload?.Categs)
            ? casinoTopHeaderPayload.Categs.flatMap((category) => category?.Items || [])
            : []),
        ];

        topHeaderItems.forEach((item) => {
          if (item?.Name === "Favorites" && !user) return;
          const page = item?.Link || item?.State;
          if (!item?.Name || !page) return;

          casinoMinibarMenu.items.push({
            id: item.Id,
            label: item.Name,
            icon: casinoMenuIcons[item.Name] || <NoImageIcon />,
            page,
          });
        });

        let footerbarMenu = [];

        (responsesCasino[3]?.data?.Contents?.Categs || []).forEach((categoryData) => {
          if (categoryData.Categ.Name === footerbartype) {
            (categoryData?.Items || []).forEach((item) => {

              footerbarMenu.push({
                id: item.Id,
                label: item.Name,
                icon: footerbarMenuIcons[item.Name] || <NoImageIcon />,
                page: item.State,
                link: item.Link || "#",
                badgeId: item.Badge,
              });
            });
          }
        });

        footerbarMenuItems.push(footerbarMenu);
        casinoMenuItems.push(casinoMinibarMenu);

        //  casinoMenuItems.push({
        //    category: { id: 1, label: "Casino", visible: true },
        //    items: [
        //      {
        //        id: 1,
        //        label: "Lobby",
        //        icon: <HomeIcon />,
        //        page: "casino/lobby",
        //      },
        //      {
        //        id: 2,
        //        label: "Slots",
        //        icon: <SlotsIcon />,
        //        page: "casino/slots",
        //      },
        //      {
        //        id: 3,
        //        label: "Live Casino",
        //        icon: <BlackjackIcon />,
        //        page: "casino/live",
        //      },
        //      {
        //        id: 4,
        //        label: "Virtual Games",
        //        icon: <VirtualGames />,
        //        page: "casino/virtualgames",
        //      },
        //      {
        //        id: 5,
        //        label: "Game Shows",
        //        icon: <GameShows />,
        //      page: "casino/gameshows",
        //      },
        //      {
        //        id: 6,
        //        label: "Table Games",
        //        icon: <TableGames />,
        //        page: "casino/tablegames",
        //      },
        //      {
        //        id: 7,
        //        label: "Providers",
        //        icon: <ProvidersMenu />,
        //        page: "casino/providers",
        //      },
        //      user && {
        //        id: 8,
        //        label: "Favorites",
        //        icon: <HeartIcon />,
        //        page: "casino/favorites",
        //      },
        //    ].filter(Boolean), // This filters out any `false` or `undefined` items
        //  });

        casinoMenuItems.push(casinoWalletMenu);

        dispatch(appActions.setCasinoMenuItems(casinoMenuItems));
        dispatch(appActions.setFooterbarMenu(footerbarMenuItems[0]));
        dispatch(appActions.setCasinoMinibarItems(casinoMinibarMenu));
      }

      // Main navigation menu. The migrated frontend reads this from the sports menu
      // using the site's MainMenuType. Keep the existing Betovix sidebar structure,
      // but feed it with the same backend menu source.
      const siteMenuResponse = await optionalRequest(
        axiosApi.get(
          `Legacy/Menu/MyMenu?type=sports&lang=${lang.id}&siteid=${config.VITE_SITE_ID}`,
          { baseURLOverride: config.VITE_WALLET_API_BASE }
        ),
        { data: { Contents: {} } }
      );
      const siteMenus = siteMenuResponse?.data?.Contents || {};
      const mainMenuType = siteSettings?.MainMenuType || "MAIN MENU V2";
      const mainMenuCategory = (siteMenus?.Categs || []).find(
        (entry) => entry?.Categ?.Name === mainMenuType && Array.isArray(entry?.Items)
      ) || (siteMenus?.Categs || []).find((entry) => Array.isArray(entry?.Items) && entry.Items.length);

      const mainMenuItems = (mainMenuCategory?.Items || [])
        .slice()
        .filter((item) => {
          // Sports/Inplay already belong to the existing sports navigation in this template.
          // Do not duplicate them in the generic sidebar menu.
          const name = String(item?.Name || "").trim().toLowerCase();
          return name !== "sports" && name !== "inplay" && name !== "in play";
        })
        .sort((a, b) => Number(a?.ViewOrder || 0) - Number(b?.ViewOrder || 0))
        .map((item) => {
          const rawPage = item?.Link || item?.State;
          if (!rawPage) return null;

          const isExternal = /^(https?:)?\/\//.test(rawPage);
          const page = isExternal
            ? rawPage
            : rawPage.startsWith("/")
              ? rawPage
              : `/${rawPage}`;

          return {
            id: item.Id,
            label: item.Name,
            icon: item.Icon ? <img src={item.Icon} alt="" /> : <NoImageIcon />,
            page,
            badge: item.Badge,
          };
        })
        .filter(Boolean);

      if (mainMenuItems.length) {
        allMenuItems.push({ items: mainMenuItems });
      }

      {
        permissions?.AllowGamification &&
          allMenuItems.push({
            category: { id: 7, label: "Arena", visible: true, isNew: true },
            items: [
              {
                id: 1,
                label: `My Progress`,
                icon: <LogoSmall1C color="#FF0000" />,
                modal: "your-progress",
              },
              {
                id: 2,
                label: `My Rewards`,
                icon: <RewardsIcon color="#FF0000" />,
                page: "rewards",
              },
              // {
              //   id: 3,
              //   label: `Hero’s Haven`,
              //   icon: <RewardsIcon color="#FF0000" />,
              //   page: "hero",
              // },
            ],
          });
      }

      const layout = getState().layout;
      const support = layout.tawkToScript;

      allMenuItems.push({
        category: { id: 8, label: "More", visible: false },
        items: [
          {
            id: 1,
            label: "Promotions",
            icon: <PromotionsIcon />,
            page: "promotions",
          },
          support?.Source && {
            id: 2,
            label: "Live Support",
            icon: <SupportIcon />,
            page: "support",
          },
          permissions?.AllowToSports && {
            id: 3,
            label: "My Bets",
            icon: <PaperIcon />,
            page: "sportsbook/mybets",
          },
          {
            id: 4,
            label: "Crypto Rates",
            icon: <PricesIcon />,
            page: "crypto",
          },
          // {
          //   id: 5,
          //   label: "Leaderboard",
          //   icon: <LeaderIcon />,
          //   page: "leaderboard",
          // },
        ].filter(Boolean),
      });

      //Footer
      const ss = getState().app.siteSettings;
      const footerType = ss && ss.FooterType ? ss.FooterType : "FOOTER";

      const footers = siteMenus || {};
      const foundFooter = footers?.Categs?.find(
        (f) => f.Categ.Name === footerType
      );

      // const footer =
      //   foundFooter.SubCategs?.map((categ) => ({
      //     title: categ.SubCateg?.Name || "Untitled",
      //     subcategs:
      //       categ?.Items?.map((subcateg) => {
      //         if (subcateg?.Name === "Support" && !support?.Source) {
      //           return;
      //         } else {
      //           return {
      //             name: subcateg?.Name || "Unnamed",
      //             link: subcateg?.Link || "#",
      //             target: subcateg?.Target || "",
      //           };
      //         }
      //       }) || [],
      //   })) || [];

      const footer =
        foundFooter?.SubCategs?.map((categ) => ({
          title: categ.SubCateg?.Name || "Untitled",
          subcategs:
            categ?.Items?.filter(
              (subcateg) => !(subcateg?.Name === "Support" && !support?.Source)
            ) // Skip "Support" if `support?.Source` is falsy
              ?.map((subcateg) => ({
                name: subcateg?.Name || "Unnamed",
                link: subcateg?.Link || "#",
                target: subcateg?.Target || "",
              })) || [],
        })) || [];

      dispatch(layoutActions.setFooter(footer));

      dispatch(appActions.setMenuItems(allMenuItems));

      // Home content is loaded by the Home page from the new casino personalization APIs.
      // GetHomeTags returns the casino tag catalog, not the home layout configuration.
      dispatch(appActions.setHomeTags([]));

      setTimeout(function () {
        dispatch(appActions.setInitDataLoaded(true));
      }, 2000);
    } catch (error) {
      // An optional startup request must not log the user out or keep the site blocked.
      // Authentication failures are handled by login/State and the auth flow itself.
      console.error("Failed to load initial application data", error);
      dispatch(appActions.setInitDataLoaded(true));
    }
  };
};

export const fetchChildDetails = (accountId) => {
  return async (dispatch, getState) => {
    try {
      const lang = getLang();
      const response = await axiosApi.get(
        `MyAffiliate/GetDirectChilds/?accountId=${accountId}&lang=${lang.id}&siteid=${config.VITE_SITE_ID}`,
        {
          baseURLOverride: config.VITE_WALLET_API_BASE,
        }
      );

      if (response.status === 200) {
        const childAccounts = response.data.Contents;
        const { accountChildren } = getState().login;
        const user = getState().login.user;

        if (accountId === user.AccountId) {
          dispatch(loginActions.setAccountChildren(childAccounts));
        } else {
          // Function to recursively update accounts
          const updateAccountChildren = (accounts, id, children) => {
            return accounts.map((account) => {
              if (account.AccountId === id) {
                return {
                  ...account,
                  children: children,
                };
              } else if (account.children) {
                return {
                  ...account,
                  children: updateAccountChildren(
                    account.children,
                    id,
                    children
                  ),
                };
              } else {
                return account;
              }
            });
          };

          const updatedAccounts = updateAccountChildren(
            accountChildren,
            accountId,
            childAccounts
          );
          dispatch(loginActions.setAccountChildren(updatedAccounts));
        }
      } else {
        throw new Error("Failed to fetch child accounts");
      }
    } catch (error) {
      toast.error(
        translate(error.message) || translate("Error fetching child details")
      );
    }
  };
};

// export const fetchChildDetails = (accountId) => {

//     return async (dispatch, getState) => {
//         try {
//             const lang = getLang();
//             const response = await axiosApi.get(
//                 `MyAffiliate/GetDirectChilds/?accountId=${accountId}&lang=${lang.id}&siteid=${config.VITE_SITE_ID}`,
//                 {
//                     baseURLOverride: config.VITE_WALLET_API_BASE,
//                 }
//             );

//             if (response.status === 200) {
//                 const childAccounts = response.data.Contents;
//                 const { accountChildren } = getState().login;
//                 const user = getState().login.user;

//                 if (accountId === user.AccountId) {
//                     dispatch(loginActions.setAccountChildren(childAccounts));
//                 } else {
//                     const updatedAccounts = accountChildren.map(account => {
//                         if (account.AccountId === accountId) {
//                             return {
//                                 ...account,
//                                 children: childAccounts,
//                             };
//                         }
//                         return account;
//                     });

//                     dispatch(loginActions.setAccountChildren(updatedAccounts));
//                 }
//             } else {
//                 throw new Error('Failed to fetch child accounts');
//             }
//         } catch (error) {
//             toast.error(error.message || 'Error fetching child details');
//         }
//     };
// };

export const getTranslations = (lang) => {
  return async (dispatch) => {
    try {
      const response = await axiosApi.get(
        `Translation/MyTranslations?type=sports&lang=${lang.id}&siteid=${config.VITE_SITE_ID}`,
        {
          baseURLOverride: config.VITE_WALLET_API_BASE,
        }
      );

      if (response.status !== 200) throw Error();

      dispatch(appActions.setTranslations(response.data.Contents));
      dispatch(appActions.setLang(lang));
      setLang(lang);
    } catch (error) {
      let toastMessage = translate(`${error?.message}`);
      toast.error(toastMessage);
    }
  };
};

export const getSite = (signal) => {
  return async (dispatch) => {
    try {
      const currentDomain = window.location.hostname;
      const response = await axiosApi.get(
        //`Site/GetSite?domainName=crimsoncoins.net`,
        // `Site/GetSite?domainName=betovix.storetube.gr`,
        `Legacy/Site/GetSite?domainName=${currentDomain}`,
        {
          signal: signal,
          baseURLOverride: config.VITE_WALLET_API_BASE,
        }
      );

      if (response.status !== 200) throw new Error("Something went wrong");

      if (!response.data.Contents.SiteTheme) {
        response.data.Contents.SiteTheme = "/themes/theme-0.css";
      }
      if (!response.data.Contents.StatsTheme) {
        response.data.Contents.StatsTheme =
          window.location.origin + "/themes/theme-0-stats.css";
      }

      // config.VITE_SITE_ID = 45;
      config.VITE_SITE_ID = response.data.Contents.SiteId;
      config.VITE_VEGAS_HOME_URL = `https://${currentDomain}`;
      config.VITE_SITE_LOGO = response.data.Contents.Logo;
      config.VITE_SITE_NAME = response.data.Contents.Name;
      config.VITE_STATS_THEME = response.data.Contents.StatsTheme;
      config.VITE_HOME_URL = `https://${currentDomain}`;

      // Set the page title
      document.title = response.data.Contents.PageTitle;

      // Set the meta description
      const metaDescription = document.querySelector(
        "meta[name='description']"
      );
      if (metaDescription) {
        metaDescription.setAttribute(
          "content",
          response.data.Contents.PageDescription
        );
      }
      // Theme
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.type = "text/css";
      //link.href = "/themes/theme-12.css";
      link.href = response.data.Contents.SiteTheme; /////////////////////
      document.head.appendChild(link);

      // Update all favicon links
      const basePath = window.location.origin;

      const updateFavicon = (size, path) => {
        const icon = document.querySelector(
          `link[rel~='icon'][sizes='${size}']`
        );
        if (icon) {
          icon.href = path;
        } else {
          const newIcon = document.createElement("link");
          newIcon.rel = "icon";
          newIcon.type = "image/png";
          newIcon.sizes = size;
          newIcon.href = path;
          document.head.appendChild(newIcon);
        }
      };
      // Update or add Apple Touch Icon
      const updateAppleTouchIcon = (size, path) => {
        const icon = document.querySelector(
          `link[rel='apple-touch-icon'][sizes='${size}']`
        );
        if (icon) {
          icon.href = path; // Update the existing icon
        } else {
          const newIcon = document.createElement("link");
          newIcon.rel = "apple-touch-icon";
          newIcon.sizes = size; // Set the size
          newIcon.href = path; // Set the href to the path
          document.head.appendChild(newIcon); // Add to the head
        }
      };
      const updateMaskIcon = (path, color) => {
        const icon = document.querySelector("link[rel='mask-icon']");
        if (icon) {
          icon.href = path; // Update the href attribute
          icon.color = color; // Update the color attribute
        } else {
          const newIcon = document.createElement("link");
          newIcon.rel = "mask-icon";
          newIcon.href = path; // Set the href to the path
          newIcon.color = color; // Set the color for the icon
          document.head.appendChild(newIcon); // Add to the head
        }
      };

      // Define paths
      const defaultPath32 = basePath + "/favicon-32x32.png";
      const defaultPath16 = basePath + "/favicon-16x16.png";
      const customPath32 =
        basePath + "/" + response.data.Contents.Name + "/favicon-32x32.png";
      const customPath16 =
        basePath + "/" + response.data.Contents.Name + "/favicon-16x16.png";
      const defaultPath180 = basePath + "/apple-touch-icon-180x180.png";
      const customPath180 =
        basePath +
        "/" +
        response.data.Contents.Name +
        "/apple-touch-icon-180x180.png";
      const defaultMaskPath = basePath + "/safari-pinned-tab.svg";
      const customMaskPath =
        basePath + "/" + response.data.Contents.Name + "/safari-pinned-tab.svg";
      const maskColor = "#000000";

      // Update icons based on response
      if (!response.data.Contents.Name) {
        updateFavicon("32x32", defaultPath32);
        updateFavicon("16x16", defaultPath16);
        updateAppleTouchIcon("180x180", defaultPath180);
        updateMaskIcon(defaultMaskPath, maskColor);
      } else {
        updateFavicon("32x32", customPath32);
        updateFavicon("16x16", customPath16);
        updateAppleTouchIcon("180x180", customPath180);
        updateMaskIcon(customMaskPath, maskColor);
      }

      dispatch(appActions.setSiteCurrency(response.data.Contents.Currency));
      dispatch(appActions.setSiteId(true));

      // Currency/Currencies is authenticated on the new backend.
      // Do not call it while bootstrapping a guest session.
      if (getAccessToken()) dispatch(getCurrencies());
    } catch (error) {
      dispatch(appActions.setSiteId(false));
    }
  };
};

export const getSiteSettings = (signal) => {
  return async (dispatch, getState) => {
    try {
      const response = await axiosApi.get(
        `Site/GetSiteSettings?SiteId=${config.VITE_SITE_ID}`,
        {
          signal: signal,
          baseURLOverride: config.VITE_WALLET_API_BASE,
        }
      );

      if (response.status !== 200)
        throw new Error("Failed to fetch site settings");

      const contents = response.data?.Contents || {};
      const site = normalizeSiteSettings(contents.Site || {});

      // New backend responses do not guarantee the old language fields.
      // Keep the template language state working without blocking app startup.
      const currentAppState = getState().app;
      const allowedLangs = Array.isArray(site.AllowedLangs)
        ? site.AllowedLangs
            .map((item) => (typeof item === "string" ? { id: item } : item))
            .filter((item) => item?.id)
        : typeof site.AllowedLangs === "string"
          ? site.AllowedLangs
              .split(",")
              .map((id) => id.trim())
              .filter(Boolean)
              .map((id) => ({ id }))
          : currentAppState.availableLangs || [];
      const defaultLang = site.DefaultLang
        ? { id: `${site.DefaultLang}` }
        : currentAppState.defaultLang || allowedLangs[0] || { id: "en" };

      const currentLoginState = getState().login;
      const fallbackPermissions =
        currentLoginState.permissions && Object.keys(currentLoginState.permissions).length
          ? currentLoginState.permissions
          : currentLoginState.notLoggedInPermissions || {};
      const permissions = normalizePermissions(contents.Permissions, fallbackPermissions);

      if (site.printLogo === true) {
        dispatch(appActions.setPrintLogoVisible(true));
      }

      if (site.MetaDesc) {
        const metaTag = document.createElement("meta");
        metaTag.name = "description";
        metaTag.content = site.MetaDesc;
        document.head.appendChild(metaTag);
      }

      if (site.GoogleClientId) config.VITE_GOOGLE_CLIENT_ID = site.GoogleClientId;
      config.VITE_LOGIN_URL = site.LoginUrl || config.VITE_WALLET_API_BASE;
      if (site.Logo) config.VITE_SITE_LOGO = site.Logo;

      if (site.noReferrer === true) {
        const metaTag = document.createElement("meta");
        metaTag.name = "referrer";
        metaTag.content = "no-referrer";
        document.head.appendChild(metaTag);
      }

      if (site.CustomerCssUrl) {
        const rules = document.createElement("style");
        rules.innerHTML = site.CustomerCssUrl;
        document.head.appendChild(rules);
      }

      if (site.LicenceActive === true) {
        const license = {
          SealId: site.SealId,
          Id: site.Id,
          Name: site.Name,
          Init: site.Init,
          Url: site.Url,
          LicenceActive: site.LicenceActive,
          LicenceLink: site.LicenceLink,
        };
        dispatch(appActions.setLicence(license));

        if (site.Url) {
          const script = document.createElement("script");
          script.type = "text/javascript";
          script.src = site.Url;
          document.head.appendChild(script);
        }
      }

      if (site.AppActive === true) {
        const app = {};
        let i = 1;
        while (site[`AppImg${i}`] && site[`AppLink${i}`]) {
          app[`AppImg${i}`] = site[`AppImg${i}`];
          app[`AppLink${i}`] = site[`AppLink${i}`];
          i++;
        }
        dispatch(appActions.setApp(app));
      }

      dispatch(loginActions.setStrongPassword(site["Strong Password"] !== false));
      dispatch(loginActions.setIDRequired(site.IDRequired === true));

      if (site.GoogleTag) ScriptHeadInjector(site.GoogleTag);
      dispatch(appActions.setSeoHTMLPage(site.SeoHTMLPage === true));
      dispatch(appActions.setChangeUsername(site.ChangeUsername !== false));
      dispatch(appActions.setRegisterPromoImg(site.RegisterPromoImg || null));
      dispatch(appActions.setRegisterPromoImgMobile(site.RegisterPromoImgMobile || null));

      dispatch(loginActions.setPermissions(permissions));
      dispatch(appActions.setSiteSettings(site));
      dispatch(appActions.setAvailableLangs(allowedLangs));
      dispatch(appActions.setDefaultLang(defaultLang));
      dispatch(appActions.setDefaultCountry(site.DefaultCountry || null));
      dispatch(appActions.setSocialMedia(contents["Social Media"] || null));
      dispatch(appActions.setSiteSettingsSuccess(true));
    } catch (error) {
      console.error("Failed to initialize site settings", error);
      dispatch(appActions.setSiteSettingsSuccess(false));
    }
  };
};

export const getUserNotifications = () => {
  return async (dispatch, getState) => {
    try {
      const lang = getLang();
      const response = await axiosApi.get(
        `UserNotifications/GetUserNotifications`,
        {
          baseURLOverride: config.VITE_WALLET_API_BASE,
        }
      );

      if (response.status !== 200)
        throw new Error("Failed to fetch notifications.");

      const notifications = response.data.Contents.map((item) => ({
        id: item.NotificationId,
        title: item?.Title,
        message: item?.Description,
        date: item?.CreatedAt,
        viewed: item?.Status === 0 ? false : true,
      }));

      dispatch(layoutActions.setNotifications(notifications));
    } catch (error) {
      if (!isCanceled(error) && !isAuthError(error)) {
        console.warn("Notifications unavailable", error?.message);
      }
    }
  };
};

export const viewUserNotification = (id) => {
  return async (dispatch, getState) => {
    try {
      const lang = getLang();
      const response = await axiosApi.get(
        `UserNotifications/ViewNotification?notificationId=${id}`,
        {
          baseURLOverride: config.VITE_WALLET_API_BASE,
        }
      );

      if (response.status !== 200) throw new Error();
    } catch (error) {
      console.error(
        error?.message || "An error occurred while reading the notification."
      );
    }
  };
};

export const tawktoChat = () => {
  return async (dispatch, getState) => {
    try {
      const lang = getLang();
      const response = await axiosApi.get(
        `Setting/CustomerSupportSettings?lang=${lang.id}&siteid=${config.VITE_SITE_ID}`,
        {
          baseURLOverride: config.VITE_WALLET_API_BASE,
        }
      );

      if (response.status !== 200)
        throw new Error("Failed to fetch Tawk.to chat");

      dispatch(
        layoutActions.setTawkToScript(response.data.Contents["Tawk.to"])
      );
    } catch (error) {
      if (!isCanceled(error) && !isAuthError(error)) {
        console.warn("Customer support settings unavailable", error?.message);
      }
    }
  };
};

export const getCurrencies = () => {
  return async (dispatch) => {
    try {
      const lang = getLang();
      const response = await axiosApi.get(`Currency/Currencies`, {
        baseURLOverride: config.VITE_WALLET_API_BASE,
      });

      if (response.status !== 200) throw new Error();

      let currencies = {};
      let currenciesArr = response.data.Contents;

      currenciesArr.map((c) => {
        currencies[c.Code] = c;
      });

      dispatch(appActions.setSiteCurrencies(currencies));
    } catch (error) {
      console.error(error?.message);
    }
  };
};
