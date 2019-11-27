import * as React from "react";
import "./home.scss";
import { Button } from "@app/shared/button";
import { ProgressCircleComponent } from "@app/shared/progress-circle";
import { HomeComponentRecording } from "./home-recording.component";
import PlayPause from "@assets/images/play-pause.png";
import Delete from "@assets/images/delete.png";
import { LogoComponent } from "@app/shared/logo/logo.component";
import { CONFIG } from "../../../constants/config";
const { useState } = React;
const AudioPlayer = require("@app/shared/react-h5-audio-player").default;
const MicRecorder = require("@app/shared/mic-recorder-to-mp3");
const Hino = "https://estadio-sonoro.s3-sa-east-1.amazonaws.com/midia/hino.mp3";
import axios, { AxiosRequestConfig } from "axios";
import { MICROPHONE_ICON } from "@app/constants/icons";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { RouteComponentProps } from "react-router";
const isBrowser = typeof window !== "undefined";

const TOTAL_SECONDS = 27;
export interface IHomeComponentRecordingProps {
  crowdAudio: string;
  onFinish: (file: string) => void;
  token: string;
  history: any;
}

enum recordingStates {
  recording = 0,
  finished = 1,
  stopped = 2,
  sending = 3
}
const HomeMainComponent = (props: IHomeComponentRecordingProps) => {
  const [recordingState, setRecordingState] = useState<recordingStates>(recordingStates.stopped);
  const [blobAudio, setBlobAudio] = useState<any | undefined>(undefined);
  const [coded64, setCoded64] = useState<any | undefined>(undefined);
  const [isPlaying, setIsPlaying] = useState(false);
  React.useEffect(() => {
    if (isBrowser) {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth"
      });
    }
  }, []);

  const upload = async () => {
    const file = blobAudio;
    setRecordingState(recordingStates.sending);
    setIsUploading(true);

    sendRequest(file)
      .then(() => {
        // success
        props.onFinish(coded64);
        setUploadProgress(0);
      })
      .catch(e => {
        // Not Production ready! Do some error handling here instead...
        //error
        alert("Oops, houve um erro. Por favor, tente novamente");
        setRecordingState(recordingStates.stopped);
        console.log(e);
      })
      .finally(() => {
        setIsUploading(false);
      });
  };

  const sendRequest = (file: any) => {
    const formData = new FormData();
    formData.append("file", file, file.name);
    const config: AxiosRequestConfig = {
      onUploadProgress: function(progressEvent: any) {
        var percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
        setUploadProgress(percentCompleted);
      },
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        auth: props.token
      }
    };

    return axios.post(`${CONFIG.BASE_URL}/record`, formData, config);
  };

  const [seconds, setSeconds] = useState(0);
  const [uploadProgress, setUploadProgress] = useState<any | undefined>(undefined);
  const [currentInterval, setCurrentInterval] = useState<NodeJS.Timeout | undefined>(undefined);
  const [isBlocked, setIsBlocked] = useState(false);
  const [, setIsRecording] = useState(false);
  const [, setIsUploading] = useState(false);
  const Mp3Recorder = new MicRecorder({ bitRate: 128 });
  const [audioElement, setAudioElement] = useState<any | null>(null);

  const goToLogin = () => {
    alert("Para continuar é necessário permitir acesso ao microfone.");
    props.history.push("/login");
    // localStorage.removeItem("token");
  };
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
          if (process.env.NODE_ENV !== "production") console.log("Permission Granted1");
          setIsBlocked(false);
        })
        .catch(e => {
          goToLogin();
          if (process.env.NODE_ENV !== "production") console.log("Permission Denied1");
          setIsBlocked(true);
        });
    } else if (navigator.getUserMedia) {
      navigator.getUserMedia(
        { audio: true },
        () => {
          if (process.env.NODE_ENV !== "production") console.log("Permission Granted2");
          setIsBlocked(false);
        },
        e => {
          goToLogin();
          if (process.env.NODE_ENV !== "production") console.log("Permission Denied");
          setIsBlocked(true);
        }
      );
    } else {
      alert("Esta aplicação não é compatível com o seu navegador. Por favor, tente o Chrome ou Safari");
      props.history.push("/login");
      // localStorage.removeItem("token");
    }

    return () => {
      if (audioElement) audioElement.pause();
    };
  }, []);

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
        const reader = new FileReader();
        reader.readAsDataURL(blob);
        setBlobAudio(blob);
        reader.onloadend = () => {
          const base64data = reader.result;
          setCoded64(base64data);
        };
        setRecordingState(recordingStates.finished);
        if (audioElement) audioElement.pause();
      })
      .catch((e: any) => console.log(e));
  };

  const getPercentage = (): number => {
    if (recordingState !== recordingStates.recording) return 0;
    if (TOTAL_SECONDS > 0) return Math.round((seconds / TOTAL_SECONDS) * 100);

    return 0;
  };

  let currentSecond = 0;
  let isRecordingLocal = false;
  const tick = () => {
    if (isRecordingLocal) {
      if (currentSecond >= TOTAL_SECONDS) {
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
    if (recordingState !== recordingStates.finished) {
      setRecordingState(recordingStates.recording);
    } else {
      alert("Para gravar um novo áudio, é preciso deletar a gravaçāo atual.");
    }
  };

  const onStop = () => {
    setRecordingState(recordingStates.stopped);
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
    if (audioElement) {
      const newAUdio = audioElement;
      audioElement.pause();
      newAUdio.currentTime = 0;
      setAudioElement(newAUdio);
    }
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
      <div
        style={{
          transition: "opacity 0.5s ease",
          display: "flex",
          zIndex: 1,
          opacity: recordingState === recordingStates.stopped || recordingState === recordingStates.sending ? 1 : 0
        }}
        className="home-title"
      >
        {recordingState === recordingStates.stopped ? (
          <h2 style={{ fontFamily: "TIMSans Heavy", fontSize: 14, lineHeight: "20px" }}>
            GRAVE SEU GRITO DE TORCIDA E MANDE PARA O ESTÁDIO SONORO DA TIM.
          </h2>
        ) : (
          recordingState === recordingStates.sending && (
            <div style={{ margin: "auto" }}>
              <h2>ESTÁ QUASE LÁ</h2>
              <span>Seu áudio está sendo preparado para o envio.</span>
              <div style={{ position: "relative" }}>
                <span
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    transition: "opacity 0.5s ease",
                    opacity: uploadProgress < 100 ? 1 : 0
                  }}
                >
                  Seu áudio está sendo preparado para o envio.
                </span>
                {/* <span
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    transition: "opacity 0.5s ease",
                    opacity: uploadProgress === 100 ? 1 : 0
                  }}
                >
                  Processando...
                </span> */}
              </div>
            </div>
          )
        )}
      </div>
      <div
        className="home-logo-container"
        style={{
          top: "-104px",

          zIndex: -1,
          display: "flex",
          flexDirection: "column",
          transform: `translateY(${
            recordingState === recordingStates.recording || recordingState === recordingStates.finished ? -60 : 0
          }px)`
        }}
      >
        <LogoComponent
          defaultMargin={-10}
          zIndex={0}
          showText={false}
          isPlaying={recordingState === recordingStates.recording}
        />
      </div>
      <div
        className="home-logo-container"
        style={{
          zIndex: 1,
          marginTop: "-308px",
          marginBottom: -100,
          marginLeft: 0,
          transform: `translateY(${
            recordingState === recordingStates.recording || recordingState === recordingStates.finished ? -60 : 0
          }px)`
        }}
      >
        {recordingState === recordingStates.sending ? (
          <ProgressCircleComponent percentage={uploadProgress} />
        ) : (
          <>
            <ProgressCircleComponent
              pressed={recordingState !== recordingStates.stopped}
              onClick={clickHandler}
              disabled={recordingState === recordingStates.finished}
              percentage={getPercentage()}
              icon={MICROPHONE_ICON}
            />
            {recordingState === recordingStates.stopped && (
              <div style={{ margin: "auto", width: 150, marginTop: 16 }}>
                <span style={{ fontSize: 16, fontFamily: "TIMSans Regular" }}>Clique no microfone para começar</span>{" "}
                <br />
                <br />
                <span style={{ fontSize: 15, fontFamily: "TIMSans Regular" }}>
                  Para uma melhor experiência, utilize o navegador Chrome ou Mozila Firefox.
                </span>
              </div>
            )}
            <div
              style={{
                overflow: "hidden",
                opacity: recordingState === recordingStates.recording ? 1 : 0,
                display: "relative",
                marginTop: 100,
                zIndex: 10
              }}
            >
              {/* <LazyLoadImage width={200}  src="https://i.giphy.com/U7E16JmPgMzkBx0A2r.gif" /> */}
              {/* <div style={{ marginTop: "-20px" }}> */}
              {/* <img width={200} src="https://i.giphy.com/S3cDPjDHZPpABvzfzg.gif" /> */}
              <LazyLoadImage
                alt="Logo Estádio Sonoro"
                placeholder={<label>Carregando...</label>}
                onLoad={() => {
                  isRecordingLocal = true;
                  if (audioElement) audioElement.play();
                  setIsRecording(true);
                  currentSecond = 0;
                  setSeconds(0);
                  intervalHandle = setInterval(tick, 1000);
                  startStream();
                  setCurrentInterval(intervalHandle);
                }}
                src={
                  recordingState === recordingStates.recording
                    ? "https://estadio-sonoro.s3-sa-east-1.amazonaws.com/midia/karaoke.gif"
                    : ""
                } // use normal <img> attributes as props
                width={"240px"}
              />
            </div>
            {/* <video style={{ marginTop: -40 }} width="260" autoPlay height="200">
                    <source src={Karaoke} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video> */}

            {/* )} */}
          </>
        )}
      </div>
      {recordingState === recordingStates.finished ? (
        <div>
          <div style={{ maxWidth: 350, padding: "0 30px", margin: "auto" }}>
            <div>
              {/* player */}
              {coded64 && (
                <AudioPlayer
                  autoPlay
                  src={coded64}
                  deleteIcon={Delete}
                  playIcon={PlayPause}
                  onAbort={() => {
                    const ans = confirm("Tem certeza que deseja apagar este audio?");
                    if (ans) {
                      setCoded64("");
                      setRecordingState(recordingStates.stopped);
                    }
                  }}
                />
              )}
            </div>
            <Button title="ENVIAR PARA O ESTÁDIO" onClick={upload} />
          </div>
          <span style={{ fontSize: 16, lineHeight: "20px", fontFamily: "TIMSans Regular" }}>
            Junte a sua voz na maior torcida do Brasil
          </span>
        </div>
      ) : (
        recordingState === recordingStates.sending && <div />
      )}
    </div>
  );
};

export { HomeMainComponent };
