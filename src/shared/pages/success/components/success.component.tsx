import * as React from "react";
import styles from "./success-component.module.scss";

import { ShareComponent } from "@app/shared/share-audio/share.component";
import { HeaderComponent } from "@app/shared/header";
import { BackButtonComponent } from "@app/shared/back-button";
import { ISuccessContainerProps } from "../containers";
import { CounterComponent } from "@app/shared/counter";
import { BackgroundComponent } from "@app/shared/background";
import { PlayerComponent } from "@app/shared/player";
import { LogoComponent } from "@app/shared/logo";
import { ProgressCircleComponent } from "@app/shared/progress-circle";
import { getRecordInfoThunk } from "../../../middleware/thunk/record.thunk";
const isBrowser = typeof window !== "undefined";

export interface ISuccessComponentProps {}

export const SuccessComponent = (props: ISuccessComponentProps & ISuccessContainerProps) => {
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);
  const [hasFound, setHasFound] = React.useState(false);
  const [countInternal, setCount] = React.useState(0);
  const [cookieCount, setCookieCount] = React.useState(0);
  const [urlSong, setUrlSong] = React.useState("");
  const [userName, setName] = React.useState("");
  const [hashId, setHashId] = React.useState("");

  React.useEffect(() => {
    // const { id } = props.match.params;
    if (isBrowser) {
      loadAudio();
     
    }

    // setHashId(id);
  }, []);

  const loadAudio = async () => {
    const url = `https://estadio-sonoro.s3-sa-east-1.amazonaws.com/hino.mp3`;

    setUrlSong(url);

    const resp = await getRecordInfoThunk();
    setIsLoading(false);
    const { code, count, name, response } = resp;
    if (code === 200) {
      if (count !== undefined && name) {
        setHasFound(true);
        setCount(count);
        setName(name);
      } else {
        setHasFound(false);
        if (count !== undefined) {
          setCount(count);
        }
      }
    }
    if (code === 201) {
      setHasFound(false);
      if (count !== undefined) {
        setCount(count);
      }
    } else {
      console.log(response);
    }
  };

  return (
    <div style={{ height: "100vh" }} className={styles["success"]}>
      <div style={{ position: "absolute", top: 258, left: -5, right: 0, zIndex: 1 }}>
        <PlayerComponent
          onChange={setIsPlaying}
          song={`https://estadio-sonoro.s3-sa-east-1.amazonaws.com/midia/hino.mp3`}
        />
        {/* <ShareComponent hashId="pepVWcSvNgNUX5" /> */}
      </div>

      <div>
        <HeaderComponent />
        <BackButtonComponent
          onClick={() => {
            props.history.push("/login");
            // localStorage.removeItem("token");
          }}
        />
        <CounterComponent
          title="Já somos mais de"
          subTitle="torcedores cantando juntos."
          count={countInternal || cookieCount}
        />
      </div>
      <div style={{ position: "absolute", top: 440, left: 0, right: 0 }}>
        <ShareComponent />
      </div>
      {/* <BackgroundComponent /> */}
      <div style={{ position: "absolute", top: 100, left: 0, right: 0 }}>
        <LogoComponent isPlaying={isPlaying} />
      </div>
    </div>
  );
};
