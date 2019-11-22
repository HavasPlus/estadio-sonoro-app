import * as React from "react";
import styles from "./header-component.module.scss";
import Tim from "@assets/images/tim.png";
import Flamengo from "@assets/images/flamengo.png";
interface ICheckboxProps {
  state?: 0 | 1;
}

const HeaderComponent = ({ state }: ICheckboxProps) => (
  <div
    style={{
      zIndex: 1,
      position: "relative",
      maxWidth: 360,
      padding: "0 36px",
      justifyContent: state === 0 ? "center" : "space-between",
      margin: "auto",
      marginTop: 36
    }}
    className={styles["header"]}
  >
    <img style={{ height: 20 }} src={Tim} alt="Tim Logo" />
    {state === 0 ? (
      <span
        style={{
          position: "absolute",
          left: "0px",
          right: "0px",
          fontFamily: "TIMSans Medium", 
          fontWeight: 500,
        
          top: "28px",
          fontSize: "9px",
          letterSpacing: "3.75px"
        }}
      >
        APRESENTA
      </span>
    ) : (
      <img style={{ height: 24 }} src={Flamengo} alt="Flamengo Logo" />
    )}
  </div>
);

export { HeaderComponent };
