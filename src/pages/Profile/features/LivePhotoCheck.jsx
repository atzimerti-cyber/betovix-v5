// WebcamCapture.js
import React, { useRef, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Webcam from "react-webcam";
import * as faceapi from "@vladmandic/face-api";
import * as tf from "@tensorflow/tfjs";

import classes from "./LivePhotoCheck.module.css";

import RetakeIcon from "../../../assets/svgs/refresh.svg?react";

import { uploadKYCFile } from "../profileAsyncActions";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { translate } from "../../../utils/translations";

const LivePhotoCheck = (props) => {
  const dispatch = useDispatch();

  const webcamRef = useRef(null);

  const disableVerifyButton = useSelector(
    (state) => state.profile.disableVerifyButton
  );

  const [image, setImage] = useState(null);
  const [isLivenessChecked, setIsLivenessChecked] = useState(false);
  const [loading, setLoading] = useState(true);
  const [webcamVisible, setWebcamVisible] = useState(true);
  const [resultVisible, setResultVisible] = useState(false);

  useEffect(() => {
    ensureWebGLBackend();
    loadModels();
  }, []);

  const ensureWebGLBackend = async () => {
    await tf.setBackend("webgl"); // Force WebGL backend
    await tf.ready(); // Ensure TensorFlow.js is initialized
    console.log("TensorFlow.js is ready with backend:", tf.getBackend());
  };

  // Load face-api models
  const loadModels = async () => {
    const MODEL_URL = "/models"; // Path to your models
    console.log(faceapi.nets);
    console.log("Loading SSD MobileNet V1 model...");
    await faceapi.nets.ssdMobilenetv1.loadFromUri(MODEL_URL);
    console.log("SSD MobileNet V1 model loaded.");

    console.log("Loading Face Landmark 68 model...");
    await faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL);
    console.log("Face Landmark 68 model loaded.");

    console.log("Loading Face Recognition model...");
    await faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL);
    console.log("Face Recognition model loaded.");

    setLoading(false);
  };

  // const detectFace = async (imageSrc) => {
  //   const img = await faceapi.fetchImage(imageSrc);

  //   // Resize the image to the expected dimensions
  //   const input = faceapi.resizeResults(img, { width: 640, height: 480 }); // Adjust as needed

  //   const detections = await faceapi
  //     .detectSingleFace(input)
  //     .withFaceLandmarks();
  //   return detections;
  // };

  const detectFace = async (imageSrc) => {
    const img = await faceapi.fetchImage(imageSrc);
    const detection = await faceapi.detectSingleFace(img).withFaceLandmarks();

    if (detection) {
      const resizedDetection = faceapi.resizeResults(detection, {
        width: 640,
        height: 480,
      });
      return resizedDetection;
    }

    return null;
  };

  // Capture image and perform liveness check
  const captureAndCheckLiveness = async () => {
    setWebcamVisible(false);
    const imageSrc = webcamRef.current.getScreenshot();
    setImage(imageSrc);

    const detections = await detectFace(imageSrc);
    if (detections) {
      console.log("Face detected:", detections);
      setIsLivenessChecked(true);
    } else {
      console.log("No face detected.");
      setIsLivenessChecked(false);
    }
  };

  const submitLivePhoto = async (imageSrc) => {
    if (props.idFiles) {
      if (imageSrc && props.idFiles.frontSide && props.idFiles.backSide) {
        const controller = new AbortController();
        const signal = controller.signal;

        // Convert base64 image to a File object
        const file = await fetch(imageSrc)
          .then((res) => res.blob())
          .then(
            (blob) => new File([blob], "live_photo.jpg", { type: "image/jpeg" })
          );
        dispatch(uploadKYCFile(file, 4, signal));

        // Front side
        if (props.idFiles.frontSide) {
          const frontSideFormData = props.idFiles.frontSide;

          dispatch(uploadKYCFile(frontSideFormData, 3, signal));
        }
        // Back side
        if (props.idFiles.backSide) {
          const backSideFormData = props.idFiles.backSide;

          dispatch(uploadKYCFile(backSideFormData, 3, signal));
        }
      } else {
        if (!props.idFiles.frontSide) {
          toast.error(
            translate(
              "Please ensure that you upload SIDE 1 of your identification document"
            )
          );
        } else if (!props.idFiles.backSide) {
          toast.error(
            translate(
              "Please ensure that you upload SIDE 2 of your identification document"
            )
          );
        } else if (!imageSrc) {
          toast.error(
            translate(
              "Something went wrong with your live photo, please try again"
            )
          );
        } else {
          toast.error(
            translate(
              "Submission unsuccessful. Please verify that all required files have been uploaded correctly"
            )
          );
        }
      }
    } else {
      const controller = new AbortController();
      const signal = controller.signal;

      // Convert base64 image to a File object
      const file = await fetch(imageSrc)
        .then((res) => res.blob())
        .then(
          (blob) => new File([blob], "live_photo.jpg", { type: "image/jpeg" })
        );
      dispatch(uploadKYCFile(file, 4, signal));
    }
  };

  // const submitIDfiles = () => {
  //   const controller = new AbortController();
  //   const signal = controller.signal;

  //   // Front side
  //   if (props.idFiles.frontSide) {
  //     const frontSideFormData = props.idFiles.frontSide;

  //     dispatch(uploadKYCFile(frontSideFormData, 3, signal));
  //   } else {
  //     console.log("Front side of the ID is required.");
  //   }

  //   // Back side
  //   if (props.idFiles.backSide) {
  //     const backSideFormData = props.idFiles.backSide;

  //     dispatch(uploadKYCFile(backSideFormData, 3, signal));
  //   } else {
  //     console.log("Back side of the ID is required.");
  //   }
  // };

  return (
    <div className={classes.Container}>
      {webcamVisible && (
        <div className={classes.WebcamContainer}>
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            width={300}
          />
          <div className={classes.Rectangle}></div>
          <button
            onClick={() => {
              captureAndCheckLiveness();
              setResultVisible(true);
            }}
            className={classes.Button}
            disabled={loading}
            style={{ backgroundColor: "var(--brand-color)" }}
          >
            {loading ? (
              <>{translate("Loading")}...</>
            ) : (
              translate("Take Selfie")
            )}
          </button>
        </div>
      )}
      {resultVisible && (
        <div className={classes.CapturedContainer}>
          {image && (
            <>
              <div>
                <img src={image} alt="Captured" />
                <h3>{translate(`Liveness Check Result`)}:</h3>
                {isLivenessChecked ? (
                  <p style={{ color: "#749f0f" }}>
                    {translate(`Face Detected`)}!
                  </p>
                ) : (
                  <p style={{ color: "#ec5750d6" }}>
                    {translate(`No Face Detected`)}.
                  </p>
                )}
              </div>
              <div className={classes.ResultOptions}>
                <div className={classes.RetakePhoto}>
                  <button
                    onClick={() => {
                      setResultVisible(false);
                      setWebcamVisible(true);
                    }}
                    className={classes.Button}
                    style={{ backgroundColor: "gray" }}
                  >
                    <RetakeIcon height="17px" width="17px" fill="white" />
                    {translate(`Retake`)}
                  </button>
                </div>
                {isLivenessChecked ? (
                  <div className={classes.RetakePhoto}>
                    <button
                      style={{ backgroundColor: "#749f0f" }}
                      onClick={() => {
                        submitLivePhoto(image);
                      }}
                      className={classes.Button}
                      disabled={disableVerifyButton}
                    >
                      {disableVerifyButton ? (
                        <div className={classes.Spinner}></div>
                      ) : props.idFiles ? (
                        translate(`Submit Files`)
                      ) : (
                        translate(`Submit Live Photo`)
                      )}
                    </button>
                  </div>
                ) : (
                  <div className={classes.RetakePhoto}>
                    <button
                      style={{
                        opacity: "0.3",
                        background: "var(--brand-color)",
                        pointerEvents: "none",
                      }}
                      className={classes.Button}
                      disabled
                    >
                      {props.idFiles
                        ? translate(`Submit Files`)
                        : translate(`Submit Live Photo`)}
                    </button>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default LivePhotoCheck;
