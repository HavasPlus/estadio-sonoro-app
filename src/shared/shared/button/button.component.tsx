import * as React from "react";
import styles from "./button-component.module.scss";
import { IconComponent } from "../icon";
interface AppProps {
  fillColor?: string;
  icon?: any;
  isLoading?: boolean;
  onClick?: () => void;
  title: string;
  transparent?: boolean;
  variant?: "facebook" | "login";
}

export const Button = (props: AppProps) => {
  const { title, fillColor, transparent, icon, onClick, isLoading } = props;
  const [isPressed, setIsPressed] = React.useState(false);

  return (
    <span
      style={{ opacity: isLoading ? 0.4 : 1, textAlign: icon ? "start" : "center" }}
      onClick={() => {
        if (!isLoading && onClick) onClick();
      }}
      onMouseDown={() => {
        setIsPressed(true);
      }}
      onMouseUp={() => {
        setIsPressed(false);
      }}
      onMouseLeave={() => {
        setIsPressed(false);
      }}
      role="button"
      className={`${transparent ? styles["button-transparent"] : ""}${styles["button"]} ${
        isPressed ? styles["button-pressed"] : ""
      }`}
    >
      <div className={`${styles["icon"]}`}>
        {icon && <IconComponent icon={icon} fillColor={fillColor} size={"20px"} />}
      </div>
      <span>{title}</span>
    </span>
  );
};
