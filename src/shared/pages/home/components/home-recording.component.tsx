import * as React from "react";
import "./home.scss";
import { ProgressCircleComponent } from "@app/shared/progress-circle";
import { MICROPHONE_ICON } from "@app/constants/icons";
const Hino = "https://estadio-sonoro.s3-sa-east-1.amazonaws.com/midia/hino.mp3";
import { CONFIG } from "@app/constants";
const MicRecorder = require("@app/shared/mic-recorder-to-mp3");
const isBrowser = typeof window !== "undefined";

const { useState } = React;
export interface IHomeComponentRecordingProps {
  canRecord: boolean;
  crowdSong: string;
  onAbort: () => void;
  onFinish: (song: any) => void;
  onRecord: () => void;
  onStop: () => void;
  token: string;
  totalSeconds: number;
}

enum recordingStates {
  recording = 0,
  finished = 1,
  stopped = 2
}
export const HomeComponentRecording = (props: IHomeComponentRecordingProps) => {
  const [seconds, setSeconds] = useState(0);
  const [uploadProgress, setUploadProgress] = useState<any | undefined>(undefined);
  const [currentInterval, setCurrentInterval] = useState<NodeJS.Timeout | undefined>(undefined);
  const [isBlocked, setIsBlocked] = useState(false);
  const [, setIsRecording] = useState(false);
  const [, setIsUploading] = useState(false);
  const [] = useState<string | ArrayBuffer | null>("");
  const [recordingState, setRecordingState] = useState<number>(recordingStates.stopped);
  const Mp3Recorder = new MicRecorder({ bitRate: 128 });
  const [audioElement, setAudioElement] = useState<any | null>(null);

  React.useEffect(() => {
    if (isBrowser) {
      // const audio = new Audio("https://estadio-sonoro.s3-sa-east-1.amazonaws.com/hino.mp3");
      const audio = new Audio(Hino);
      setAudioElement(audio);
      // setAudioElement(new Audio(props.crowdSong));
    }

    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

    if (!navigator.getUserMedia) {
      navigator.mediaDevices.getUserMedia =
        navigator.mediaDevices.getUserMedia ||
        navigator.mediaDevices.webkitGetUserMedia ||
        navigator.mediaDevices.mozGetUserMedia;
    }
    if (navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({ audio: true })
        .then(() => {
          if (process.env.NODE_ENV === "production") console.log("Permission Granted1");
          setIsBlocked(false);
        })
        .catch(e => {
          alert("1" + e.message);
          if (process.env.NODE_ENV === "production") console.log("Permission Denied1");
          setIsBlocked(true);
        });
    } else if (navigator.getUserMedia) {
      navigator.getUserMedia(
        { audio: true },
        () => {
          if (process.env.NODE_ENV === "production") console.log("Permission Granted2");
          setIsBlocked(false);
        },
        e => {
          alert("2" + e.message); //TODO: deny case
          if (process.env.NODE_ENV === "production") console.log("Permission Denied");
          setIsBlocked(true);
        }
      );
    } else {
      alert("3");
      console.log(" not found");
    }

    return () => {
      if (audioElement) audioElement.pause();
    };
  }, []);

  const sendRequest = (file: any) =>
    new Promise((resolve, reject) => {
      const req = new XMLHttpRequest();

      req.upload.addEventListener("progress", event => {
        if (event.lengthComputable) {
          const copy = uploadProgress;
          copy[file.name] = {
            state: "pending",
            percentage: (event.loaded / event.total) * 100
          };
          setUploadProgress(copy);
        }
      });

      req.upload.addEventListener("load", () => {
        const copy = uploadProgress;
        copy[file.name] = { state: "done", percentage: 100 };
        setUploadProgress(copy);
        resolve(req.response);
      });

      req.upload.addEventListener("error", () => {
        const copy = uploadProgress;
        copy[file.name] = { state: "error", percentage: 0 };
        setUploadProgress(copy);
        reject(req.response);
      });

      const formData = new FormData();
      formData.append("file", file, file.name);
      req.setRequestHeader("auth", props.token);
      req.open("POST", `${CONFIG.BASE_URL}:3001/record`);
      req.send(formData);
    });

  const startStream = () => {
    if (isBlocked) {
      if (process.env.NODE_ENV === "production") console.log("Permission Denied");
    } else {
      Mp3Recorder.start()
        .then(() => {
          if (process.env.NODE_ENV === "production") console.log("IT WORKED!");
        })
        .catch((e: any) => console.error(e));
    }
  };
  const stopStream = () => {
    Mp3Recorder.stop()
      .getMp3()
      .then(([, blob]: any) => {
        // uploadFile(blob);
        props.onFinish(blob);
        if (audioElement) audioElement.pause();
      })
      .catch((e: any) => console.log(e));
  };

  const getPercentage = (): number => {
    if (props.totalSeconds > 0) return Math.round((seconds / props.totalSeconds) * 100);

    return 0;
  };

  let currentSecond = 0;
  let isRecordingLocal = false;
  const tick = () => {
    if (isRecordingLocal) {
      if (currentSecond >= props.totalSeconds) {
        onFinish();
      } else {
        currentSecond += 1;
        setSeconds(currentSecond);
      }
    } else {
      clearInterval(intervalHandle);
    }
  };
  let intervalHandle: NodeJS.Timeout;
  const onStart = () => {
    if (props.canRecord) {
      if (audioElement) audioElement.play();
      setIsRecording(true);
      isRecordingLocal = true;
      props.onRecord();
      setRecordingState(recordingStates.recording);
      currentSecond = 0;
      setSeconds(0);
      intervalHandle = setInterval(tick, 1000);
      setCurrentInterval(intervalHandle);
      startStream();
    } else {
      alert("Para gravar um novo áudio, é preciso deletar a gravaçāo atual.");
    }
  };

  const onStop = () => {
    props.onStop();
    if (audioElement) {
      const newAUdio = audioElement;
      audioElement.pause();
      newAUdio.currentTime = 0;
      setAudioElement(newAUdio);
    }
    setIsRecording(false);
    isRecordingLocal = false;
    setRecordingState(recordingStates.stopped);
    currentSecond = 0;
    setSeconds(0);
    clearInterval(intervalHandle);
    if (currentInterval) clearInterval(currentInterval);
  };
  const onFinish = () => {
    stopStream();
    setIsRecording(false);
    isRecordingLocal = false;
    setRecordingState(recordingStates.finished);

    clearInterval(intervalHandle);
    if (currentInterval) clearInterval(currentInterval);
  };

  const clickHandler = () => {
    if (recordingState === recordingStates.recording) {
      onStop();
    } else {
      onStart();
    }
  };

  return (
    <div>
     
      {/* {JSON.stringify(uploadProgress ? uploadProgress.percentage : 0)}
       */}
    </div>
  );
};
