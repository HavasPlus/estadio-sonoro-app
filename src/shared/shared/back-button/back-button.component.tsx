import * as React from "react";
import styles from "./back-button-component.module.scss";
import Arrow from "@assets/images/arrow.png";

interface ICheckboxProps {
  onClick: () => void;
}

const BackButtonComponent = ({ onClick }: ICheckboxProps) => (
  <div className={styles["button"]}>
    <div onClick={onClick} role="button">
      <img src={Arrow} alt="Botão voltar" />
    </div>
  </div>
);

export { BackButtonComponent };
