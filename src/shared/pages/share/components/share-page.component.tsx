import * as React from "react";
import styles from "./share-page-component.module.scss";

import { ShareComponent } from "@app/shared/share-audio/share.component";
import { HeaderComponent } from "@app/shared/header";
import { BackButtonComponent } from "@app/shared/back-button";

import { CounterComponent } from "@app/shared/counter";
import { BackgroundComponent } from "@app/shared/background";
import { PlayerComponent } from "@app/shared/player";
import { LogoComponent } from "@app/shared/logo";
import { ProgressCircleComponent } from "@app/shared/progress-circle";
import { ISharePageContainerProps } from "../containers";

export interface ISharePageComponentProps {}

export const SharePageComponent = (props: ISharePageComponentProps & ISharePageContainerProps) => {
  const [isPlaying, setIsPlaying] = React.useState(false);
  React.useEffect(() => {
    if (!props.token) {
      props.history.push("/");
    }
  });

  return (
    <div style={{ height: "100vh" }} className={styles["success"]}>
      {/* <div style={{ position: "absolute", top: 246, left: 0, right: 0, zIndex: 1 }}>
        <PlayerComponent
          onChange={setIsPlaying}
          song={`https://estadio-sonoro.s3-sa-east-1.amazonaws.com/midia/hino.mp3`}
        />
        {/* <ShareComponent hashId="pepVWcSvNgNUX5" /> */}
      {/* </div> * */}
      <div style={{ position: "absolute", top: 120, maxWidth: 250, margin: "auto", left: 0, right: 0, zIndex: 1 }}>
        <span style={{ fontSize: 14 }}> SEU ÁUDIO FOI ENVIADO COM SUCESSO!</span>
      </div>

      <div>
        <HeaderComponent />
        <BackButtonComponent
          onClick={() => {
            props.history.push("/login");
          }}
        />
      </div>
      <div style={{ position: "absolute", top: 250, left: 0, right: 0 }}>
        <CounterComponent
          title="Já somos mais de"
          subTitle="torcedores cantando juntos."
          count={props.countRecords || 0}
        />
      </div>
      <div style={{ position: "absolute", top: 400, left: 0, right: 0 }}>
        <ShareComponent />
      </div>
      <BackgroundComponent />
      {/* <div style={{ position: "absolute", top: 100, left: 0, right: 0 }}>
        <LogoComponent isPlaying={isPlaying} />
      </div> */}
    </div>
  );
};
