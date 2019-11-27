import * as React from "react";
import "./home.scss";
import { RouteComponentProps } from "react-router";
import { HomeContainerProps } from "../containers";
import { HeaderComponent } from "@app/shared/header";
import { BackButtonComponent } from "@app/shared/back-button";
import { HomeMainComponent } from "./home-main.component";

const { useState } = React;
export interface IHomeComponentProps {}

const RECORDING = 1;

export const HomeComponent = (props: IHomeComponentProps & RouteComponentProps & HomeContainerProps) => {
  const [homeState, setHomeState] = useState(RECORDING); // TODO count down
  const [hasLoaded, setHasLoaded] = useState(false);
  const [, setBlobFile] = useState(""); // TODO count down
  React.useEffect(() => {
    if (!props.token) {
      // if (process.env.NODE_ENV === "production")
      props.history.push("/login");
      localStorage.removeItem("token");
    } else {
      setHasLoaded(true);
    }
    if (props.foundRecord) {
      // if (process.env.NODE_ENV === "production")
      //  props.history.push(`/estadio/${props.foundRecord}`);
      props.history.push(`/estadio`);
    }
  }, []);

  return (
    <div style={{ height: "100vh" }} className="home-container">
      <HeaderComponent state={1} />
      <BackButtonComponent
        onClick={() => {
          props.history.push("/login");
        }}
      />
      {homeState === -1 ? (
        <div style={{ display: "blocks" }}>
          <span>{`Token: ${props.token.slice(0, 5)}`}</span>
          <span>{`Name: ${props.name}`}</span>
          <span>{`Count: ${props.countRecords}`}</span>
          <span>{`Backingtrack url: ${props.countRecords}`}</span>
          <span>{`Crowd record url: ${props.crowdRecord}`}</span>
          <button
            onClick={() => {
              setHomeState(RECORDING);
            }}
          >
            CLICA AQUI
          </button>
          <h2>GRAVE SEU HINO E CANTE JUNTO COM A MAIOR TORCIDA DO BRASIL.</h2>
        </div>
      ) : (
        homeState === RECORDING &&
        hasLoaded && (
          <div>
            <HomeMainComponent
              history={props.history}
              onFinish={blob => {
                setBlobFile(blob);
                // props.history.push("/estadio");
                props.history.push("/sucesso");
                // setHomeState(FINISHED);
              }}
              crowdAudio={props.crowdRecord ? props.crowdRecord : ""}
              token={props.token}
            />
          </div>
        )
      )}
    </div>
  );
};
