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

export const loadInitData = (isMobile) => {
  return async (dispatch, getState) => {
    try {
      // Init menu
      let casinoMenuItems = [];
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
        const response = await axiosApi.get(
          `login/State/?lang=${lang.id}&siteid=${config.VITE_SITE_ID}`,
          {
            baseURLOverride: config.VITE_WALLET_API_BASE,
          }
        );
        if (response.data.Status.StatusCode !== 200)
          dispatch(loginActions.logout());
        else {
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
          dispatch(layoutActions.setAvailableBonusBalance(user));

          if (user?.Role < 40) {
            dispatch(fetchChildDetails(user.AccountId));
          }
        }
      }

      // Necessary
      // -------------------------------------

      const requestsNecessary = [
        axiosApi.get(
          `Translation/MyTranslations?type=Sportsbook&lang=${lang.id}`,
          {
            baseURLOverride: config.VITE_WALLET_API_BASE,
          }
        ),
      ];
      const responsesNecessary = await Promise.all(requestsNecessary);
      responsesNecessary.forEach((response) => {
        if (response.status !== 200) throw Error();
      });
      dispatch(appActions.setTranslations(responsesNecessary[0].data.Contents));

      //Tawk.To
      dispatch(tawktoChat());

      //Get Progress
      dispatch(heroProgress());
      //dispatch(getUserAchievements());

      //Get user rewards
      dispatch(getRewards());

      //GetUserNotifications
      {
        user && dispatch(getUserNotifications());
      }

      // Get permissions after setting user
      const currentLoginState = getState().login;
      const permissions = currentLoginState.permissions;

      // Sports
      // -------------------------------------
      if (permissions.AllowToSports) {
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

        const responsesSports = await Promise.all(requestsSports);
        responsesSports.forEach((response) => {
          if (response.status !== 200) throw Error();
        });

        dispatch(appActions.setSportSettings(responsesSports[3].data.Contents));

        // Update sports with icon and slug
        const currentState = getState().app;
        const sportIcons = currentState.sportIcons;
        let updatedSports = [];
        responsesSports[0].data.Contents.forEach((sport) => {
          let icon = sportIcons[sport.Name?.International] || <NoImageIcon />;
          updatedSports.push({
            ...sport,
            slug: sport.Name?.International.toLowerCase().replace(/ /g, "-"),
            icon: icon,
          });
        });

        // Five top sports
        const topSports = updatedSports.slice(0, 5);

        // Top tournaments
        const topTournaments = responsesSports[1].data;

        // Init live
        const matchesObj = responsesSports[2].data.Matches.reduce(
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

        // topTournaments.SubCategs.forEach((subCateg) => {
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

        topTournaments.SubCategs.forEach((subCateg) => {
          // Create a copy of the Items array and sort it
          const sortedItems = [...subCateg?.Items].sort(
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
        alphabeticalAllSports.sort((a, b) =>
          a.Name.International.localeCompare(b.Name.International)
        );
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
        siteSettings && siteSettings?.CasinoMenuType
          ? siteSettings.CasinoMenuType
          : "casinobetovix";
      const minitype =
        siteSettings && siteSettings?.CasinoMinibarType
          ? siteSettings.CasinoMinibarType
          : "Betovix";

      // Casino
      // -------------------------------------
      if (permissions.AllowToCasino || permissions.AllowToSlots) {
        const requestsCasino = [
          axiosApi.get(
            `MyCasino/GetVendors?lang=${lang.id}&siteid=${config.VITE_SITE_ID}`,
            {
              baseURLOverride: config.VITE_CASINO_BASE,
              timeout: 10000,
            }
          ),
          axiosApi.get(
            `MyCasino/MyMenu?type=${type}&lang=${lang.id}&siteid=${config.VITE_SITE_ID}`,
            {
              baseURLOverride: config.VITE_CASINO_BASE,
              timeout: 10000,
            }
          ),
          axiosApi.get(
            `MyCasino/MyMenu?type=casinominibar&lang=${lang.id}&siteid=${config.VITE_SITE_ID}`,
            {
              baseURLOverride: config.VITE_CASINO_BASE,
              timeout: 10000,
            }
          ),
        ];
        const responsesCasino = await Promise.all(requestsCasino);
        responsesCasino.forEach((response) => {
          if (response.status !== 200) throw Error();
        });

        if (Array.isArray(responsesCasino[0].data.Contents))
          dispatch(
            appActions.setAllCasinoVendors(responsesCasino[0].data.Contents)
          );

        const currentstate = getState().app;
        const casinoIcons = currentstate.casinoIcons;
        const casinoMenuIcons = currentstate.casinoMenuIcons;

        let casinoWalletMenu = {
          category: { id: 5, label: "Casino Categories", visible: true },
          items: [],
        };
        responsesCasino[1].data.Contents.Categs.forEach((category) => {
          casinoWalletMenu.items.push({
            id: category.Categ.Id,
            label: category.Categ.Name,
            icon: casinoIcons[category.Categ.Name] || <NoImageIcon />,
            page: `casino/menu?tag=${category.Categ.BadgeType}`,
          });
        });

        let casinoMinibarMenu = {
          category: { id: 6, label: "Casino", visible: true },
          items: [],
        };

        responsesCasino[2].data.Contents.Categs.forEach((categoryData) => {
          if (categoryData.Categ.Name === minitype) {
            categoryData.Items.forEach((item) => {
              if (item.Name === "Favorites" && !user) return;

              casinoMinibarMenu.items.push({
                id: item.Id,
                label: item.Name,
                icon: casinoMenuIcons[item.Name] || <NoImageIcon />,
                page: item.Link || "#",
              });
            });
          }
        });

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
        dispatch(appActions.setCasinoMinibarItems(casinoMinibarMenu));
      }

      {
        permissions.AllowGamification &&
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
          {
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

      const footerResponse = await axiosApi.get(
        `/Menu/MyMenu?type=sports&lang=${lang.id}&siteid=${config.VITE_SITE_ID}`,
        {
          baseURLOverride: config.VITE_WALLET_API_BASE,
        }
      );
      if (footerResponse.data.Status.StatusCode !== 200) throw Error();

      const footers = footerResponse.data.Contents;
      const foundFooter = footers?.Categs.find(
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
        foundFooter.SubCategs?.map((categ) => ({
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

      //Home Page Tags
      const homeTagsResponse = await axiosApi.get(
        `/MyCasino/GetLobbyTags?siteid=${config.VITE_SITE_ID}`,
        {
          baseURLOverride: config.VITE_CASINO_BASE,
        }
      );
      if (homeTagsResponse.data.Status.StatusCode !== 200) throw Error();

      dispatch(appActions.setHomeTags(homeTagsResponse.data.Contents));

      setTimeout(function () {
        dispatch(appActions.setInitDataLoaded(true));
      }, 2000);
    } catch (error) {
      dispatch(loginActions.logout()); //////////////////////////////////////////////////////
      dispatch(appActions.setInitDataLoaded(true));
      toast.error(translate(error?.message));
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
        `Translation/MyTranslations?type=Sportsbook&lang=${lang.id}`,
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
        //`Site/GetSite?domainName=betovix.com`,
        //`Site/GetSite?domainName=betovix.storetube.gr`,
        `Site/GetSite?domainName=${currentDomain}`,
        {
          signal: signal,
          baseURLOverride: config.VITE_WALLET_API_BASE,
        }
      );

      if (response.status !== 200) throw new Error("Something went wrong");

      if (!response.data.Contents.SiteTheme) {
        response.data.Contents.SiteTheme = "themes/theme-0.css";
      }
      if (!response.data.Contents.StatsTheme) {
        response.data.Contents.StatsTheme =
          window.location.origin + "/themes/theme-0-stats.css";
      }

      // config.VITE_SITE_ID = 45;
      config.VITE_SITE_ID = response.data.Contents.SiteId;
      config.VITE_SITE_LOGO = response.data.Contents.Logo;
      config.VITE_SITE_NAME = response.data.Contents.Name;
      config.VITE_STATS_THEME = response.data.Contents.StatsTheme;

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
      //link.href = "/themes/theme-9.css";
      link.href = response.data.Contents.SiteTheme; ////////////////////
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
      dispatch(getCurrencies());
    } catch (error) {
      dispatch(appActions.setSiteId(false));
    }
  };
};

export const getSiteSettings = (signal) => {
  return async (dispatch, navigate) => {
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

      let languages = [];
      const str = response.data.Contents.Site.AllowedLangs;
      const ids = str.split(",");
      ids.map((id) => {
        languages.push({
          id: id,
        });
      });

      let defaultLang = { id: `${response.data.Contents.Site.DefaultLang}` };

      // let siteCurrencies = [];
      // const currStr = response.data.Contents.Site.AllowedCurrencies;
      // const currencies = currStr.split(",");
      // currencies.map((curr) => {
      //   siteCurrencies.push(curr);
      // });

      let permissions;

      if (
        response.data.Contents.Site.LandPage &&
        response.data.Contents.Site.LandPage !== ""
      ) {
        navigate(response.data.Contents.Site.LandPage);
      }

      if (response.data.Contents.Permissions) {
        permissions = response.data.Contents.Permissions;
      } else {
        const appPermission = getState().login;
        permissions = appPermission.notLoggedInPermissions;
      }

      if (response.data.Contents.Site.GoogleClientId) {
        config.VITE_GOOGLE_CLIENT_ID =
          response.data.Contents.Site.GoogleClientId;
      }

      if (response.data.Contents.Site.LoginUrl) {
        config.VITE_LOGIN_URL = response.data.Contents.Site.LoginUrl;
      } else {
        config.VITE_LOGIN_URL = config.VITE_WALLET_API_BASE;
      }

      if (response.data.Contents.Site?.noReferrer === "true") {
        let metaTag = document.createElement("meta");
        metaTag.name = "referrer";
        metaTag.content = "no-referrer";
        document.head.appendChild(metaTag);
      }

      if (response.data.Contents.Site.CustomerCssUrl !== "") {
        const customercss = response.data.Contents.Site.CustomerCssUrl;
        const rules = document.createElement("style");
        rules.innerHTML = customercss;

        document.head.appendChild(rules);
      }

      if (response.data.Contents.Site?.LicenceActive === "true") {
        const license = {
          SealId: response.data.Contents.Site.SealId,
          Id: response.data.Contents.Site.Id,
          Name: response.data.Contents.Site.Name,
          Init: response.data.Contents.Site.Init,
          Url: response.data.Contents.Site.Url,
          LicenceActive: response.data.Contents.Site.LicenceActive,
        };
        dispatch(appActions.setLicence(license));

        if (
          response.data.Contents.Site?.Url &&
          response.data.Contents.Site?.Url !== ""
        ) {
          const licence = response.data.Contents.Site;
          const script = document.createElement("script");
          script.type = "text/javascript";
          script.src = licence.Url;

          document.head.appendChild(script);
        }
      }

      // if (response.data.Contents.Site.CustomerCssUrl !== "") {
      //   const customercss = "/customer.css";
      //   const link = document.createElement("link");

      //   link.rel = "stylesheet";
      //   link.href = customercss;

      //   document.head.appendChild(link);
      // }

      if (response.data.Contents.Site["Strong Password"] === "false") {
        dispatch(loginActions.setStrongPassword(false));
      } else {
        dispatch(loginActions.setStrongPassword(true));
      }

      if (response.data.Contents.Site.IDRequired === "true") {
        dispatch(loginActions.setIDRequired(true));
      } else {
        dispatch(loginActions.setIDRequired(false));
      }

      if (response.data.Contents.Site.GoogleTag !== "") {
        ScriptHeadInjector(response.data.Contents.Site.GoogleTag);
      }

      if (response.data.Contents.Site.SeoHTMLPage === "true") {
        dispatch(appActions.setSeoHTMLPage(true));
      }

      dispatch(
        appActions.setRegisterPromoImg(
          response.data.Contents.Site.RegisterPromoImg
        )
      );

      dispatch(loginActions.setPermissions(permissions));

      dispatch(
        appActions.setRegisterPromoImgMobile(
          response.data.Contents.Site.RegisterPromoImgMobile
        )
      );
      dispatch(appActions.setSiteSettings(response.data.Contents["Site"]));
      dispatch(appActions.setAvailableLangs(languages));
      dispatch(appActions.setDefaultLang(defaultLang));
      dispatch(
        appActions.setDefaultCountry(response.data.Contents.Site.DefaultCountry)
      );
      dispatch(
        appActions.setSocialMedia(response.data.Contents["Social Media"])
      );
      dispatch(appActions.setSiteSettingsSuccess(true));
    } catch (error) {
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
      toast.error(
        translate(error?.message) ||
          translate("An error occurred while fetching notifications.")
      );
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
      toast.error(
        translate(error?.message) ||
          "An error occurred while fetching site settings"
      );
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
