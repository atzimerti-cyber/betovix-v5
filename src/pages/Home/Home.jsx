import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import classes from "./Home.module.css";

import useIntersectionObserver from "../../hooks/IntersectionObserver";
import useSlidesResponsive from "../../hooks/useSlidesResponsive";

import Banners from "../../features/Banners/Banners";
import LiveEvents from "./features/LiveEvents";
import TopEvents from "../../features/TopEvents/TopEvents";
import VipProgress from "./features/VipProgress";
import RegisterContainers from "./features/RegisterContainers";
import SelectHeroContainer from "./features/SelectHeroContainer";
import Crypto from "../../features/CryptoPriceSwiper/Crypto";
import ManualRewards from "../UserGamification.jsx/features/ManualRewards";
import CasinoTagSwiper from "../../features/CasinoTag/CasinoTagSwiper";
import GamificationBanner from "../UserGamification.jsx/GamificationBanner/GamificationBanner";
import ServiceLinksSwiper from "../../features/UI/MainSwiper/ServiceLinksSwiper";
import MainLinksSwiper from "../../features/UI/MainSwiper/MainLinksSwiper";
import GameLinksSwiper from "../../features/UI/MainSwiper/GameLinksSwiper";
import JackpotCounter from "../Casino/features/JackpotCounter";

function ObjectHasValue(obj) {
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      return true;
    }
  }
  return false;
}

