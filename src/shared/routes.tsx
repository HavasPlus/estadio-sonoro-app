import * as React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { LoginContainer } from "./pages/login";
import { HomeContainer } from "./pages/home";
import { SharePageContainer } from "./pages/share";
import BG from "@assets/images/bg.jpg";
import styles from "container.module.scss";
import { SuccessContainer } from "./pages/success";
import OKComponent from "./shared/ok/ok.component";

const Routes: React.FunctionComponent<{}> = props => (
  <div className={styles["container"]}>
    {/* <div className={styles["bg-container"]}>
      <img className={styles["bg"]} src={BG} alt="background flamengo" />
    </div> */}
    <div className={styles["main"]}>
      <React.Fragment>
        <Route exact path="/login" component={LoginContainer} />
        <Route exact path="/estadio" component={SuccessContainer} />
        <Route exact path="/health" component={OKComponent} />
        <Route exact path="/redirect" component={HomeContainer} />
        {/* <Route exact path="/estadio/:id" component={SharePageContainer} />
        <Route exact path="/estadio/" component={SharePageContainer} /> */}
        <Route exact path="/sucesso/" component={SharePageContainer} />
        <Route exact path="/" component={HomeContainer} />
        {/* <Route exact path="*" component={LoginContainer} /> */}
      </React.Fragment>
    </div>
  </div>
);

export { Routes };
