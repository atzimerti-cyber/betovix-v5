// WebcamCapture.js
import React, { useRef, useState, useEffect } from "react";
import Webcam from "react-webcam";
import * as faceapi from "face-api.js";

import classes from "./LivePhotoCheck.module.css";

import RetakeIcon from "../../../assets/svgs/refresh.svg?react";

const LivePhotoCheck = () => {
  const webcamRef = useRef(null);
  const [image, setImage] = useState(null);
  const [isLivenessChecked, setIsLivenessChecked] = useState(false);
  const [loading, setLoading] = useState(true);
  const [webcamVisible, setWebcamVisible] = useState(true);
  const [resultVisible, setResultVisible] = useState(false);

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

  const detectFace = async (imageSrc) => {
    const img = await faceapi.fetchImage(imageSrc);

    // Resize the image to the expected dimensions
    const input = faceapi.resizeResults(img, { width: 640, height: 480 }); // Adjust as needed

    const detections = await faceapi
      .detectSingleFace(input)
      .withFaceLandmarks();
    return detections;
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

  useEffect(() => {
    loadModels();
  }, []);

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
            style={{ backgroundColor: "#749f0f" }}
          >
            {loading ? "Loading..." : "Take Selfie"}
          </button>
        </div>
      )}
      {resultVisible && (
        <div className={classes.CapturedContainer}>
          {image && (
            <>
              <div>
                <img src={image} alt="Captured" />
                <h3>Liveness Check Result:</h3>
                {isLivenessChecked ? (
                  <p style={{ color: "#749f0f" }}>Face Detected!</p>
                ) : (
                  <p style={{ color: "#ec5750d6" }}>No Face Detected.</p>
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
                    Retake
                  </button>
                </div>
                <div className={classes.RetakePhoto}>
                  <button
                    style={{ backgroundColor: "#749f0f" }}
                    onClick={() => {
                      null;
                    }}
                    className={classes.Button}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default LivePhotoCheck;