const Home = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const lang = useSelector((state) => state.app.lang); // Necessary for rerendering translations
  const tags = useSelector((state) => state.app.homeTags);

  const { isMobile, isTablet } = useSlidesResponsive();

  const user = useSelector((state) => state.login.user);
  const permissions = useSelector((state) => state.login.permissions);
  const hasHero = useSelector((state) => state.gamification.selectedHero);
  const liveState = useSelector((state) => state.live.liveState);

  const hasLiveEvents = ObjectHasValue(liveState);

  const [tagVisibility, setTagVisibility] = useState(
    tags && tags.map(() => true) // Initializing all components to visible (true)
  );

  useEffect(() => {

    const stories = [
      {
        id: 1,
        profileImage: "https://via.placeholder.com/100",
        slides: [
          { image: "https://via.placeholder.com/600x800", caption: "Yeni sezon ürünlerimiz" },
          { image: "https://via.placeholder.com/600x800", caption: "Özel koleksiyon" },
          { image: "https://via.placeholder.com/600x800", caption: "İndirimli ürünler" }
        ]
      },
      {
        id: 2,
        profileImage: "https://via.placeholder.com/100",
        slides: [
          { image: "https://via.placeholder.com/600x800", caption: "Haftalık workshop" },
          { image: "https://via.placeholder.com/600x800", caption: "Müşteri buluşması" }
        ]
      },
      {
        id: 3,
        profileImage: "https://via.placeholder.com/100",
        slides: [
          { image: "https://via.placeholder.com/600x800", caption: "Ayşe'nin yorumu" },
          { image: "https://via.placeholder.com/600x800", caption: "Mehmet'in deneyimi" },
          { image: "https://via.placeholder.com/600x800", caption: "Ali'nin değerlendirmesi" },
          { image: "https://via.placeholder.com/600x800", caption: "Zeynep'in görüşleri" }
        ]
      },
      {
        id: 4,
        profileImage: "https://via.placeholder.com/100",
        slides: [
          { image: "https://via.placeholder.com/600x800", caption: "Ofisimiz" },
          { image: "https://via.placeholder.com/600x800", caption: "Ekibimiz" },
          { image: "https://via.placeholder.com/600x800", caption: "Değerlerimiz" }
        ]
      },
      {
        id: 5,
        profileImage: "https://via.placeholder.com/100",
        slides: [
          { image: "https://via.placeholder.com/600x800", caption: "Adresimiz" },
          { image: "https://via.placeholder.com/600x800", caption: "Telefon ve E-posta" }
        ]
      }
    ];

    const storyCircles = document.querySelector('.story-circles');
    const storyViewer = document.getElementById('storyViewer');
    const closeButton = document.querySelector('.close-button');
    const progressBars = document.querySelector('.progress-bars');
    const storyImage = document.querySelector('.story-image');
    const caption = document.querySelector('.caption p');
    const navLeft = document.querySelector('.nav-left');
    const navRight = document.querySelector('.nav-right');

    let activeStoryIndex = null;
    let activeSlideIndex = 0;
    let progressInterval = null;
    const slideDuration = 5000;

    function createStoryCircles() {
      stories.forEach((story, index) => {
        const storyCircle = document.createElement('div');
        storyCircle.className = 'story-circle';

        const button = document.createElement('button');
        button.className = 'story-button';
        button.addEventListener('click', () => openStory(index));

        const img = document.createElement('img');
        img.src = story.profileImage;

        const title = document.createElement('span');
        title.className = 'story-title';
        title.textContent = story.title || '';

        button.appendChild(img);
        storyCircle.appendChild(button);
        storyCircle.appendChild(title);
        storyCircles.appendChild(storyCircle);
      });
    }

    function openStory(index) {
      activeStoryIndex = index;
      activeSlideIndex = 0;
      storyViewer.style.display = 'flex';
      createProgressBars();
      showSlide();
      startProgress();
    }

    function createProgressBars() {
      progressBars.innerHTML = '';
      const currentStory = stories[activeStoryIndex];
      currentStory.slides.forEach(() => {
        const progressBar = document.createElement('div');
        progressBar.className = 'progress-bar';
        const innerBar = document.createElement('div');
        innerBar.className = 'progress-bar-inner';
        progressBar.appendChild(innerBar);
        progressBars.appendChild(progressBar);
      });
    }

    function showSlide() {
      const currentStory = stories[activeStoryIndex];
      const currentSlide = currentStory.slides[activeSlideIndex];
      storyImage.src = currentSlide.image;
      caption.textContent = currentSlide.caption;
      const allBars = progressBars.querySelectorAll('.progress-bar');
      allBars.forEach((bar, i) => {
        const innerBar = bar.querySelector('.progress-bar-inner');
        if (i < activeSlideIndex) {
          bar.classList.add('completed');
          innerBar.style.width = '100%';
        } else if (i > activeSlideIndex) {
          bar.classList.remove('completed');
          innerBar.style.width = '0';
        } else {
          bar.classList.remove('completed');
          innerBar.style.width = '0';
        }
      });
    }

    function startProgress() {
      if (progressInterval) clearInterval(progressInterval);
      const bar = progressBars.querySelectorAll('.progress-bar')[activeSlideIndex];
      const inner = bar.querySelector('.progress-bar-inner');
      let startTime = Date.now();
      progressInterval = setInterval(() => {
        let elapsed = Date.now() - startTime;
        let progress = (elapsed / slideDuration) * 100;
        if (progress >= 100) {
          clearInterval(progressInterval);
          nextSlide();
        } else {
          inner.style.width = `${progress}%`;
        }
      }, 50);
    }

    function prevSlide() {
      if (activeSlideIndex > 0) {
        activeSlideIndex--;
        showSlide();
        startProgress();
      }
    }

    function nextSlide() {
      const story = stories[activeStoryIndex];
      if (activeSlideIndex < story.slides.length - 1) {
        activeSlideIndex++;
        showSlide();
        startProgress();
      } else if (activeStoryIndex < stories.length - 1) {
        activeStoryIndex++;
        activeSlideIndex = 0;
        createProgressBars();
        showSlide();
        startProgress();
      } else {
        closeStory();
      }
    }

    function closeStory() {
      storyViewer.style.display = 'none';
      if (progressInterval) clearInterval(progressInterval);
      activeStoryIndex = null;
      activeSlideIndex = 0;
    }

    function setupEventListeners() {
      closeButton.addEventListener('click', closeStory);
      navLeft.addEventListener('click', prevSlide);
      navRight.addEventListener('click', nextSlide);
      document.addEventListener('keydown', e => {
        if (e.key === 'Escape') closeStory();
      });
      storyViewer.addEventListener('click', e => {
        if (e.target === navLeft || e.target === navRight || closeButton.contains(e.target)) return;
        nextSlide();
      });
    }

    createStoryCircles();
    setupEventListeners();
  }, [])


  const addParamsToUrl = (modal, tab) => {
    const searchParams = new URLSearchParams(location.search);
    searchParams.set("modal", modal);
    if (tab) searchParams.set("tab", tab);

    navigate(`${location.pathname}?${searchParams.toString()}`, {
      replace: true,
    });
  };

  // Handle the removal of the tag component
  const handleRemoveComponent = (index) => {
    console.log(`Removing tag component at index: ${index}`);

    // Set the specific tag component at `index` to false
    setTagVisibility((prevVisibility) => {
      const newVisibility = [...prevVisibility];
      newVisibility[index] = false; // Set visibility of the component at index to false
      return newVisibility;
    });
  };

  return (
    <div className={classes.PageContent} style={{ paddingTop: "16px" }}>
      <div className={classes.Home} id="homePage">
        <div class="story-container" style={{ display: "none" }}>
          <div class="story-circles">
            <div class="story-viewer" id="storyViewer">
              <button class="close-button">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                  viewBox="0 0 24 24" fill="none" stroke="currentColor"
                  strokeWidth="2" strokeLinecap="round"
                  strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>

              <div class="story-content">
                <div class="progress-bars"></div>
                <div class="story-image-container">
                  <img class="story-image" src="" alt="Story" />
                  <div class="caption">
                    <p></p>
                  </div>

                  <div class="navigation">
                    <div class="nav-left"></div>
                    <div class="nav-right"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {isMobile && hasHero && Object.keys(hasHero).length > 0 && (
          <div className={classes.VipContainer} key={999}>
            <VipProgress />
          </div>
        )}

        {/* TAGS TEST */}
        {tags &&
          tags.map((tag, index) => {
            const { isVisible, elementRef } = useIntersectionObserver(
              0.3,
              user
            );

            return (
              tagVisibility[index] && (
                <>
                  {(tag.Category === "1" ||
                    tag.Category === "2" ||
                    tag.Category === "3") &&
                    permissions.AllowToCasino && (
                      <div
                        key={index}
                        style={{ minHeight: "180px" }}
                        ref={elementRef}
                      >
                        {isVisible && (
                          <CasinoTagSwiper
                            title={tag.Name}
                            tag={tag.Tags}
                            onDataNotFound={() => handleRemoveComponent(index)}
                          />
                        )}
                      </div>
                    )}

                  {tag.Category === "4" &&
                    permissions.AllowToSports &&
                    tag.Name === "Live Events" &&
                    hasLiveEvents && (
                      <div
                        key={index}
                        style={{ minHeight: "180px" }}
                        ref={elementRef}
                      >
                        <LiveEvents />
                      </div>
                    )}

                  {tag.Category === "4" &&
                    permissions.AllowToSports &&
                    tag.Name === "Top Events" && (
                      <div
                        key={index}
                        style={{ minHeight: "180px" }}
                        ref={elementRef}
                      >
                        <TopEvents
                          onDataNotFound={() => handleRemoveComponent(index)}
                        />
                      </div>
                    )}

                  {tag.Category === "5" &&
                    tag.Name === "Hero Banenrs" &&
                    permissions.AllowGamification &&
                    (!user || !hasHero) && (
                      <div
                        key={index}
                        style={{ minHeight: "180px" }}
                        ref={elementRef}
                      >
                        <GamificationBanner
                          onDataNotFound={() => handleRemoveComponent(index)}
                        />
                      </div>
                    )}

                  {tag.Category === "5" &&
                    tag.Name === "Rewards" &&
                    permissions.AllowGamification &&
                    user && (
                      <div
                        key={index}
                        style={{ minHeight: "180px" }}
                        ref={elementRef}
                      >
                        <div
                          className={classes.ManualRewards}
                          onClick={() => addParamsToUrl("your-progress")}
                        >
                          <ManualRewards
                            onDataNotFound={() => handleRemoveComponent(index)}
                          />
                        </div>
                      </div>
                    )}

                  {tag.Category === "6" && tag.Name === "Banners" && (
                    <div
                      key={index}
                      style={{ minHeight: "60px" }}
                      ref={elementRef}
                    >
                      <div
                        id="homeBanners"
                        className={
                          isMobile || isTablet
                            ? [
                              classes.BannersContent,
                              classes.AdjustMargins,
                            ].join(" ")
                            : classes.BannersContent
                        }
                      >
                        <Banners
                          onDataNotFound={() => handleRemoveComponent(index)}
                        />

                        {!isMobile && user && hasHero && (
                          <div className={classes.VipContainer}>
                            <VipProgress />
                          </div>
                        )}

                        {!user && <RegisterContainers />}
                        {!hasHero && user && permissions.AllowGamification && (
                          <SelectHeroContainer />
                        )}
                      </div>
                    </div>
                  )}

                  {tag.Category === "6" && tag.Name === "Crypto Prices" && (
                    <div
                      key={index}
                      style={{ minHeight: "40px" }}
                      ref={elementRef}
                    >
                      <Crypto
                        onDataNotFound={() => handleRemoveComponent(index)}
                      />
                    </div>
                  )}

                  {tag.Category === "7" && (
                    <>
                      {tag.Tags === "ServiceLinks" && (
                        <ServiceLinksSwiper
                          onDataNotFound={() => handleRemoveComponent(index)}
                        />
                      )}

                      {tag.Tags === "MainLinks" && (
                        <MainLinksSwiper
                          onDataNotFound={() => handleRemoveComponent(index)}
                        />
                      )}

                      {tag.Tags.includes("Game") && (
                        <GameLinksSwiper
                          tag={tag.Tags}
                          onDataNotFound={() => handleRemoveComponent(index)}
                        />
                      )}
                    </>
                  )}

                  {tag.Category === "8" &&
                    permissions.AllowToSlots &&
                    permissions.AllowToCasino && (
                      <JackpotCounter
                        onDataNotFound={() => handleRemoveComponent(index)}
                      />
                    )}
                    
                </>
              )
            );
          })}
      </div>
    </div>
  );
};

export default Home;
