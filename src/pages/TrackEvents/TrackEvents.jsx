import { useRef, useEffect } from "react";
import { getTrackEvent } from "./trackEventsAsyncActions";
import { useDispatch, useSelector } from "react-redux";
import Frame from "./features/Frame";
import { layoutActions } from "../../features/Layout/layoutSlice";
import { useNavigate } from "react-router-dom";

const TrackEvents = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const url = useSelector((state) => state.trackEvents.url);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    dispatch(getTrackEvent(signal, "sis_racing", "SIS Lobby"));
    dispatch(layoutActions.setFullLeftContainer(false));

    return () => {
      controller.abort();
    };
  }, []);

  useEffect(() => {
    if (url) {
      window.open(url);
      navigate("/");
    }

    return () => {};
  }, [url]);

  return <>{/* {url && <Frame name={"SIS Track Racing"} url={url} />} */}</>;
};

export default TrackEvents;
