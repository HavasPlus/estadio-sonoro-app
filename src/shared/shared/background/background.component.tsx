import * as React from "react";
import styles from "./background-component.module.scss";
import Waves from "@assets/images/ondas2.png";
import WavesText from "@assets/images/ondas-text.png";
import BackgroundText from "@assets/images/logo_text.png";
import { LazyLoadImage } from "react-lazy-load-image-component";
interface IBackgroundComponentProps {
  isAnimated?: boolean;
}

const STATIC_LOGO = "https://i.imgur.com/6vjcm3C.jpg";
// const STATIC_LOGO_TEXT = "https://i.imgur.com/6vjcm3C.jpg";
const GIF_LOGO = "https://estadio-sonoro.s3-sa-east-1.amazonaws.com/midia/ondas.gif";

const BackgroundComponent = (props: IBackgroundComponentProps) => {
  const [marginLeft, setMarginLeft] = React.useState(0);

  const handleResize = () => {
    if (window) {
      getWidthSetMargin(window.innerWidth);
    }
  };
  React.useEffect(() => {
    if (window) {
      window.addEventListener("resize", handleResize);
      getWidthSetMargin(window.innerWidth);
    }
    handleResize();
    return () => {
      if (window) window.removeEventListener("resize", handleResize);
    };
  }, []);

  const getWidthSetMargin = (innerWidth: number): void => {
    const widthBreakPoint = 500;
    if (innerWidth < widthBreakPoint) {
      let marginCalculated = innerWidth - widthBreakPoint;
      marginCalculated = marginCalculated / 2;
      if (marginLeft) marginCalculated += marginLeft;
      setMarginLeft(marginCalculated);
    } else setMarginLeft(marginLeft ? marginLeft : 0);
  };

  return (
    <div className={styles["background"]}>
      <img style={{ marginLeft }} src={props.isAnimated ? GIF_LOGO : STATIC_LOGO} alt="background" />
    </div>
  );
};

export { BackgroundComponent };
