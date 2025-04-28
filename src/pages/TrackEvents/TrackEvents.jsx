import { useRef, useEffect } from "react";
import { getTrackEvent } from "./trackEventsAsyncActions";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { trackEventsActions } from "./TrackEventsSlice";

const TrackEvents = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const url = useSelector((state) => state.trackEvents.url);

  const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    dispatch(getTrackEvent(signal, "sis_racing", "SIS Lobby"));

    return () => {
      controller.abort();
    };
  }, []);

  useEffect(() => {
    if (url) {
      if (isSafari) {
        window.location.href = url;
        navigate("/");
      } else {
        window.open(url);
        navigate("/");
      }
    }

    return () => {};
  }, [url]);

  return <>{/* {url && <Frame name={"SIS Track Racing"} url={url} />} */}</>;
};

export default TrackEvents;
