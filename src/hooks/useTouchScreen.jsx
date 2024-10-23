import { useEffect, useState } from "react";

const useTouchScreen = () => {
  const [isTouchScreen, setIsTouchScreen] = useState(false);

  useEffect(() => {
    const checkTouchSupport = () => {
      return (
        "ontouchstart" in window ||
        navigator.maxTouchPoints > 0 ||
        navigator.msMaxTouchPoints > 0
      );
    };

    setIsTouchScreen(checkTouchSupport());
  }, []);

  return isTouchScreen;
};

export default useTouchScreen;
