import { useRef, useEffect } from "react";
import { getTrackEvent } from "./trackEventsAsyncActions";
import { useDispatch } from "react-redux";
import Frame from "./features/Frame";
import { layoutActions } from "../../features/Layout/layoutSlice";

const TrackEvents = (props) => {
  const dispatch = useDispatch();
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    dispatch(getTrackEvent(signal, "sis_racing", "SIS Lobby"));
    dispatch(layoutActions.setFullLeftContainer(false));

    return () => {
      controller.abort();
    };
  }, []);

  return (
    <>
      <Frame name={"SIS Track Racing"} />
    </>
  );
};

export default TrackEvents;
